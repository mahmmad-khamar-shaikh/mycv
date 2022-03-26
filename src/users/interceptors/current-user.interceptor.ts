import {
    NestInterceptor,
    CallHandler,
    ExecutionContext,
    Injectable
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {

    constructor(private userService: UsersService) { }


    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {

        const request = context.switchToHttp().getRequest();
        const { userId } = request.session || {};
        console.log('current userID interceptor =======>', userId);

        if (userId) {
            const user = await this.userService.findOne(userId);
            console.log(`current User *************`, user);
            request.currentUser = user;
        }

        return next.handle();


    }

}