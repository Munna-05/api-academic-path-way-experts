import { TryCatch, getError, sendResponse } from "../../Helpers/Error.js";
import Courses from "../../Models/Courses.js";
import courseValidation from "./CourseValidation.js";

export const CourseController = {
  createCourseDetails: TryCatch(async (req, res) => {
    const { error, value } = courseValidation(req.body);

    if (error) {
      sendResponse(400, { message: getError(error) }, res);
    } else {
      const newCourse = new Courses(value);
      const save = await newCourse.save();

      save
        ? sendResponse(200, { message: "New Course Added" }, res)
        : sendResponse(400, { message: "Faild to add new course" }, res);
    }
  }),
  getAllCourses: TryCatch(async (req, res) => {
    const all_courses = await Courses.find()
      .sort({ createdAt: -1 })
      .catch((e) => console.log(e));
    all_courses
      ? sendResponse(200, all_courses, res)
      : sendResponse(400, { message: "No data" }, res);
  }),
  getCoursesById: TryCatch(async (req, res) => {}),
  editCourseDetails: TryCatch(async (req, res) => {}),
  deleteCourse: TryCatch(async (req, res) => {
    const remove_course = await Courses.findByIdAndDelete(req.query.id).catch(
      (e) => console.log(e)
    );
    remove_course
      ? sendResponse(200, { message: "Course details removed " }, res)
      : sendResponse(400, { message: "Failed to remove course " }, res);
  }),
};
