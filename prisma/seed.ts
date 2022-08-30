import { PrismaClient, Role, HairdresserSpec } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const id1 = 'd25584f4-2519-4029-ab7e-f0565f0230c0';
const id2 = 'd25584f4-2519-4029-ab7e-f0565f0230c1';
const id3 = 'd25584f4-2519-4029-ab7e-f0565f0230c2';

const timeSlot1 = {
  timeSlotStart: '2022-08-29T07:00:00.000Z',
  timeSlotEnd: '2022-08-29T08:00:00.000Z',
};
const timeSlot2 = {
  timeSlotStart: '2022-08-29T08:00:00.000Z',
  timeSlotEnd: '2022-08-29T09:00:00.000Z',
};
const timeSlot3 = {
  timeSlotStart: '2022-08-29T09:00:00.000Z',
  timeSlotEnd: '2022-08-29T10:00:00.000Z',
};
const timeSlot4 = {
  timeSlotStart: '2022-08-29T10:00:00.000Z',
  timeSlotEnd: '2022-08-29T11:00:00.000Z',
};
const timeSlot5 = {
  timeSlotStart: '2022-08-29T12:00:00.000Z',
  timeSlotEnd: '2022-08-29T13:00:00.000Z',
};
const timeSlot6 = {
  timeSlotStart: '2022-08-29T13:00:00.000Z',
  timeSlotEnd: '2022-08-29T14:00:00.000Z',
};

const timeSlotsArray = [
  timeSlot1,
  timeSlot2,
  timeSlot3,
  timeSlot4,
  timeSlot5,
  timeSlot6,
];

async function main() {
  await prisma.user.createMany({
    data: [
      {
        id: id1,
        phone: '+7778889660',
        email: 'kateryna@gmail.com',
        name: 'Kateryna',
      },
      {
        id: id2,
        phone: '+7778889661',
        email: 'anastasiya@gmail.com',
        password: await bcrypt.hash('testtest', 10),
        name: 'Anastasiya',
        role: Role.ADMIN,
      },
      {
        id: id3,
        phone: '+7778889662',
        email: 'olga@gmail.com',
        name: 'Olga',
      },
    ],
  });

  await prisma.hairdresser.createMany({
    data: [
      {
        spec: HairdresserSpec.male,
        userId: id1,
      },
      {
        spec: HairdresserSpec.female,
        userId: id2,
      },
      {
        spec: HairdresserSpec.weddings,
        userId: id3,
      },
    ],
  });

  const hairdressers = await prisma.hairdresser.findMany();

  await prisma.hairdresserTimeSlots.createMany({
    data: hairdressers.reduce((acc, hairdresser) => {
      return [
        ...acc,
        ...timeSlotsArray.map((slot) => ({
          ...slot,
          hairdresserId: hairdresser.id,
        })),
      ];
    }, []),
  });
}

main()
  .catch((e) => {
    //eslint-disable-next-line
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
