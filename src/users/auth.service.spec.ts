import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './users.entity';
import { UsersService } from './users.service';


describe('AuthService', () => {

    let authService: AuthService;

    beforeEach(async () => {
        const fakeUserService: Partial<UsersService> = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) =>
                Promise.resolve({ id: 100, email, password } as User)
        }


        const module = await Test.createTestingModule({
            providers: [AuthService, {
                provide: UsersService,
                useValue: fakeUserService
            }]
        }).compile();

        authService = module.get(AuthService);
    });


    it('should create auth service', async () => {


        expect(authService).toBeDefined();


    });


    it('should create user with hash and salted password',async ()=>{

        const user = await authService.signUp('abc@test.com','abc');
        expect(user.password).not.toEqual('abc');
        const[hash,salt]= user.password.split('.');
        console.log(JSON.stringify(user));
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();


    });
});


