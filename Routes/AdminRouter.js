import express from "express";
import { adminController } from "../Controllers/AdminController.js";

const router = express.Router();

import jwt from "jsonwebtoken";
import { EnquiryController } from "../Controllers/Enquiry/EnquiryController.js";
import { UserController } from "../Controllers/Users/UserController.js";
import { ServiceController } from "../Controllers/Services/ServiceController.js";

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
router.get("/get-all-enquires", EnquiryController.getAllEnquiries);
router.get("/get-all-users", UserController.getAllUsers);
router
  .post("/services", ServiceController.addServices)
  .get("/services", ServiceController.getAllServices)
  .delete("/services/:id", ServiceController.deleteServices);

export default router;
