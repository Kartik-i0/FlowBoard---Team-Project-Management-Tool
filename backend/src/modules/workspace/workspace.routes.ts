import { Router } from "express";
import { create, getAll, getOne, update, remove, joinByInvite } from './workspace.controller'
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { updateWorkspaceSchema, createWorkspaceSchema, inviteMemberSchema } from '../../schemas/workspace.schema';

const router = Router();

router.use(authMiddleware);

router.post("/", validate(createWorkspaceSchema), create);
router.get("/", getAll);
router.get("/:id", getOne);
router.put("/:id", validate(updateWorkspaceSchema), update);
router.delete("/:id", remove);
router.post("/join", validate(inviteMemberSchema), joinByInvite);

export default router

