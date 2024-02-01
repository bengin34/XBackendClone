import { Router } from "express";

const router = Router();

//create user
router.post("/user", (req, res) => {
  res.status(501).json({ error: "Not implemented" });
});

//list users
router.get("/users", (req, res) => {
  res.status(501).json({ error: "Not implemented" });
});

//get one user
router.get("/user/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `Not implemented: ${id}` });
});

//update user
router.put("/user/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `Not implemented: ${id}` });
});

//delete user
router.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `Not implemented: ${id}` });
});

export default router;
