import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
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
    this.logger.log(`New user registered with email: ${newUser.email}`);
    const payload = { sub: newUser.id, email: newUser.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(loginDto: LoginDto) {
    /**
     * 1. Validate User Credentials
     * 2. Generate JWT token
     * 3. Return the Token
     */
    const user = await this.userService.getUserByEmail(loginDto.email);
    if (!user) {
      throw new ConflictException('Invalid Credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new ConflictException('Invalid Credentials');
    }

    this.logger.log(`User logged in with email: ${user.email}`);
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
