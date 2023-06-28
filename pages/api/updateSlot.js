import { PrismaClient } from "@prisma/client";

export default async function handle(req, res) {
  const prisma = new PrismaClient();
  const slotId = req.query.slotId;
  console.log({ slotId })

  if (req.method === 'PUT') {
    console.log('put method')
    // Get the data from the request body
    const { notes, satisfactionScore } = req.body;
    console.log({ body: req.body })

    // Ensure that we have the necessary data
    if (typeof notes === 'undefined' && typeof satisfactionScore === 'undefined') {
      await prisma.$disconnect();
      return res.status(400).json({ error: 'You must provide notes or a satisfaction score to update.' });
    }

    // Create an update object with only the properties that were provided
    const updates = {};
    if (typeof notes !== 'undefined') {
      updates.notes = notes;
    }
    if (typeof satisfactionScore !== 'undefined') {
      updates.satifactionScore = Number(satisfactionScore);
    }

    // Update the slot in the database
    const updatedSlot = await prisma.slot.update({
      where: { id: slotId },
      data: updates,
    });

    console.log({ updatedSlot })
    
    await prisma.$disconnect();

    // Send the updated slot back to the client
    return res.status(200).json(updatedSlot);
  }

  await prisma.$disconnect();

  // Handle any other HTTP methods
  res.setHeader('Allow', ['PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};