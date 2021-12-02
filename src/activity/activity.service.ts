import {Body, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './activity.entity';
import {In, Repository} from 'typeorm';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Location } from '../location/location.entity';
import {LocationService} from "../location/location.service";
import {DateDto} from "./dto/interval.dto";

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    private locationService: LocationService,
    ) {
  }


  async createActivity(@Body('dto') dto: CreateActivityDto) {
    const hh = [dto.day]
    const ff = dto.location
    const gg=await this.locationService.findByLocationAndTime(ff)
    if (gg === undefined){
      const activity = new Activity()
      Object.assign(activity, dto)
      return await this.activityRepository.save(activity)
    }
    const date = hh[0]
    const newDate = (new Date(date).toLocaleDateString()).toString()
    for (let x of gg ){
      if (newDate === x){
        throw new HttpException('на этот день занято', HttpStatus.NOT_FOUND)
      }
    }
    const activity = new Activity()
    Object.assign(activity, dto)
    return await this.activityRepository.save(activity)
  }

  async deleteActivity(id: number) {
    const activity = await this.activityRepository.findOne(id)
    if (!activity) {
      throw new HttpException('activity does not exist', HttpStatus.NOT_FOUND)
    }
    return await this.activityRepository.delete({ id })

  }

  async updateActivity(id: number, dto: CreateActivityDto) {
    const activity = await this.activityRepository.findOne(id)
    if (!activity) {
      throw new HttpException('activity does not exist', HttpStatus.NOT_FOUND)
    }
    Object.assign(activity, dto)
    return await this.activityRepository.save(activity)
  }

  async findActivityDto(@Body('dto') dto: DateDto){
    const start = [dto.start_date]
    const end = [dto.end_date]
    const dates = await this.enumerateDaysBetweenDates(start[0],end[0])
    const data = await this.activityRepository.find()
    const dataActivity = []
    for (let x of data){
      const day = ((x.day).toLocaleDateString())
      const id = x.id
      for (let i of dates){
        if (i === day){
          dataActivity.push(id)
        }
      }
    }
    const dats = []
    // const activities = await this.activityRepository.findOne({where: {id: In(dataActivity)}});
    for (let x of dataActivity){
      const resData = await this.activityRepository.findOne({id: x})
      console.log(resData)
      dats.push(resData)
    }
    return dats
  }

  async enumerateDaysBetweenDates(start, end){
    const arr = [];
    const dt = new Date(start);
    const ends = new Date(end);
    while (dt <= ends) {
      arr.push((new Date(dt)).toLocaleDateString());
      dt.setDate(dt.getDate() + 1);
    }
    return arr
  }


  async avalaibleLocationByDate(@Body() dto: DateDto){
    const date = dto.start_date
    const newDate = new Date(date).toLocaleDateString()
    const allActivity = await this.activityRepository.find()
    const dataLocation = []
    const ola = await this.locationService.findAll()
    for ( let i of ola){
      dataLocation.push(i.id)
    }

    let dataDate = []
    const blackList = []
    for (let i of allActivity){
      if ( newDate === (i.day).toLocaleDateString()){
        for (let x of dataLocation){
          if (i.location.id === x){
            blackList.push(i.location.id)
            dataDate.push(i)
          }
        }
      }
    }
    let difference = dataLocation.filter(x => !blackList.includes(x)).concat(blackList.filter(x => !dataLocation.includes(x)));
    const veryWhitelist = []
    for ( let i of difference){
      let x = await this.locationService.findWhiteLocation(i)
      veryWhitelist.push(x)
    }

    return veryWhitelist
  }

}
