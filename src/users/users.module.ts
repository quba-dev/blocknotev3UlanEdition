import {forwardRef, Module} from '@nestjs/common';
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Account} from "./users.entity";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        forwardRef(()=> UsersModule),
        TypeOrmModule.forFeature([Account]),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'SECRET',
            signOptions: {
                expiresIn: '24h'
            }
        }),
    ],
    exports: [
        JwtModule,
    ]
})
export class UsersModule {}
