import express from "express";
const router = express.Router();
import {
  createListItem,
  deleteListItem,
  editListItem,
  updateListItem,
} from "../controllers/listItemsController.js";

router.post("/createListItem", createListItem);

router.post("/deleteListItem/:id", deleteListItem);

router.get("/editListItem/:id", editListItem);

router.post("/updateListItem/:id", updateListItem);

export default router;
