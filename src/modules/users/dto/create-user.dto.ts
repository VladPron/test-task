import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User Phone' })
  @IsString()
  readonly phone: string;

  @ApiProperty({ description: 'User Email' })
  @IsString()
  readonly email: string;

  @ApiProperty({ description: 'User Name' })
  @IsString()
  readonly name: string;
}
