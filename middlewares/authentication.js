import { handleResponse } from "../controllers/index.js";
import jsonwebtoken from "jsonwebtoken";

const authenticateAdminUser = async (req, res, next) => {
  const adminToken = req.header('admin-login-token')
  if (!adminToken) {
    return res.status(401).json(handleResponse('fail', 401, { error: 'access denied' }))
  }
  try {
    const isTokenValid = jsonwebtoken.verify(adminToken, process.env.ADMIN_TOKEN_SECRET)
    req.adminUserId = isTokenValid
    console.log(req.adminUserId)
    return next()
  } catch (error) {
    return res.status(500).json(handleResponse('fail', 500, { error: error.message }))
  }
}
export { authenticateAdminUser }