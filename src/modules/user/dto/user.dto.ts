import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'The ID of the user', example: 1 })
  id: number;

  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The profile of the user',
  })
  profile?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
  };

  @ApiProperty({
    description: 'The creation date of the user',
    example: '2025-03-22T10:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The last update date of the user',
    example: '2025-03-22T10:00:00Z',
  })
  updatedAt: Date;
}
