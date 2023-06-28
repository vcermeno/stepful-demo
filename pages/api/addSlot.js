export const config = {
    api: {
      bodyParser: true,
    },
  };

const { PrismaClient } = require('@prisma/client');

export default async (req, res) => {
    const prisma = new PrismaClient();

    try {
        const slot = req.body;

        if (!slot.startTime && !slot.endTime){
            return res.status(401).json({ error: 'Must have start time and end time' });
        }

        // Verify slot is two hours
        const startTime = new Date(slot.startTime);
        const endTime = new Date(slot.endTime);
        const duration = (endTime - startTime) / 1000 / 60 / 60; // Convert to hours

        if (duration !== 2) {
            return res.status(401).json({ error: 'All slots must be two hours' });
        }

        // Otherwise add slot to db
        const createdSlot = await prisma.slot.create({ data: { ...slot, isBooked: false }});
        res.status(200).json(createdSlot);
    } catch (error) {
        console.log({ error })
        res.status(500).json({ error: 'An error occurred while creating the slot' });
    } finally {
        await prisma.$disconnect();
    }
};