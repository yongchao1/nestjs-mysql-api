import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccountDto {
  @MaxLength(50, { message: '账号最大长度为50' })
  @IsNotEmpty({ message: '账号不能为空' })
  @ApiProperty({ description: '用户名' })
  username!: string;

  @Min(1, { message: '排序最小值为1' })
  @IsInt({ message: '排序必须是整数' })
  @Type(() => Number)
  @IsOptional({ message: '排序' })
  @ApiProperty({ description: '排序' })
  sort!: number;

  @Min(1, { message: '父节点id最小值为1' })
  @IsInt({ message: '父节点id必须是整数' })
  @Type(() => Number)
  @IsOptional({ message: '父节点id' })
  @ApiProperty({ description: '父节点' })
  parentId!: number;

  @Min(1, { message: '部门节点id最小值为1' })
  @IsInt({ message: '部门节点id必须是整数' })
  @Type(() => Number)
  @IsOptional({ message: '部门节点id' })
  @ApiProperty({ description: '部门节点id' })
  departmentId!: number;
}
