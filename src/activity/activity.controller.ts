import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Location } from '../location/location.entity';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService:ActivityService) {}

  @Post()
  createActivity(currentLocation:Location,@Body()dto:CreateActivityDto){
    return this.activityService.createActivity(currentLocation,dto)
  }
  @Delete(':id')
  async deleteActivity(@Param('id') id:number){
    return await this.activityService.deleteActivity(id)
  }

  @Put(':id')
  async updateActivity(@Param('id') id:number,@Body() dto:CreateActivityDto){
    return this.activityService.updateActivity(id,dto)

  }

}
