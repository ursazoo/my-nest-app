import { Test, TestingModule } from '@nestjs/testing';
import { ImageHostController } from './image-host.controller';

describe('ImageHostController', () => {
  let controller: ImageHostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageHostController],
    }).compile();

    controller = module.get<ImageHostController>(ImageHostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
