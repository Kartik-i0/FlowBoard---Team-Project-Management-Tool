import { Router } from "express"
import { register, login, logout, getCurrentUser } from "./auth.controller"
import { validate } from "../../middlewares/validate.middleware"
import { authMiddleware } from "../../middlewares/auth.middleware"
import { registerSchema, loginSchema } from "../../schemas/auth.schema"

const router = Router()

router.post("/register", validate(registerSchema), register)
router.post("/login", validate(loginSchema), login)
router.post("/logout", authMiddleware, logout)
router.get("/me", authMiddleware, getCurrentUser)

export default router