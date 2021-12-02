import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'user', description: 'Логин'})
    readonly username: string

    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    readonly email: string;

    @ApiProperty({example: '123456', description: 'Пароль'})
    readonly password: string;
}