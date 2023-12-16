import express from "express";
import { adminController } from "../Controllers/AdminController.js";

const router = express.Router();

import jwt from "jsonwebtoken";
import { EnquiryController } from "../Controllers/Enquiry/EnquiryController.js";
import { UserController } from "../Controllers/Users/UserController.js";
import { ServiceController } from "../Controllers/Services/ServiceController.js";
import { ArticleController } from "../Controllers/Blogs/ArticleController.js";
import multer from "multer";

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


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Set the file name with a timestamp and the original extension
  },
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB file size limit
  fileFilter: function (req, file, cb) {
    // Check if the uploaded file is an image
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed!'));
    }
  },
});
//login
router.post("/login-admin", adminController.login);
router.post("/create-admin", adminController.createAdmin);
router.get("/get-all-enquires", EnquiryController.getAllEnquiries);
router.get("/get-all-users", UserController.getAllUsers);
router
  .post("/services", ServiceController.addServices)
  .get("/services", ServiceController.getAllServices)
  .delete("/services/:id", ServiceController.deleteServices);

router
  .post("/blog",upload.single('image'),ArticleController.createArtcle)
  .get('/blog',ArticleController.getAllArticles);

export default router;
