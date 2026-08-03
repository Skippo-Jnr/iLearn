import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized Access",
      statusCode: 401,
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.user = await User.findById(tokenDecode.id).select("-password");
    } else {
      return res.status.json({
        success: false,
        error: "User not found",
        statusCode: 401,
      });
    }

    next();
  } catch (error) {
    console.error("Error in auth middleware:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: "Token has expired",
        statusCode: 401,
      });
    }

    return res
      .status(401)
      .json({ success: false, error: "Unauthorized Access", statusCode: 401 });
  }
};
