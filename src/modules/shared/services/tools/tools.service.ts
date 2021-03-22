import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import NodeAuth from 'simp-node-auth';
import * as jwt from 'jsonwebtoken';
import { isInt } from 'class-validator';

@Injectable()
export class ToolsService {
  private nodeAuth: NodeAuth;
  constructor () {
    this.nodeAuth = new NodeAuth();
  }

  makePassword(password: string): string {
    return this.nodeAuth.makePassword(password);
  }

  /**
   * @Author: 水痕
   * @Date: 2021-03-22 12:58:27
   * @LastEditors: 水痕
   * @Description: 校验密码
   * @param {string} password 未加密的密码
   * @param {string} sqlPassword 加密后的密码
   * @return {*}
   */
  checkPassword(password: string, sqlPassword: string): boolean {
    return this.nodeAuth.checkPassword(password, sqlPassword);
  }


  /**
   * @Author: 水痕
   * @Date: 2021-03-22 12:57:56
   * @LastEditors: 水痕
   * @Description: 校验分页数据
   * @param {number} pageNumber 当前页
   * @param {number} pageSize 一页显示多少条数据
   * @return {*}
   */
  public checkPage(pageNumber: number, pageSize: number): void {
    if (!isInt(Number(pageSize)) || !isInt(Number(pageNumber))) {
      throw new HttpException(`传递的pageSize:${pageSize},pageNumber:${pageNumber}其中一个不是整数`, HttpStatus.OK);
    }
  }

  public generateToken(id: number): string {
    const SECRET: string = process.env.SECRET as string;
    // 生成签名
    return jwt.sign(
      {
        id,
      },
      SECRET, // 加盐
      {
        expiresIn: '7d', // 过期时间
      },
    );
  }
}
