import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

//create user
router.post("/", async (req, res) => {
  const { email, name, username } = req.body;
  try {
    const result = await prisma.user.create({
      data: {
        email,
        name,
        username,
        bio: "Hello, I am new here!",
      },
    });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "User create error" });
  }
});

//list users
router.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany();

  res.json(allUsers);
});

//get one user
router.get("/:id", async (req, res) => {
  const { id } = req.params;
try {
  const user = await prisma.user.findUnique({ where: { id: Number(id) } });
  res.json(user);
} catch (error) {
  res.status(404).json({ error: "User not found!" });
}

});

//update user
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { bio, name, image } = req.body;
  try {
    const result = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        bio,
        name,
        image,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Update error" });
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
   await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.sendStatus(200)
  } catch (error) {
    res.status(400).json({ error: "User delete error" });
  }
});

export default router;
