import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaClientService } from '../database/prisma.client';

@Injectable()
export class UsersService {
  constructor(private prismaClient: PrismaClientService) {}

  async createUser(
    email: string,
    password: string,
    profileData: {
      firstName?: string;
      lastName?: string;
      phone?: string;
      address?: string;
    },
  ): Promise<User> {
    const existingUser = await this.prismaClient.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prismaClient.user.create({
      data: {
        email,
        password: hashedPassword,
        profile: {
          create: profileData,
        },
      },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prismaClient.user.findUnique({
      where: { email },
      include: { profile: true },
    });
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.prismaClient.user.findUnique({
      where: { id },
      include: { profile: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
