import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const payload = { id: user._id, regNo: user.registrationNumber };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};
