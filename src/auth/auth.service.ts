import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,

    private readonly jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto) {
    // Registration logic here
    /**
     * 1. Checking if user email Exists
     * 2. Hash the password
     * 3. Store the user in the database
     * 4. Generate JWT token
     * 5. Return the Token
     */

    const user = await this.userService.getUserByEmail(registerDto.email);
    if (user) {
      throw new ConflictException('User Already Exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);
    const newUser = await this.userService.createUser({
      ...registerDto,
      password: hashedPassword,
    });
    const payload = { sub: newUser.id, email: newUser.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
