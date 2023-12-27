import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @MaxLength(50, { message: '角色名称最大长度为50' })
  @IsNotEmpty({ message: '角色名称' })
  @ApiProperty({ description: '角色名' })
  name!: string;

  @MaxLength(255, { message: '描述最大长度255' })
  @IsOptional({ message: '描述' })
  @ApiProperty({ description: '描述' })
  description!: string;

  @Min(1, { message: '排序最小值为1' })
  @IsInt({ message: '排序必须是整数' })
  @Type(() => Number)
  @IsOptional({ message: '排序' })
  @ApiProperty({ description: '排序' })
  sort!: number;
}
