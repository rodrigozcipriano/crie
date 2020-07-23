const functions = require("firebase-functions");
const cors = require("cors");

const express = require("express");
const app = express();
app.use(cors());

const { db } = require("./utils/admin");

const {
  signup,
  login,
  getUsersList,
  changeUserArea,
  changeUserRole,
} = require("./handlers/users");
const {
  getIdeas,
  createIdea,
  getIdeaDetail,
  getLastIdeas,
  changeIdeaStatus,
} = require("./handlers/ideas");
const { createNotification } = require("./handlers/notifications");

const { getAreas, createArea } = require("./handlers/companies");

const { FBAuth } = require("./utils/fbAuth");
const { FBAuthAdmin } = require("./utils/fbAuthAdmin");

// users routes
app.post("/signup", signup);
app.post("/login", login);
app.get("/userslist", FBAuth, getUsersList);
app.post("/changeuserarea", FBAuthAdmin, changeUserArea);
app.post("/changeUserRole", FBAuthAdmin, changeUserRole);

// ideas routes
app.get("/ideas", FBAuth, getIdeas);
app.post("/newidea", FBAuth, createIdea);
app.get("/ideaDetails/:ideaId", FBAuth, getIdeaDetail);
app.get("/allideas", FBAuth, getLastIdeas);
app.post("/changeIdeaStatus/:ideaId", FBAuthAdmin, changeIdeaStatus);

// companies routes
app.get("/areas", FBAuth, getAreas);
app.post("/newarea", FBAuthAdmin, createArea);

// notifications routes
app.post("/newnotification", FBAuth, createNotification);

exports.api = functions.https.onRequest(app);
