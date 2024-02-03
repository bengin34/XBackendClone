import { Router } from "express";
import * as help from "../util/helpers";
import { PrismaClient } from "@prisma/client";
import { sendEmailToken } from "../services/emailService";

const router = Router();
const prisma = new PrismaClient();

router.post("/login", async (req, res) => {
  const { email } = req.body;

  // generate token
  const emailToken = help._generateEmailToken();
  const expiration = help.expirationTime;

  try {
    const createdToken = await prisma.token.create({
      data: {
        type: "EMAIL",
        emailToken,
        expiration,
        user: {
          connectOrCreate: {
            where: { email },
            create: { email },
          },
        },
      },
    });
    await sendEmailToken(email, emailToken);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
});

// validate the emailToken
//Generate a long-lived JWT token

router.post("/authenticate", async (req, res) => {
  const { email, emailToken } = req.body;

  const dbEmailToken = await prisma.token.findUnique({
    where: {
      emailToken,
    },
    include: {
      user: true,
    },
  });

  if (!dbEmailToken || !dbEmailToken.valid) {
    return res.sendStatus(401);
  }
  if (dbEmailToken.expiration < new Date()) {
    return res.status(401).json({ error: "Token expired" });
  }

  if (dbEmailToken?.user?.email !== email) {
    return res.sendStatus(401);
  }

  const expiration = help.authenticationExpirationTime;
  //generate an  API token
  const apiToken = await prisma.token.create({
    data: {
      type: "API",
      expiration,
      user: {
        connect: {
          email,
        },
      },
    },
  });

  //Invalidate the email
  await prisma.token.update({
    where: { id: dbEmailToken.id },
    data: { valid: false },
  });

  //generate the JWT token
  const authToken = help._generateAuthToken(apiToken.id);
  res.json({ authToken });
});

export default router;
