import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';
import { LoginVo } from './vo/login.vo';
import * as svgCaptcha from 'svg-captcha';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiTags('后台管理系统')
  @ApiOperation({
    summary: '用户登录',
    description: '用户名可以是手机号码、邮箱、用户名',
  })
  @ApiCreatedResponse({
    type: LoginDto,
    description: '用户登录返回值'
  })
  @Post('login')
  async loginApi(@Body() req: LoginDto): Promise<LoginVo> {
    if (req.captcha.toLowerCase() === req.codeText.toLowerCase()) {
      return await this.loginService.loginApi(req);
    } else {
      throw new HttpException('验证码错误', HttpStatus.OK);
    }
  }

  @ApiTags('后台管理系统')
  @ApiOperation({
    summary: '刷新token',
    description: '刷新token',
  })
  @ApiBearerAuth()
  @Get('refresh')
  async refreshTokenApi(@Query('token') token: string): Promise<LoginVo> {
    return await this.loginService.refreshTokenApi(token);
  }

  @ApiTags('后台管理系统')
  @ApiOperation({
    summary: '获取验证码',
    description: '获取验证码',
  })
  @ApiCreatedResponse({
    type: String,
    description: '验证码'
  })
  @Get('captcha')
  getCaptchaApi() {
    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#fff', //背景颜色
    });
    // session['code'] = captcha['text']; //存储验证码记录到session
    // res.set('Content-Type', 'image/svg+xml');
    // res.send(captcha['data']);
    return captcha;
  }
}
