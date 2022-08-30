import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class AssignUserDto {
  @ApiProperty({ description: 'Hairdresser Id' })
  @IsString()
  readonly hairdresserId: string;

  @ApiProperty({ description: 'Time slot start time for assigning' })
  @IsDateString()
  readonly timeSlotStart: string;

  @ApiProperty({ description: 'User Id' })
  @IsString()
  readonly userId: string;
}
