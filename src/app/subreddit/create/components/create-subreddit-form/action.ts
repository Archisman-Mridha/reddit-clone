"use server"

import "server-only"
import {
  type BaseActionState,
  createActionWithValidatedFormData
} from "@/lib/utils/actions"
import { createSubRedditFormSchema } from "./schema"
import prismaClient from "@/lib/prisma/prisma"

interface CreateSubRedditActionState extends BaseActionState {}

export const createSubRedditAction = createActionWithValidatedFormData(
  createSubRedditFormSchema,
  async function (formData): Promise<CreateSubRedditActionState> {
    return {}
  }
)
