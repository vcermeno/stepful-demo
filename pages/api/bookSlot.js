import { PrismaClient } from '@prisma/client'

export default async (req, res) => {
  const prisma = new PrismaClient()

  try {
    const slotId = req.body.slotId
    const studentId = req.body.studentId
    const studentName = req.body.studentName
    console.log({ body: req.body })

    const updatedSlot = await prisma.slot.update({
      where: { id: slotId },
      data: { isBooked: true, studentId, studentName }
    });

    res.status(200).json(updatedSlot);
  } catch (error) {
    res.status(500).json({error: "Unable to book slot"});
  } finally {
    await prisma.$disconnect();
  }
}