import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CurrentUser, ICurrentUserType } from '@src/decorators';
import { AuthGuard } from '@src/guard/auth.guard';
import { MenusService } from './menus.service';
import { ApiVo, MenusVo } from './vo/menus.vo';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @ApiTags('后台管理系统')
  @ApiOperation({
    summary: '获取菜单',
    description: '菜单列表',
  })
  @ApiBearerAuth()
  @Get()
  async getAllMenusApi(@CurrentUser('userInfo') userInfo: ICurrentUserType): Promise<MenusVo[]> {
    return await this.menusService.getAllMenusApi(userInfo);
  }

  @ApiTags('后台管理系统')
  @ApiOperation({
    summary: '获取按钮',
    description: '按钮列表',
  })
  @ApiBearerAuth()
  @Get('btnList')
  async getBtnByMenusUrlApi(
    @CurrentUser('userInfo') userInfo: ICurrentUserType,
    @Query('urlName') urlName: string
  ): Promise<ApiVo[]> {
    return await this.menusService.getBtnByMenusUrlApi(urlName, userInfo);
  }
}
