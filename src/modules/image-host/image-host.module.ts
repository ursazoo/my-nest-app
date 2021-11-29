import { Module } from '@nestjs/common';
import { ImageHostController } from './image-host.controller';
import { ImageHostService } from './image-host.service';

@Module({
  controllers: [ImageHostController],
  providers: [ImageHostService],
})
export class ImageHostModule {}
