import {forwardRef, Module} from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './activity.entity';
import {LocationService} from "../location/location.service";
import {LocationModule} from "../location/location.module";


@Module({
  controllers: [ActivityController],
  providers: [ActivityService],
  imports:[
      forwardRef(()=> LocationModule),
    TypeOrmModule.forFeature([Activity]), ],
  exports: [
      ActivityService,
  ]

})
export class ActivityModule {}
