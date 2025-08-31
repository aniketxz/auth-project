import { verifyToken, extractToken } from '../utils/jwt.js'

export const authenticateToken = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization
    const token = extractToken(authHeader)

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access token required! Please login again.'
      })
    }

    // Verify the token
    const { valid, decoded, error } = verifyToken(token)

    if (!valid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired token! Please login again.'
      })
    }

    // Attach user info to request object
    req.user = {
      userId: decoded.userId,
      email: decoded.email
    }

    next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    return res.status(500).json({
      success: false,
      error: 'Authentication failed!'
    })
  }
}
