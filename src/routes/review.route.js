const route = require("express").Router();

const ReviewController = require("../controllers/review.controller");
const Authenticate = require("../middlewares/authenticate.middleware");
const Authorize = require("../middlewares/authorize.middleware");

const Validation = require("../middlewares/validation.middleware");
const { ReviewSchema, UpdateReviewSchema } = require("../schema/review.schema");

const { UserRole } = require("../helpers/user.helper");

route.post(
  "/create-review/:course",
  Authenticate,
  Authorize([UserRole.teacher, UserRole.student]),
  Validation(ReviewSchema),
  ReviewController.CreateReview
);

route.get(
  "/get-reviews/:course",
  Authenticate,
  Authorize([UserRole.teacher, UserRole.student]),
  ReviewController.GetReviews
);

route.put(
  "/update-review/:review",
  Authenticate,
  Authorize([UserRole.teacher, UserRole.student]),
  Validation(UpdateReviewSchema),
  ReviewController.UpdateReview
);

route.delete(
  "/delete-review/:review",
  Authenticate,
  Authorize([UserRole.teacher, UserRole.student]),
  ReviewController.DeleteReview
);

module.exports = route;
