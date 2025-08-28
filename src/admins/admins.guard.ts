import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers.authorization;
    console.log('Auth Header:', authHeader);

    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];
    try {
      console.log('Token:', token);
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      console.log('Decoded Token:', decoded);
      req['user'] = decoded;
      return true;
    } catch (error) {
      console.error('JWT Error:', error);
      return false;
    }
  }
}
