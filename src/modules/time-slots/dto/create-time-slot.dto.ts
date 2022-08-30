import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class CreateTimeSlotDto {
  @ApiProperty({ description: 'Hairdresser Id' })
  @IsString()
  readonly hairdresserId: string;

  @ApiProperty({ description: 'Time slot start time' })
  @IsDateString()
  readonly timeSlotStart: string;

  @ApiProperty({ description: 'Time slot end time' })
  @IsDateString()
  readonly timeSlotEnd: string;
}
