import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';

import { encryptPassword, makeSalt } from 'src/utils/cryptogram';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { TokenVO } from './vo/token.vo';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDTO: RegisterDTO): Promise<any> {
    // 在进入注册逻辑前，先对注册信息进行检查
    await this.checkUserRegister(registerDTO);

    const { nickname, password, mobile } = registerDTO;
    const salt = makeSalt();
    const hashPassword = encryptPassword(password, salt);

    const newUser: User = new User();
    newUser.mobile = mobile;
    newUser.nickname = nickname;
    newUser.password = hashPassword;
    newUser.salt = salt;

    return await this.userRepository.save(newUser);
  }

  /**
   * 检查用户注册信息
   * @param registerDTO
   */
  async checkUserRegister(registerDTO: RegisterDTO): Promise<any> {
    const { password, passwordRepeat, mobile } = registerDTO;

    //   检查密码与确认密码的一致性
    if (password !== passwordRepeat) {
      throw new NotFoundException('密码与确认密码必须保持一致');
    }

    // 检查当前手机号是否已被注册
    const mobileRegistered = await this.userRepository.findOne({ mobile });
    if (mobileRegistered) {
      throw new NotFoundException('手机号已被注册');
    }
  }

  /**
   * 用户登录
   * @param loginDTO
   */
  async login(loginDTO: LoginDTO): Promise<any> {
    const user = await this.checkUserLogin(loginDTO);
    const token = await this.certificate(user);
    return {
      info: {
        token,
      },
    };
  }

  /**
   * 检查用户登录信息
   * @param loginDTO
   */
  async checkUserLogin(loginDTO: LoginDTO): Promise<any> {
    const { password, mobile } = loginDTO;

    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.salt')
      .addSelect('user.password')
      .where('user.mobile = :mobile', { mobile })
      .getOne();

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    const { password: dbPassword, salt } = user;
    const currentHashPassword = encryptPassword(password, salt);

    if (currentHashPassword !== dbPassword) {
      throw new NotFoundException('账号/密码错误');
    }

    return user;
  }

  /**
   * 生成token
   */
  async certificate(user: User) {
    console.log(`user: `, user);
    const payload = {
      id: user.id,
      nickname: user.nickname,
      mobile: user.mobile,
    };

    const token = this.jwtService.sign(payload);
    return token;
  }
}
