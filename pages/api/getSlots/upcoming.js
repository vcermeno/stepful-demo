const { PrismaClient } = require("@prisma/client");

export default async (req, res) => {
  const prisma = new PrismaClient();

  const whereClause = {
    startTime: {
      gt: new Date(),
    },
  };

  if (req.query.coachId) {
    whereClause.coachId = req.query.coachId;
  }

  if (req.query.isBooked){
    whereClause.isBooked = Boolean(req.query.isBooked)
  }

  const slots = await prisma.slot.findMany({
    where: whereClause,
    orderBy: {
      startTime: "asc",
    },
  });

  await prisma.$disconnect();
  res.status(200).send(slots);
};
