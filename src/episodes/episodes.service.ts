import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateEpisodeDto } from './dto/episode.dto';
import { Episode } from './entity/episode.entity';

@Injectable()
export class EpisodesService {
  private episodes: Episode[] = [];

  findAll(sort: 'asc' | 'desc', featured: boolean) {
    const sortAsc = (a: Episode, b: Episode) => (a.title > b.title ? 1 : -1);

    const sortDesc = (a: Episode, b: Episode) => (a.title < b.title ? 1 : -1);

    const sortFn = sort === 'asc' ? sortAsc : sortDesc;

    try {
      const result = this.episodes
        .filter((episode) => (featured ? episode.featured : true))
        .sort(sortFn);

      return result;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to retrieve episodes',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  findOne(id: string) {
    try {
      const result = this.episodes.find((episode) => episode.id === id);

      if (!result) {
        throw new NotFoundException(`Episode with ID ${id} not found`);
      }

      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Failed to retrieve episode',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  create(createEpisodeDto: CreateEpisodeDto) {
    try {
      const newEpisode: Episode = {
        ...createEpisodeDto,
        id: randomUUID(),
      };

      this.episodes.push(newEpisode);

      return newEpisode;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to create episode',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
