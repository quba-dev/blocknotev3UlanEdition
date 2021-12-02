import { Module } from '@nestjs/common';
import { ActivityModule } from './activity/activity.module';
import { LocationModule } from './location/location.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import ormconfig from './ormconfig';


@Module({
  imports: [UsersModule, ActivityModule, LocationModule,TypeOrmModule.forRoot(ormconfig)],
  controllers: [],

})
export class AppModule {}