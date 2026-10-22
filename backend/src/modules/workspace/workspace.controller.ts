import { Response } from "express"
import { AuthRequest } from "../../types"
import { sendSuccess, sendError } from "../../utils/response"
import {
  createWorkspace, getUserWorkspaces, getWorkspaceById,
  updateWorkspace, deleteWorkspace, joinWorkspaceByInvite,
} from "./workspace.service"

export const create = async (req: AuthRequest, res: Response) => {
  try {
    const workspace = await createWorkspace(req.userId!, req.body)
    sendSuccess(res, workspace, "Workspace created", 201)
  } catch (e: any) { sendError(res, e.message) }
}

export const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const workspaces = await getUserWorkspaces(req.userId!)
    sendSuccess(res, workspaces, "Workspaces fetched")
  } catch (e: any) { sendError(res, e.message) }
}

export const getOne = async (req: AuthRequest, res: Response) => {
  try {
    const workspace = await getWorkspaceById(req.params.id as string, req.userId!)
    sendSuccess(res, workspace, "Workspace fetched")
  } catch (e: any) { sendError(res, e.message, 404) }
}

export const update = async (req: AuthRequest, res: Response) => {
  try {
    const workspace = await updateWorkspace(req.params.id as string, req.userId!, req.body)
    sendSuccess(res, workspace, "Workspace updated")
  } catch (e: any) { sendError(res, e.message, 403) }
}

export const remove = async (req: AuthRequest, res: Response) => {
  try {
    await deleteWorkspace(req.params.id as string, req.userId!)
    sendSuccess(res, null, "Workspace deleted")
  } catch (e: any) { sendError(res, e.message, 403) }
}

export const joinByInvite = async (req: AuthRequest, res: Response) => {
  try {
    const workspace = await joinWorkspaceByInvite(req.userId!, req.body.inviteCode)
    sendSuccess(res, workspace, "Joined workspace successfully")
  } catch (e: any) { sendError(res, e.message, 400) }
}