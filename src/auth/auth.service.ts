import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  register(registerDto: RegisterDto) {
    // Registration logic here
    /**
     * 1. Checking if user email Exists
     * 2. Hash the password
     * 3. Store the user in the database
     * 4. Generate JWT token
     * 5. Return the Token
     */
  }
}
