import { Response, NextFunction } from "express"
import { AuthRequest } from "../../types"
import { sendSuccess, sendError } from "../../utils/response"
import { registerUser, loginUser, getMe } from "./auth.service"

export const register = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { user, token } = await registerUser(req.body)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    sendSuccess(res, { user, token }, "Registered successfully", 201)
  } catch (error: any) {
    sendError(res, error.message, 400)
  }
}

export const login = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { user, token } = await loginUser(req.body)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    sendSuccess(res, { user, token }, "Login successful")
  } catch (error: any) {
    sendError(res, error.message, 401)
  }
}

export const logout = async (_req: AuthRequest, res: Response) => {
  res.clearCookie("token")
  sendSuccess(res, null, "Logged out successfully")
}

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await getMe(req.userId!)
    sendSuccess(res, user, "User fetched")
  } catch (error: any) {
    sendError(res, error.message, 404)
  }
}