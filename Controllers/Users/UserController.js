import { TryCatch, getError, sendResponse } from "../../Helpers/Error.js";
import User from "../../Models/User.js";
import bcrypt from "bcrypt";
import { userValidation } from "./UserValidations.js";

export const UserController = {
  signup: TryCatch(async (req, res) => {
    const { name, email, password, phone, address, pincode } = req.body;
    console.log(
      "🚀 ~ file: UserController.js:9 ~ signup:TryCatch ~  req.body;:",
      req.body
    );
    const { error, value } = userValidation.validate(req.body);
    if (error) {
      console.log(getError(error));
      sendResponse(200, { message: getError(error) }, res);
    } else {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User already exists with this email." });
      }

      bcrypt.hash(password, 10, function (err, hash) {
        // Store hash in your password DB.
        if (err) {
          console.log(err);
        } else {
          console.log(hash);
        }
      });
      // Check if the email is already in use

      //   // Create a new user with the hashed password
      //   const newUser = new User({
      //     name,
      //     email,
      //     password: hashedPassword,
      //     phone,
      //     address,
      //     pincode,
      //   });
      //   await newUser.save();

      //   res.status(201).json({ message: "User created successfully." });
    }
  }),
  login: TryCatch(async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if the user exists
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Compare the input password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password." });
      }

      // Create a JWT token
      const token = jwt.sign({ userId: user._id }, "your-secret-key", {
        expiresIn: "1h",
      });

      // Send the token in the response
      res.status(200).json({ message: "Login successful.", token: token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }),
};
