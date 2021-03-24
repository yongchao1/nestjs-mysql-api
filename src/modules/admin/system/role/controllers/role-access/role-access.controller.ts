import { Controller, UseGuards, Get, Param, ParseIntPipe, Body, Post } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@src/guard/auth/auth.guard';
import adminConfig from '@src/config/admin.config';
import { RoleAccessService } from '../../services/role-access/role-access.service';
import { RoleAccessResDto } from './dto/role.access.res.dto';
import { RoleAccessReqDto } from './dto/role.access.req.dto';

@ApiTags('后台管理系统-角色资源管理')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller(`${adminConfig.adminPath}/role_access`)
export class RoleAccessController {
  constructor (
    private readonly roleAccessService: RoleAccessService
  ) { }

  @ApiOperation({summary: '给角色分配菜单资源', description: '给当前角色分配菜单或接口资源'})
  @ApiCreatedResponse({
    type: String,
    description: '给当前角色分配菜单或接口资源返回值'
  })
  @Post('menus')
  async roleToAccess(
    @Body() roleAccessReqDto: RoleAccessReqDto,
  ):Promise<string> {
    return await this.roleAccessService.roleToAccess(roleAccessReqDto);
  }

  @ApiOperation({ 
    summary: '获取资源', 
    description: '根据角色ID获取已经分配的菜单或接口',
    externalDocs: {
      url: 'xxx/角色id/type=(2:菜单,3:接口)'
    }
  })
  @ApiCreatedResponse({
    type: RoleAccessResDto,
    isArray: true,
    description: '根据角色ID返回授权的资源列表'
  })
  @Get(':roleId/:type')
  async accessListByRoleId(
    @Param('roleId', new ParseIntPipe()) roleId: number,
    @Param('type', new ParseIntPipe()) type: number,
  ): Promise<RoleAccessResDto[]> {
    return await this.roleAccessService.accessListByRoleId(roleId, type);
  }
}
