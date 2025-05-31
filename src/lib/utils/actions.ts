import "server-only"
import type * as z from "zod"

export interface ActionState {
  error?: string
}

export type ActionWithValidatedFormData<
  FormDataSchema extends z.ZodTypeAny,
  ReturnType extends ActionState
> = (formData: z.infer<FormDataSchema>) => Promise<ReturnType>

// Returns a (wrapper) server action,
// which first validates the form-data, and then invokes the actual server action with that
// validated form-data.
export function createActionWithValidatedFormData<
  FormDataSchema extends z.ZodTypeAny,
  ReturnType extends ActionState
>(
  formDataSchema: FormDataSchema,
  actionWithValidatedFormData: ActionWithValidatedFormData<FormDataSchema, ReturnType>
) {
  return async function (formData: FormData): Promise<ReturnType> {
    "use server"

    /*
      Validate the form data.

      NOTE : When the user tries to submit a form, we always valid the form-data on client-side.
             So, in theory, form-data validation should never fail here.
    */
    const parsedFormData = formDataSchema.safeParse(Object.fromEntries(formData))
    if (!parsedFormData.success)
      return { error: "Form data validation failed" } as ReturnType

    // Call the actual server action.
    return actionWithValidatedFormData(parsedFormData.data)
  }
}
