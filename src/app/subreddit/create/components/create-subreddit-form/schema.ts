import * as z from "zod"
import { isAlphanumeric } from "validator"

export const createSubRedditFormSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(30)
    .superRefine((name, ctx) => {
      let underscoreCount = 0

      for (const character of name) {
        if (!(isAlphanumeric(character) || character === "_"))
          return ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "subreddit name can only contain alphanumeric and underscore characters"
          })

        if (character === "_") underscoreCount++
      }

      if (underscoreCount === name.length)
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "subreddit name must contain atleast one alphanumeric character"
        })
    }),

  description: z.string().max(300).optional()
})
