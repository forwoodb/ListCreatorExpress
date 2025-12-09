import { ListItem } from "../models/listItem.js";
import { ListName } from "../models/listName.js";

export const createListName = async (req, res) => {
  const content = req.body;
  content.userId = req.session.user_id;
  const newListName = new ListName(content);
  await newListName.save();
  res.redirect("/");
};

export const deleteListName = async (req, res) => {
  const listId = req.params.id;
  await ListName.findByIdAndDelete(listId);
  await ListItem.deleteMany({ listId });
  res.redirect("/");
};

export const editListName = async (req, res) => {
  const id = req.params.id;
  const editListName = await ListName.findById(id);
  res.render("editListName", { editListName });
};

export const updateListName = async (req, res) => {
  const id = req.params.id;
  const content = req.body;
  await ListName.findByIdAndUpdate(id, content);
  res.redirect("/");
};
