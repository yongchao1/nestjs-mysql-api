import { RoleAccessEntity } from './../../entities/role.access.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, EntityManager } from 'typeorm';
import { RoleAccessResDto } from '../../controllers/role-access/dto/role.access.res.dto';
import { RoleAccessReqDto } from '../../controllers/role-access/dto/role.access.req.dto';

@Injectable()
export class RoleAccessService {
  constructor (
    @InjectRepository(RoleAccessEntity)
    private readonly roleAccessRepository: Repository<RoleAccessEntity>
  ) { }

  /**
   * @Author: 水痕
   * @Date: 2021-03-24 21:49:26
   * @LastEditors: 水痕
   * @Description: 给当前角色ID授权菜单、接口权限
   * @param {*}
   * @return {*}
   */
  async roleToAccess(roleAccessReqDto: RoleAccessReqDto): Promise<string> {
    return getManager().transaction(async (entityManager: EntityManager) => {
      const { roleId, accessList, type } = roleAccessReqDto;
      await entityManager.delete<RoleAccessEntity>(RoleAccessEntity, { roleId, type });
      const newAccessList = accessList.map((item: number) => {
        return {
          roleId,
          type,
          accessId: item,
        }
      });
      const result = entityManager.create<RoleAccessEntity>(RoleAccessEntity, newAccessList);
      await entityManager.save<RoleAccessEntity>(result);
    }).then(() => {
      return '分配菜单权限成功';
    }).catch((e: HttpException) => {
      throw new HttpException(e, HttpStatus.OK);
    })
  }

  /**
   * @Author: 水痕
   * @Date: 2021-03-24 21:35:59
   * @LastEditors: 水痕
   * @Description: 根据角色id返回授权的资源列表
   * @param {*}
   * @return {*}
   */
  async accessListByRoleId(roleId: number, type: number): Promise<RoleAccessResDto[]> {
    return await this.roleAccessRepository.find({ where: { roleId, type }, select: ['id', 'accessId'] });
  }
}
