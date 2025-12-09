import express from "express";
const router = express.Router();
import {
  createListName,
  deleteListName,
  editListName,
  updateListName,
} from "../controllers/listNamesController.js";

router.post("/createListName", createListName);

router.post("/deleteListName/:id", deleteListName);

router.get("/editListName/:id", editListName);

router.post("/updateListName/:id", updateListName);

export default router;
