import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';
import * as moment from 'moment';
import { HairdresserTimeSlots } from '@prisma/client';

@Injectable()
export class TimeSlotsService {
  constructor(private prisma: PrismaService) {}

  async findAllHairdresserTimeSlots(
    hairdresserId: string,
  ): Promise<HairdresserTimeSlots[]> {
    return await this.prisma.hairdresserTimeSlots.findMany({
      where: {
        hairdresserId,
      },
    });
  }

  async createTimeSlot(
    createTimeSlotDto: CreateTimeSlotDto,
  ): Promise<HairdresserTimeSlots> {
    return await this.prisma.hairdresserTimeSlots.create({
      data: {
        hairdresserId: createTimeSlotDto.hairdresserId,
        timeSlotStart: moment(createTimeSlotDto.timeSlotStart).toISOString(),
        timeSlotEnd: moment(createTimeSlotDto.timeSlotEnd).toISOString(),
      },
    });
  }
}
