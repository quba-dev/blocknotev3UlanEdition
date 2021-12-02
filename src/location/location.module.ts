import {forwardRef, Module} from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location.entity';
import {ActivityService} from "../activity/activity.service";
import {ActivityModule} from "../activity/activity.module";

@Module({
  providers: [LocationService],
  controllers: [LocationController],
  imports:[
      TypeOrmModule.forFeature([Location]),
    forwardRef(()=> ActivityModule)
  ],
  exports: [
      LocationService,
  ]

})
export class LocationModule {}
