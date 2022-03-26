import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {

    type speed = number;
    type cost = number;

    const carSpecs: [speed, cost] = [400, 500000];



  }



  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
