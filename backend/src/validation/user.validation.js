import { body, validationResult } from "express-validator";

export const validateLead = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email is required")
    .bail()
    .isString()
    .withMessage("Email must be a string")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("budget")
    .exists({ checkFalsy: true })
    .withMessage("Budget is required")
    .bail()
    .isString()
    .withMessage("Budget must be a string")
    .trim()
    .isLength({ max: 100 })
    .withMessage("Budget cannot exceed 100 characters"),

  body("message")
    .exists({ checkFalsy: true })
    .withMessage("Message is required")
    .bail()
    .isString()
    .withMessage("Message must be a string")
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Message must be between 10 and 2000 characters"),

  // Validation error handler
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array().map((error) => ({
          field: error.path,
          message: error.msg,
        })),
      });
    }

    next();
  },
];