// 策略文件

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'dasdjanksjdasd',
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id,
      mobile: payload.mobile,
      nickname: payload.nickname,
    };
  }
}
