import { Prisma } from "./generated/prisma/client";
import { ResumeValues } from "./validation";

export interface EditorForProps{
    resumeData : ResumeValues
    setResumeData : (data: ResumeValues) => void
}

export const resumeDataInclude = {
    workExpereince : true,
    educations : true
} satisfies Prisma.ResumeInclude

export type ResumeServerData = Prisma.ResumeGetPayload<{include: typeof resumeDataInclude}>