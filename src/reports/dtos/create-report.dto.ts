
import { Type } from 'class-transformer';
import { IsString, IsNumber, Min, Max, IsLongitude, IsLatitude } from 'class-validator';





export class CreateReportDTO {

    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1930)
    @Max(Date.now())
    year: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;


    @IsLongitude()
    lang: number;

    @IsLatitude()
    lat: number;

    @IsNumber()
    @Min(100)
    @Max(100000)
    price: number
}