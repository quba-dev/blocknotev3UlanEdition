import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import {CreateUserDto} from "./dto/create-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Account} from "./users.entity";
import {LoginUserDto} from "./dto/login-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Account)
                private readonly userRepository: Repository<Account>,
                private jwtService: JwtService) {}

    async createUser(dto: CreateUserDto){
        const user = new Account()
        await this.userRepository.create(dto)
        Object.assign(user, dto)
        return await this.userRepository.save(user)
    }

    async login(userDto: LoginUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const email = await this.getUserByEmail(userDto.email);
        const username = await this.getUserByUsername(userDto.username)
        if (email || username) {
            throw new HttpException('Пользователь с таким email или username существует', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.createUser({...userDto, password: hashPassword})
        await this.generateToken(user)
        return 'Registration is done.'
    }

    private async generateToken(user: Account) {
        const payload = {email: user.email, id: user.id}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: LoginUserDto) {
        const user = await this.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Некорректный емайл или пароль'})
    }
    async getUserByEmail(email:string){
        return await this.userRepository.findOne({where: {email}})
    }

    async getUserByUsername(username: string){
        return await this.userRepository.findOne({where: {username}})
    }
}
