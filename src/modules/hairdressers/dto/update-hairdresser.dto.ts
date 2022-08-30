import { OmitType } from '@nestjs/swagger';
import { CreateHairdresserDto } from './create-hairdresser.dto';

export class UpdateHairdresserDto extends OmitType(CreateHairdresserDto, [
  'userId',
] as const) {}
