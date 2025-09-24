import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  Order,
  OrderStatus,
  DateRange,
  PriceRange,
} from './entities/order.entity';
import { Roles } from '../admins/adminsRoles.decorator';
import { RolesGuard } from '../admins/adminsRoles.guard';
import { JwtGuard } from 'src/admins/admins.guard';
import { FilterOrdersDto } from './dto/filter-order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Order created successfully',
    type: Order,
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of all orders',
    type: [Order],
  })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('search')
  @ApiResponse({
    status: 200,
    description: 'List of orders matching the search query',
    type: [Order],
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid query',
  })
  search(@Query('q') q: string) {
    return this.ordersService.search(q ?? '');
  }

  @Get('filter')
  @ApiQuery({ name: 'status', required: false, enum: OrderStatus })
  @ApiQuery({ name: 'priceRange', required: false, enum: PriceRange })
  @ApiQuery({ name: 'dateRange', required: false, enum: DateRange })
  @ApiQuery({
    name: 'customStart',
    required: false,
    type: String,
    description: 'Start date for custom range (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'customEnd',
    required: false,
    type: String,
    description: 'End date for custom range (YYYY-MM-DD)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of filtered orders',
    type: [Order],
  })
  getFilteredOrders(@Query() filterDto: FilterOrdersDto) {
    console.log('Incoming filter:', filterDto);
    return this.ordersService.getFilteredOrders(filterDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Order details',
    type: Order,
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Order updated successfully',
    type: Order,
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @ApiResponse({
    status: 200,
    description: 'Order deleted successfully',
    type: Order,
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
