import { ListItem } from "../models/listItem.js";

export const createListItem = async (req, res) => {
  const content = req.body;
  content.userId = req.session.user_id;
  const listId = content.listId;
  const newListItem = new ListItem(content);
  await newListItem.save();
  res.redirect(`/listItems/${listId}`);
};

export const deleteListItem = async (req, res) => {
  const id = req.params.id;
  const listId = req.body.listId;
  await ListItem.findByIdAndDelete(id);
  res.redirect(`/listItems/${listId}`);
};

export const editListItem = async (req, res) => {
  const id = req.params.id;
  const editListItem = await ListItem.findById(id);
  res.render("editListItem", { editListItem });
};

export const updateListItem = async (req, res) => {
  const id = req.params.id;
  const listId = req.body.listId;
  const content = req.body;
  await ListItem.findByIdAndUpdate(id, content);
  res.redirect(`/listItems/${listId}`);
};
