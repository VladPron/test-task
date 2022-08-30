import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WarmupService {
  constructor(private prisma: PrismaService) {}
  // Ideally make this a standalone worker, but can be improved by setting a timer for the next 24 hours only
  // and updating it from time to time, this will avoid a lot of setTimeouts
  async updateTimers() {
    const timeSlotStarts = await this.prisma.hairdresserTimeSlots.findMany({
      where: {
        timeSlotStart: {
          gt: moment().add(3, 'hours').toISOString(),
        },
        userId: {
          not: null,
        },
      },
      select: {
        timeSlotStart: true,
        userId: true,
      },
    });

    for (const timeSlot of timeSlotStarts) {
      const timeToSlot = moment(timeSlot.timeSlotStart)
        .subtract(3, 'hours')
        .valueOf();
      const timeNow = moment().valueOf();
      const timeLeft = timeToSlot - timeNow;

      this.setNotificationToUser(timeLeft, timeSlot.userId);
    }
  }

  setNotificationToUser(timeLeft, userId) {
    setTimeout(() => {
      //Here should be a notification function, send an email, sms, push notification or something else
      //eslint-disable-next-line
      console.log('User', userId);
    }, timeLeft);
  }
}
