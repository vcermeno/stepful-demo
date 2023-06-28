const { PrismaClient } = require("@prisma/client");

export default async (req, res) => {
  const prisma = new PrismaClient();

  const start = req.query.start ? new Date(req.query.start) : new Date();
  const end = req.query.end ? new Date(req.query.end) : new Date();

  const whereClause = {
    AND: [
      { startTime: { lt: end } },
      { endTime: { gte: start } },
      { isBooked: true },
    ],
  };

  if (req.query.coachId) {
    whereClause.AND.push({ coachId: Number(req.query.coachId) });
  }

  const slots = await prisma.slot.findMany({
    where: whereClause,
  });

  await prisma.$disconnect();
  res.status(200).send(slots);
};
