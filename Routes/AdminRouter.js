import express from "express";
import { adminController } from "../Controllers/AdminController.js";

const router = express.Router();

import jwt from "jsonwebtoken";

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

//login
router.post("/login-admin", adminController.login);
router.post("/create-admin", adminController.createAdmin);

export default router;
