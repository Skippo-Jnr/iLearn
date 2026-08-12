import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Format error messages into a clean comma-separated string
    const errorMessage = errors
      .array()
      .map((err) => err.msg)
      .join(", ");

    return res.status(400).json({
      success: false,
      error: errorMessage,
      statusCode: 400,
    });
  }

  next();
};
