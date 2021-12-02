import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";

import {JwtAuthGuard} from "./jwt-auth.guard";

@ApiTags('Авторизация')
@Controller('auth')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    @Post('/login')
    login(@Body() userDto: CreateUserDto){
        return this.usersService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto){
        return this.usersService.registration(userDto)
    }

    // @ApiOperation({summary: 'Создание пользователя'})
    // @ApiResponse({status: 200, type: User})
    // @Post()
    // create(@Body() userDto: CreateUserDto){
    //     return this.usersService.createUser(userDto)
    // }

    // @ApiOperation({summary: 'Получить всех пользователей'})
    // @ApiResponse({status: 200, type: [User]})
    // @UseGuards(JwtAuthGuard)
    // @Get()
    // getAll(){
    //     return this.usersService.getAllUsers()
    // }
}
