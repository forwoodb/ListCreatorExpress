import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";

const router = express.Router();

router.get("/register", async (req, res) => {
  res.render("register");
});

router.post("/register", registerUser);

router.get("/login", async (req, res) => {
  res.render("login");
});

router.post("/login", loginUser);

router.get("/logout", async (req, res) => {
  req.session.destroy;
  res.redirect("login");
});

export default router;
