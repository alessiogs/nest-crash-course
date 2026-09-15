import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('topics')
export class TopicsController {
  @Get()
  findAll(@Query('sort') sort: 'asc' | 'desc' = 'desc') {
    console.log(sort);
    return 'all topics';
  }

  @Get('featured')
  findFeatured() {
    return 'featured topics';
  }

  @Get(':id')
  findOne(@Param() id: string) {
    console.log(id);
    return 'one topic';
  }

  @Post()
  create(@Body() payload: any) {
    console.log(payload);
    return 'new topic';
  }

  @Put(':id')
  update(@Param() id: string, @Body() payload: any) {
    return `update topic ${id} as ${payload}`;
  }

  @Delete(':id')
  delete(@Param() id: string) {
    return `delete topic ${id}`;
  }
}
