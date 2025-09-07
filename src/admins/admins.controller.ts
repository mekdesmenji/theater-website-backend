import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ClassSerializerInterceptor,
  UseInterceptors,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from './admins.guard';
import { Roles } from './adminsRoles.decorator';
import { RolesGuard } from './adminsRoles.guard';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@ApiTags('Admins')
@Controller('admins')
@UseInterceptors(ClassSerializerInterceptor)
export class AdminsController {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Admin created successfully',
    type: Admin,
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.signup(createAdminDto);
  }

  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'Admin logged in successfully',
    type: LoginDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Wrong email or password',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'admin@example.com' },
        password: { type: 'string', example: 'strongpassword123' },
      },
      required: ['email', 'password'],
    },
  })
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const admin = await this.adminsService.validateAdmin(email, password);
    if (!admin) throw new UnauthorizedException('Wrong email or password');

    const payload = { sub: admin.id, role: admin.role };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    console.log(process.env.JWT_EXPIRES_IN);
    return { access_token: token };
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of all admins',
    type: [Admin],
  })
  findAll() {
    return this.adminsService.findAll();
  }

  @Get('me')
  @UseGuards(JwtGuard)
  @ApiResponse({ status: 200, description: 'Admin details', type: Admin })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  findMe(@Req() req: Request) {
    const admin = req['user'];
    console.log('Request User:', admin, admin?.sub);
    return this.adminsService.findOne(admin.sub);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Admin details', type: Admin })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  findOne(@Param('id') id: string) {
    return this.adminsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Admin updated successfully',
    type: Admin,
  })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(id, updateAdminDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @ApiResponse({
    status: 200,
    description: 'Admin deleted successfully',
    type: Admin,
  })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  remove(@Param('id') id: string) {
    return this.adminsService.remove(id);
  }
}
