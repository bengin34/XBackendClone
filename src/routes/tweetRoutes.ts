import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

//create tweet
router.post("/", async (req, res) => {
  const { content, image, userId } = req.body;
  try {
    const result = await prisma.tweet.create({
      data: {
        content,
        image,
        userId, // TODO manage based on the auth user
      },
    });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Tweet create error" });
  }
});

//list tweets
router.get("/", async (req, res) => {
  try {
    const allTweets = await prisma.tweet.findMany({
      include: {
        user: { select: { id: true, name: true, username: true, image: true } },
      },
    });
    res.json(allTweets);
  } catch (error) {
    res.status(400).json({ error: "Tweet list error" });
  }
});

//get one tweet
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tweet = await prisma.tweet.findUnique({ where: { id: Number(id) } });
    res.json(tweet);
  } catch (error) {
    res.status(400).json({ error: "Tweet not found!" });
  }
});

//update tweet
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { content, image } = req.body;
  try {
    const result = await prisma.tweet.update({
      where: { id: Number(id) },
      data: {
        content,
        image,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Update error" });
  }
});

//delete tweet
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.tweet.delete({ where: { id: Number(id) } });
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ error: "Delete error" });
  }
});

export default router;
