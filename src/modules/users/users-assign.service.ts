import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HairdresserSpec, HairdresserTimeSlots } from '@prisma/client';
import * as moment from 'moment';
import { PrismaService } from '../prisma/prisma.service';
import { WarmupService } from '../warmup/warmup.service';
import { AssignUserDto } from './dto/assign-user.dto';
import { UnAssignUserDto } from './dto/un-assign-user.dto';

type GetUserAssigns = {
  id: string;
  timeSlotStart: Date;
  timeSlotEnd: Date;
  hairdrasser: {
    id: string;
    spec: HairdresserSpec;
    user: {
      name: string;
    };
  };
};

@Injectable()
export class UserAssignService {
  constructor(
    private prisma: PrismaService,
    private readonly warmapService: WarmupService,
  ) {}

  async getUserAssigns(userId: string): Promise<GetUserAssigns[]> {
    return await this.prisma.hairdresserTimeSlots.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        timeSlotStart: true,
        timeSlotEnd: true,
        hairdrasser: {
          select: { id: true, spec: true, user: { select: { name: true } } },
        },
      },
    });
  }

  async assignToHairdresser(
    assignUserDto: AssignUserDto,
  ): Promise<HairdresserTimeSlots> {
    const timeSlot = await this.prisma.hairdresserTimeSlots.findFirst({
      where: {
        hairdresserId: assignUserDto.hairdresserId,
        timeSlotStart: moment(assignUserDto.timeSlotStart).toISOString(),
      },
    });

    if (!timeSlot) throw new NotFoundException(`Time slot not found`);
    if (timeSlot.userId === assignUserDto.userId)
      throw new ConflictException(`You already booked on this slot`);
    else if (timeSlot.userId)
      throw new ConflictException(`Time slot already booked`);

    const updatedTimeSlot = await this.prisma.hairdresserTimeSlots.update({
      where: { id: timeSlot.id },
      data: {
        userId: assignUserDto.userId,
      },
    });

    await this.warmapService.updateTimers();

    return updatedTimeSlot;
  }

  async unAssignToHairdresser(
    req,
    unAssignUserDto: UnAssignUserDto,
  ): Promise<HairdresserTimeSlots> {
    const timeSlot = await this.prisma.hairdresserTimeSlots.findFirst({
      where: {
        id: unAssignUserDto.timeSlotId,
      },
    });

    if (!timeSlot) throw new NotFoundException(`Time slot not found`);

    //unAssignUserDto.userId need to be req.user.id, Only the user who is assigned or the admin can cancel the appointment
    if (timeSlot.userId !== unAssignUserDto.userId || !req?.user?.isAdmin)
      throw new ForbiddenException(
        `You cannot edit someone else's appointment`,
      );

    return await this.prisma.hairdresserTimeSlots.update({
      where: {
        id: timeSlot.id,
      },
      data: {
        userId: null,
      },
    });
  }
}
