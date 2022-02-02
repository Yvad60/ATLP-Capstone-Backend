import { handleResponse } from "../controllers/index.js";
import jsonwebtoken from "jsonwebtoken";

const authenticateAdminUser = async (req, res, next) => {
  const adminToken = req.header('admin-login-token')
  if (!adminToken) {
    return res.status(401).json(handleResponse('fail', 401, { message: 'access denied' }))
  }
  try {
    const isTokenValid = jsonwebtoken.verify(adminToken, process.env.ADMIN_TOKEN_SECRET)
    req.adminUserId = isTokenValid
    return next()
  } catch (error) {
    return res.status(500).json(handleResponse('fail', 500, { message: error.message }))
  }
}
export { authenticateAdminUser }