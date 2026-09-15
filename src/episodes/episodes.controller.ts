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

@Controller('episodes')
export class EpisodesController {
  @Get()
  findAll(@Query('sort') sort: 'asc' | 'desc' = 'desc') {
    console.log(sort);
    return 'all episodes';
  }

  @Get('featured')
  findFeatured() {
    return 'featured episodes';
  }

  @Get(':id')
  findOne(@Param() id: string) {
    console.log(id);
    return 'one episode';
  }

  @Post()
  create(@Body() payload: any) {
    console.log(payload);
    return 'new episode';
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
