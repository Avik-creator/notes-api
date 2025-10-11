import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUserByEmail(email: string) {
    // Logic to get user by email from the database
    return email;
  }
}
