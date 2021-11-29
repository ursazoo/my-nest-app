import { Test, TestingModule } from '@nestjs/testing';
import { ImageHostService } from './image-host.service';

describe('ImageHostService', () => {
  let service: ImageHostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageHostService],
    }).compile();

    service = module.get<ImageHostService>(ImageHostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
