import { v4 as uuidv4 } from 'uuid';
import prisma from '../../config/db';
import { createWorkSpaceInput, updateWorkSpaceInput} from "../../schemas/workspace.schema";


export const createWorkspace = async (userId:string, data: createWorkSpaceInput) => {
    const workspace = await prisma.workspace.create({
        data: {
            name: data.name,
            description: data.description,
            inviteCode: uuidv4().slice(0, 8).toUpperCase(),
            members: {
                create: {
                    userId,
                    role: "OWNER"
                },
            },
        },
        include: { members: true}
    });

    return workspace;   
}


export const getUserWorkspaces = async (userId: string) => {
    return await prisma.workspace.findMany({
        where: {
            members: {some: {userId}},
        },
        include: {
            members: { include: {user: { select: { id: true, name: true, avatar: true} }}},
            _count: {select: {projects: true}},
        },
    });
}


export const getWorkspaceById = async (workspaceId: string, userId: string) =>{
    const workspace = await prisma.workspace.findFirst({
        where:{
            id: workspaceId,
            members: { some: { userId }},
        },
        include: {
            members: { include: { user: { select: { id:true, name:true, email:true, avatar:true } }}},
            _count: {select: { projects:true } },
        },
    });

    if (!workspace) throw new Error("workSpace not found or access denied");
    
    return workspace;
}  

export const updateWorkspace = async (workspaceId: string, userId:string, data: updateWorkSpaceInput) => {
    const member = await prisma.workspaceMember.findUnique({
        where: { userId_workspaceId: { userId, workspaceId }},
    });

    if(!member || !["OWNER", "ADMIN"].includes(member.role)) {
        throw new Error("You do not have permission to update this workspace")
    };

    return await prisma.workspace.update({
        where: { id: workspaceId },
        data,
    });
}

export const deleteWorkspace = async (workspaceId: string, userId:string) => {
    const member = await prisma.workspaceMember.findUnique({
        where: { userId_workspaceId: { userId, workspaceId } }
    });

    if(!member || member.role !== "OWNER"){
        throw new Error("Only the owner can delete this workspace.")
    };

    await prisma.workspace.delete({
        where: {
            id: workspaceId
        }
    });
}

export const joinWorkspaceByInvite = async ( userId: string, inviteCode: string ) =>{
    const workspace = await prisma.workspace.findUnique({
        where: { inviteCode}
    });

    if(! workspace) {throw new Error("Invalid invite code")};

    const existing = await prisma.workspaceMember.findUnique({
        where: {userId_workspaceId:{ userId, workspaceId: workspace.id}}
    }); 

    if (existing) throw new Error("You are already a member of this workspace")
     
   await prisma.workspaceMember.create({
    data:{userId, workspaceId:workspace.id, role:"MEMBER"},
   })     

   return workspace;
}   