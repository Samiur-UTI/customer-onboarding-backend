import { ApiProperty } from '@nestjs/swagger';

export class CustomerDto {
  @ApiProperty({ description: 'The ID of the customer', example: 1 })
  id: number;

  @ApiProperty({ description: 'The name of the customer', example: 'John Doe' })
  name: string;

  @ApiProperty({
    description: 'The email of the customer',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The phone number of the customer',
    example: '+1234567890',
    required: false,
  })
  phone?: string;

  @ApiProperty({
    description: 'The address of the customer',
    example: '123 Main St',
    required: false,
  })
  address?: string;

  @ApiProperty({
    description: 'The creation date of the customer',
    example: '2025-03-22T10:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The last update date of the customer',
    example: '2025-03-22T10:00:00Z',
  })
  updatedAt: Date;
}
