import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { Customer } from '@prisma/client';
import { CustomersService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CustomerDto } from './dto/customer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('customers')
@ApiBearerAuth()
@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiBody({ type: CreateCustomerDto })
  @ApiResponse({
    status: 201,
    description: 'Customer created successfully',
    type: CustomerDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.createCustomer(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all customers' })
  @ApiResponse({
    status: 200,
    description: 'List of customers',
    type: [CustomerDto],
  })
  async getAllCustomers(): Promise<Customer[]> {
    return this.customersService.getAllCustomers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a customer by ID' })
  @ApiParam({ name: 'id', description: 'Customer ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Customer found',
    type: CustomerDto,
  })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  async getCustomerById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Customer> {
    return this.customersService.getCustomerById(id);
  }

  @Post('sync')
  @ApiOperation({ summary: 'Sync all customers to an external API' })
  @ApiResponse({ status: 200, description: 'Sync completed successfully' })
  async syncAllCustomers(): Promise<void> {
    await this.customersService.syncAllCustomers();
  }
}
