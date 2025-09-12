import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.model';

interface RegisterDto {
  email: string;
  password: string;
}

interface LoginDto {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async register({ email, password }: RegisterDto) {
    const existing = await this.userModel.findOne({ where: { email } });
    if (existing) throw new ConflictException('Email already in use');
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      email,
      passwordHash,
      role: 'user',
    } as any);
    return { id: user.id, email: user.email } as any;
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    const token = await this.jwtService.signAsync({
      sub: user.id,
      role: user.role,
      email: user.email,
    } as any);
    return { access_token: token };
  }
}
