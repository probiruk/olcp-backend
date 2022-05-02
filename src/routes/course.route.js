const route = require("express").Router();

const CourseController = require("../controllers/course.controller");
const Authenticate = require("../middlewares/authenticate.middleware");
const Authorize = require("../middlewares/authorize.middleware");

const Validation = require("../middlewares/validation.middleware");
const { CourseSchema } = require("../schema/course.schema");

const { UserRole } = require("../helpers/user.helper");

const {
  SetType,
  Upload,
  SetUploadFileToBody,
} = require("../helpers/multer.helper");

route.post(
  "/create-course",
  Authenticate,
  Authorize([UserRole.teacher]),
  SetType("thumbnails"),
  Upload.single("thumbnail"),
  SetUploadFileToBody,
  Validation(CourseSchema),
  CourseController.CreateCourse
);

module.exports = route;