import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { PrismaClientService } from '../database/prisma.client';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaClientService) {}

  async createCustomer(data: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
  }): Promise<Customer> {
    return this.prisma.customer.create({
      data,
    });
  }

  async getAllCustomers(): Promise<Customer[]> {
    return this.prisma.customer.findMany();
  }

  async getCustomerById(id: number): Promise<Customer> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async syncAllCustomers(): Promise<void> {
    const customers = await this.getAllCustomers();
    for (const customer of customers) {
      // Simulate sending data to an external API (e.g., Zoho CRM, Wise API)
      console.log(`Syncing customer ${customer.id} to external API:`, customer);
      // In a real scenario, replace with an HTTP request to the external API
    }
  }
}
