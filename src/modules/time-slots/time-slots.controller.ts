import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TimeSlotsService } from './time-slots.service';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';
import { AuthenticatedGuard } from '../auth/authenticated.guard';

@Controller('time-slots')
export class TimeSlotsController {
  constructor(private readonly timeSlotsService: TimeSlotsService) {}

  @Get(':hairdresserId')
  findAll(@Param('hairdresserId') hairdresserId: string) {
    return this.timeSlotsService.findAllHairdresserTimeSlots(hairdresserId);
  }

  @UseGuards(AuthenticatedGuard)
  @Post()
  create(@Body() createTimeSlotDto: CreateTimeSlotDto) {
    return this.timeSlotsService.createTimeSlot(createTimeSlotDto);
  }
}
