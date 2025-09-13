import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

console.log('JwtAuthGuard');
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
