import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Episode } from './entity/episode.entity';
import { CreateEpisodeDto } from './dto/episode.dto';

@Injectable()
export class EpisodesService {
  private episodes: Episode[] = [];

  findAll(sort: 'asc' | 'desc') {
    const sortAsc = (a: Episode, b: Episode) => (a.title > b.title ? 1 : -1);
    const sortDesc = (a: Episode, b: Episode) => (a.title < b.title ? 1 : -1);

    return sort === 'asc'
      ? this.episodes.sort(sortAsc)
      : this.episodes.sort(sortDesc);
  }

  findFeatured() {
    return this.episodes.filter((episode) => episode.featured);
  }

  findOne(id: string) {
    return this.episodes.find((episode) => episode.id === id);
  }

  create(createEpisodeDto: CreateEpisodeDto) {
    const newEpisode = { ...createEpisodeDto, id: randomUUID() };
    this.episodes.push(newEpisode);

    return newEpisode;
  }
}
