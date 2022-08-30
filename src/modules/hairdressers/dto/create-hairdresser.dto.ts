import { ApiProperty } from '@nestjs/swagger';
import { HairdresserSpec } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreateHairdresserDto {
  @ApiProperty({ description: 'User id' })
  @IsString()
  readonly userId: string;

  @ApiProperty({ description: 'Hairdresser Spec' })
  @IsEnum(HairdresserSpec)
  readonly spec: HairdresserSpec;
}
