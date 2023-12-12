import { TryCatch, getError, sendResponse } from "../../Helpers/Error.js";
import httpError from "../../Helpers/httpError.js";
import Blog from "../../Models/Blog.js";
import blogValidation from "./BlogValidations.js";

export const ArticleController = {
  createArtcle: TryCatch(async (req, res) => {
    const { error, value } = blogValidation.validate(req.body);
    if (error) {
      sendResponse(400, { message: getError(error) }, res);
    } else {
      const newBlog = new Blog(value);
      const save = await newBlog.save();
      save
        ? sendResponse(200, save, res)
        : sendResponse(400, { message: "Error,Try again" }, res);
    }
  }),
  getAllArticles: TryCatch(async (req, res) => {
    const data = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 })
      .catch((e) => console.log(e));
    data
      ? sendResponse(200, data, res)
      : sendResponse(400, { message: "No data" }, res);
  }),
  getArticlesById: TryCatch(async (req, res) => {}),
  editArticle: TryCatch(async (req, res) => {}),
  deleteArticle: TryCatch(async (req, res) => {}),
};
