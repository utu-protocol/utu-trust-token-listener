import {
  CacheInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ConnectionsService } from './connections.service';
import ConnectionDto from './dto/connection.dto';

@Controller('connections')
@UseInterceptors(CacheInterceptor)
export class ConnectionsController {
  constructor(private readonly connectionsService: ConnectionsService) {}

  @Get()
  findAll(@Query() connectionDto: ConnectionDto) {
    return this.connectionsService.findAll(connectionDto);
  }
}
