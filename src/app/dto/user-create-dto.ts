// create-user.dto.ts
import { IsString, IsEmail, IsInt, Min, Length, IsNotEmpty } from 'class-validator';
/*
! means Definite Assignment Assertion (!)
 append a ! to tell TypeScript you guarantee it will be assigned later.
*/
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(2, 40)
    name!: string;

    @IsEmail()
    @IsNotEmpty()
    @Length(6, 40)
    email!: string;

    @IsEmail()
    @IsNotEmpty()
    @Length(6, 40)
    password!: string;


}
