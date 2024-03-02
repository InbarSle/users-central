import {IsNotEmpty, IsString, IsEmail, IsLongitude, IsLatitude, ValidateNested} from 'class-validator'
import { Type } from 'class-transformer';
import { Location } from './location.dto';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    fullname: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;


    @IsString()
    @IsNotEmpty()
    address: string;

    @Type(() => Location)
    @IsNotEmpty()
    @ValidateNested()
    location: Location;
}