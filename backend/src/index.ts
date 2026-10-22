import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorMiddleware } from "./middlewares/error.middleware"
import authRoutes from "./modules/auth/auth.routes"
import workspaceRoutes from "./modules/workspace/workspace.routes"

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/workspaces", workspaceRoutes)

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})