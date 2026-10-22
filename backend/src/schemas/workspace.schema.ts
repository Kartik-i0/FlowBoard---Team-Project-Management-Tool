import { z } from 'zod';

export const createWorkspaceSchema = z.object({
    body: z.object({
        name: z.string().min(3, "Workspace name must be at least 3 characters long"),
        description: z.string().optional(), 
    }),
});

export const updateWorkspaceSchema = z.object({
    body: z.object({
        name: z.string().min(2).optional(),
        description: z.string().optional(),
    }),
});

export const inviteMemberSchema = z.object({
    body: z.object({
        inviteCode: z.string().min(1, "Invite code is required"),
    }),
});  

export type createWorkSpaceInput = z.infer<typeof createWorkspaceSchema>["body"]
export type updateWorkSpaceInput = z.infer<typeof updateWorkspaceSchema>["body"] 
export type inviteMemberInput = z.infer<typeof inviteMemberSchema>["body"] 