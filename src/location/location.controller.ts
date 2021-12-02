import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { Activity } from '../activity/activity.entity';


@Controller('location')
export class LocationController {
  constructor(private readonly locationService:LocationService) {}

  @Post()
  createLocation(@Body() dto:CreateLocationDto){
    return this.locationService.createLocation(dto)
  }
  @Put(':id')
  async updateLocation(@Param('id') id:number,@Body() dto:CreateLocationDto){
    return this.locationService.updateLocation(id,dto)
  }

  @Delete(':id')
  async deleteLocation(@Param('id') id:number){
    return await this.locationService.deleteLocation(id)
  }
  @Get('availablelocation')
  async availableLocation(){
    return this.locationService.findAvailableLocation()
  }

  @Get(':id')
  async findByLocation(@Param('id') id:number){
    return await this.locationService.findByLocation(id)
  }

}
