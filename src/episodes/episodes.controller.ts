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
import { EpisodesService } from './episodes.service';
import { type CreateEpisodeDto } from './dto/episode.dto';
import { ConfigService } from 'src/config/config.service';

@Controller('episodes')
export class EpisodesController {
  constructor(
    private episodesService: EpisodesService,
    private configService: ConfigService,
  ) {}

  @Get()
  findAll(@Query('sort') sort: 'asc' | 'desc' = 'desc') {
    return this.episodesService.findAll(sort);
  }

  @Get('featured')
  findFeatured() {
    return this.episodesService.findFeatured();
  }

  @Get(':id')
  findOne(@Param() id: string) {
    console.log(id);
    return this.episodesService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateEpisodeDto) {
    const genericConfiguration = this.configService.getGenericConfiguration();
    console.log('test configService injection', genericConfiguration);
    return this.episodesService.create(payload);
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
