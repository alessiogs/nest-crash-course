import { Injectable } from '@nestjs/common';
import { User } from './entity/user';
import { mockUsers } from 'src/mock/users';

@Injectable()
export class UsersService {
  getUserByEmail(email: string): User | undefined {
    const user = mockUsers.find((user) => user.email === email);
    return user;
  }
}
