import express from "express";
const router = express.Router();

import jwt from "jsonwebtoken";
import { UserController } from "../Controllers/Users/UserController.js";
import { EnquiryController } from "../Controllers/Enquiry/EnquiryController.js";

const verifyToken = (req, res, next) => {
  // Get the token from the request header
  const token = req.headers.authorization;

  // Check if the token is provided
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token not provided" });
  }

  // Verify the token
  jwt.verify(
    token.replace("Bearer ", ""),
    "your-secret-key",
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized - Invalid token" });
      }

      // Attach the decoded user information to the request object
      req.user = decoded;
      next();
    }
  );
};

router.post('/signup',UserController.signup)
router.post('/login',UserController.login)
router.get('/user/:id',UserController.findUserById)
router.post('/enquiry/:userid',EnquiryController.createEnquiry)
router.get('/get-my-enquiries/:userid',EnquiryController.getAllEnquiriesByUser)
export default router;
