import jwt from "jsonwebtoken";

export function verifyAdmin(req) {
  const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
  if (!authHeader) {
    return { error: "Access Denied. No token provided.", status: 401 };
  }

  try {
    const token = authHeader.replace(/^Bearer\s+/i, "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { admin: decoded };
  } catch (error) {
    return { error: "Invalid token.", status: 401 };
  }
}
