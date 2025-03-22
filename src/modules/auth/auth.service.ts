import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(
    email: string,
    password: string,
    profileData: {
      firstName?: string;
      lastName?: string;
      phone?: string;
      address?: string;
    },
  ) {
    const user = await this.usersService.createUser(
      email,
      password,
      profileData,
    );
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(userId: number) {
    return this.usersService.findUserById(userId);
  }
}
