// const express  = require("express");
// const { AddNewUser, getAllStudent } = require("../controller/Student.controller.js");
import express from "express";
import {
  AddNewUser,
  getAllUser,
  getUserById,
  loginUser,
  updateUser
} from "../controller/student.controller.js";
const router = express.Router();

// router.get("/", getAllStudent);
router.get("/", getAllUser);
router.post("/addUser", AddNewUser);
router.get("/getUserBy", getUserById);
router.post("/login", loginUser);
router.put("/updateUserById/:id", updateUser)

// router.delete("/delete", (req, res) => {
//   res.send("student delete api call");
// });

// module.exports = router;
export default router;
