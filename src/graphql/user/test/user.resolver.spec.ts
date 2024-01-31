import { Test } from '@nestjs/testing';
import { UserResolver } from '../user.resolver';
import { UserService } from '../user.service';
import { UserLoader } from '../user.loader';
import { UserEntity } from '@entities';
import { CreateUserInput } from '../user.input';
import { EntityStatus, UserTypeEnum } from '../../../common/types/enum';

describe('UserResolver', () => {
  let userResolver: UserResolver;
  let userService: UserService;
  const mockUserService = {
    findAllUsers: jest.fn(),
    createUser: jest.fn(),
  };
  const mockUserLoader = {};

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserResolver, UserService, UserLoader],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideProvider(UserLoader)
      .useValue(mockUserLoader)
      .compile();
    userService = moduleRef.get<UserService>(UserService);
    userResolver = moduleRef.get<UserResolver>(UserResolver);
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const result: UserEntity[] = [];
      jest
        .spyOn(userService, 'findAllUsers')
        .mockReturnValue(Promise.resolve(result));

      expect(await userResolver.getUsers()).toBe(result);
    });
  });

  describe('createUser', () => {
    it('should return a user', async () => {
      const expectUser: UserEntity = {
        id: '',
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        roleId: 89,
        createdAt: new Date(),
        updatedAt: new Date(),
        login_date: new Date(),
        status: '',
        userType: '',
      };
      const userInput: CreateUserInput = {
        first_name: 'Oun',
        last_name: 'Pav',
        username: 'Oun Pav',
        email: 'oun.pav@gmail.com',
        password: '12345678',
        roleId: 89,
        status: EntityStatus.ACTIVE,
        userType: UserTypeEnum.ADMIN,
      };
      jest
        .spyOn(userService, 'createUser')
        .mockReturnValue(Promise.resolve(expectUser));
      expect(await userResolver.createUser(userInput)).toBe(expectUser);
    });
  });
});
