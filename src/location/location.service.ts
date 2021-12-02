import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './location.entity';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';


@Injectable()
export class LocationService {
  constructor(
      @InjectRepository(Location)
      private readonly locationService: Repository<Location>) {
  }

  async createLocation(dto: CreateLocationDto) {
    const location = new Location()
    Object.assign(location, dto)
    return await this.locationService.save(location)


  }

  async updateLocation(id: number, dto: CreateLocationDto) {
    const location = await this.locationService.findOne(id)
    if (!location) {
      throw new HttpException('activity does not exist', HttpStatus.NOT_FOUND)
    }
    Object.assign(location, dto)
    return await this.locationService.save(location)
  }

  async deleteLocation(id: number) {
    const location = await this.locationService.findOne(id)
    if (!location) {
      throw new HttpException('activity does not exist', HttpStatus.NOT_FOUND)
    }
    return await this.locationService.delete(id)
  }

  async findAvailableLocation() {
    const availableLocation = await this.locationService.find({where: {isAvailable: true}})
    if (!availableLocation) {
      throw new HttpException(' no available location', HttpStatus.NOT_FOUND)
    }
    return availableLocation


  }

  async findByLocation(id: number) {
    const locationById = await this.locationService.findOne(id, {relations: ["activities"]})

    if (!locationById) {
      throw new HttpException('there is no such location', HttpStatus.NOT_FOUND)
    }
    const currentActivity = locationById.activities
    return currentActivity

  }

  async findByLocationAndTime(id: number) {
    const locationById = await this.locationService.findOne(id, {relations: ["activities"]})
    if (!locationById) {
      throw new HttpException('there is no such location', HttpStatus.NOT_FOUND)
    }
    const currentActivity = locationById.activities
    let b = []
    for (let x of currentActivity){
      b.push((x.day).toLocaleDateString())
    }
    return b
  }
}
