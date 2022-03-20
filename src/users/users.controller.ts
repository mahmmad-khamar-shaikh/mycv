import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
    Session,
    UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './users.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    constructor(private userService: UsersService, private authService: AuthService) {
    }


    //     @Get('/whoami')
    //    async whoAmI(@Session() session: any) {
    //       const user= await this.userService.findOne(session.userId);
    //       if(!user){
    //           throw new NotFoundException('User Not found')
    //       }
    //       return user;
    //     }


    @Get('/whoami')
    @UseGuards(AuthGuard)
    async whoAmI(@CurrentUser() user: User) {

        console.log(`currentuser in controller `, user);
        if(!user){
            throw new NotFoundException('your are not logged in');
        }


        return user;
    }



    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signIn(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signout')
    singOut(@Session() session: any) {
        session.userId = undefined;
    }



    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signUp(body.email, body.password);
        session.userId = user.id
        return user;
    }
    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(id, body)
    }


    @Get('/:id')
    getUserById(@Param('id') id: string) {
        return this.userService.findOne(id);
    }
    @Get()
    getAllUser(@Query('email') email: string) {
        return this.userService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.userService.remove(id);
    }

    @Get('/colors/:color')
    setColor(@Param('color') color: string, @Session() session: any) {
        return session.color;
    }

    @Get('/colors')
    getColor(@Session() session) {
        return session.color;
    }

}
