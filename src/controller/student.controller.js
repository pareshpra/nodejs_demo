// const UserModal = require("../modal/user.modal");
import UserModal from "../modal/user.modal.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generate.token.js";

const AddNewUser = async (req, res) => {
  try {
    const { firstName, email, lastName, userName, password } = req.body;

    if (!firstName || !email) {
      return res.status(400).json({
        success: false,
        message: "Please enter required details",
      });
    }

    const userFind = await UserModal.findOne({ email: email }); // find the email already used or not
    if (userFind) {
      return res.status(400).json({
        success: false,
        message: "the Email is already used",
      });
    }

    let hashPassword = "";

    if (password) {
      const saltRounds = 10;
      hashPassword = await bcrypt.hash(password, saltRounds);
    }
    const userDetails = new UserModal({
      firstName,
      email,
      lastName,
      email,
      password: hashPassword || undefined,
      userName,
    });

    const userData = await userDetails.save();

    return res.status(200).json({
      message: "User registration Successfully",
      data: userData,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getAllUser = async (req, res) => {
  try {

    const { search } = req?.query;
    const page = Number(req?.query?.page) || 1;
    const limit = Number(req?.query?.limit) || 10;
    const pageNumber = page ? parseInt(page, 10) : undefined;
    const skip = pageNumber ? (pageNumber - 1) * limit : undefined;  /// skip the previous data

    let allUser;
    if (search) {
      const searchRegex = new RegExp(search, 'i'); // 'i' flag for case-insensitive search
      // allUser = await UserModal.find({
      //   "$or":[
      //     {
      //       "firstName":{searchRegex: search}
      //     }
      //   ]
      // }) 
      // console.log("search all user", allUser);
      allUser = await UserModal.find({ firstName: searchRegex }).sort({ createdAt: -1 }).skip(skip).limit(limit);
    } else {
      allUser = await UserModal.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    }

    const totalRecords = await UserModal.countDocuments();
    const hasMorePages = pageNumber ? pageNumber * limit < totalRecords : false;
    const recordsPerPage = allUser.length;
    const totalUsers = allUser.length;

    if (allUser.length > 0) {
      return res.status(200).json({
        success: true,
        message: "User found successfully",
        data: allUser,
        totalUsers,
        currentPage: pageNumber || 1,
        hasMorePages,
        recordsPerPage
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No user found matching the search criteria",
        data: null,
      });
    }
  } catch (error) {
    return res.json(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UserModal.findById(req?.query?.id); /// this the get the id form the query params
    // const user = await UserModal.findById(req?.params?.id); // this the get the id form the /id
    return res.status(200).json({
      status: true,
      message: "User get successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await UserModal.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(password, user?.password);
    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    const { accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry } = await generateToken(
      email,
      user._id
    );

    return res.json({
      message: "Login successful",
      user: user,
      accessToken,
      accessTokenExpiry,
      refreshToken,
      refreshTokenExpiry,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    
    const {id} = req.params;
    
    const user = await UserModal.findById(id);
    
    if(!user){
      return res.status(400).json({
        status: false,
        message:"User does not exist"
      })
    }
    let updateData = { ...req.body };

    const UpdateUser = await UserModal.findByIdAndUpdate(id, { $set: updateData}, {upset:true, new:true})

    return res.status(200).json({
      status:true,
      message: "Login successful",
      user: UpdateUser,
    });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};
// module.exports = { getAllStudent, AddNewUser };
export { AddNewUser, getAllUser, getUserById , loginUser, updateUser};
