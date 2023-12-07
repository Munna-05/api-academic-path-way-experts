import { TryCatch, getError, sendResponse } from "../../Helpers/Error.js";
import User from "../../Models/User.js";
import bcrypt from "bcrypt";
import { userValidation } from "./UserValidations.js";
import jwt from "jsonwebtoken";
import httpError from "../../Helpers/httpError.js";

export const UserController = {
  signup: TryCatch(async (req, res) => {
    const { name, email, password, phone, dob } = req.body;
    console.log(
      "🚀 ~ file: UserController.js:9 ~ signup:TryCatch ~  req.body;:",
      req.body
    );
    const { error, value } = userValidation.validate(req.body);
    if (error) {
      console.log(getError(error));
      sendResponse(400, { message: getError(error) }, res);
    } else {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User already exists with this email." });
      }

      let hashedPassword;
      bcrypt.hash(password, 10, async function (err, hash) {
        // Store hash in your password DB.
        if (err) {
          console.log(err);
        } else {
          console.log(hash);
          hashedPassword = hash;
          console.log(name, email, hashedPassword, phone);
          // Create a new user with the hashed password
          const newUser = new User({
            name,
            email,
            password: hash,
            phone,
            dob,
          });
          const saved = await newUser.save();
          const token = jwt.sign({ userId: saved._id }, "your-secret-key", {
            expiresIn: "1h",
          });

          saved
            ? sendResponse(
                200,
                { message: "Account Created", user: saved, tkn: token },
                res
              )
            : sendResponse(400, { message: "Signup Failed" }, res);
        }
      });
    }
  }),
  login: TryCatch(async (req, res) => {
    const { email, password } = req.body;
    console.log(
      "🚀 ~ file: UserController.js:66 ~ login:TryCatch ~ req.body:",
      req.body
    );

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return sendResponse(400, { message: "Please Create an Account" }, res);
    } else if (user && password) {
      // Compare the input password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user?.password);
      if (!isPasswordValid) {
        return sendResponse(400, { message: "Invalid password." }, res);
      } else {
        const token = jwt.sign({ userId: user._id }, "your-secret-key", {
          expiresIn: "1h",
        });

        // Send the token in the response
        res
          .status(200)
          .json({ message: "Login successful.", user: user, token: token });
      }
    } else {
      throw new httpError(400, "Invalid Email or Password");
    }
  }),
  findUserById: TryCatch(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).select('-password -isAdmin').catch((e) => console.log(e));
    user
      ? sendResponse(200, { user: user }, res)
      : sendResponse(404, { message: "No user found" }, res);
  }),
};
