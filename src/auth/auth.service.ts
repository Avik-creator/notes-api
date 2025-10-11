import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  register(registerDto: RegisterDto) {
    // Registration logic here
    /**
     * 1. Checking if user email Exists
     * 2. Hash the password
     * 3. Store the user in the database
     * 4. Generate JWT token
     * 5. Return the Token
     */

    const user = this.userService.getUserByEmail(registerDto.email);
    return user;
  }
}
