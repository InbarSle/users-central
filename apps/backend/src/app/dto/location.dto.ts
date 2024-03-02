import { IsLatitude, IsLongitude, IsNumber, IsNotEmpty } from "class-validator";

export class Location {
    @IsNotEmpty()
    @IsNumber()
    @IsLatitude()
    lat: number;

    @IsNotEmpty()
    @IsNumber()
    @IsLongitude()
    long: number;
}