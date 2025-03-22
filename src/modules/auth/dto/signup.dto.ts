import { IsEmail, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsString()
  password: string;

  @ApiProperty({ description: 'The profile data of the user', required: false })
  @IsOptional()
  profile?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
  };
}
