import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import dotenv from "dotenv";
// Import Controllers
import authRoutes from "./routes/authRoutes.js";
import listNameRoutes from "./routes/listNamesRoutes.js";
import listItemRoutes from "./routes/listItemsRoutes .js";
// Import Models
import { User } from "./models/user.js";
import { ListName } from "./models/listName.js";
import { ListItem } from "./models/listItem.js";
// View Helper
import ejsMate from "ejs-mate";

dotenv.config();
const app = express();

// Database
mongoose
  // .connect("mongodb://localhost:27017/listCreator")
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Views
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", "views");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: "notagoodsecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// Routes
app.use("/", authRoutes);
app.use("/", listNameRoutes);
app.use("/", listItemRoutes);

app.get("/", async (req, res) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }

  const user = await User.findOne({ _id: req.session.user_id });
  const listNames = await ListName.find({ userId: req.session.user_id });

  res.render("index", { user, listNames });
});

app.get("/listItems/:id", async (req, res) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }
  const listId = req.params.id;
  const listName = await ListName.findById(listId);
  const user = await User.findOne({ _id: req.session.user_id });
  const listItems = await ListItem.find({
    listId,
    userId: req.session.user_id,
  });
  res.render("listItems", { user, listName, listItems });
});

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
