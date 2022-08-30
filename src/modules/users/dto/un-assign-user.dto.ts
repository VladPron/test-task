import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UnAssignUserDto {
  @ApiProperty({ description: 'Time slot Id' })
  @IsString()
  readonly timeSlotId: string;

  @ApiProperty({ description: 'User Id' })
  @IsString()
  readonly userId: string;
}
