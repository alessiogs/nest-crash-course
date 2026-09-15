import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { ConfigModule } from 'src/config/config.module';
import { EpisodesService } from 'src/episodes/episodes.service';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  const mockEpisodesService = {
    findAll: () => [{ id: 'id' }],
    findFeaturedEpisodes: () => [{ id: 'id' }],
    findOne: () => ({ id: 'id' }),
    create: () => ({ id: 'id' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [EpisodesController],
      providers: [{ provide: EpisodesService, useValue: mockEpisodesService }],
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () =>
    it('should return the id of the new episode', () => {
      const id = 'id';
      const response = controller.findOne(id);
      expect(response).toEqual({ id: 'id' });
    }));
});
