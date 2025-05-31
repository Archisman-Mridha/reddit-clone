import "server-only"
import type * as z from "zod"

export interface BaseActionState {
  error?: string
}

export type ActionWithValidatedFormData<
  FormDataSchema extends z.ZodTypeAny,
  ActionState extends BaseActionState
> = (formData: z.infer<FormDataSchema>) => Promise<ActionState>

// Returns a (wrapper) server action,
// which first validates the form-data, and then invokes the actual server action with that
// validated form-data.
export function createActionWithValidatedFormData<
  FormDataSchema extends z.ZodTypeAny,
  ActionState extends BaseActionState
>(
  formDataSchema: FormDataSchema,
  actionWithValidatedFormData: ActionWithValidatedFormData<FormDataSchema, ActionState>
) {
  return async function (
    _initActionState: ActionState,
    formData: z.infer<FormDataSchema>
  ): Promise<ActionState> {
    /*
      Validate the form data.

      NOTE : When the user tries to submit a form, we always valid the form-data on client-side.
             So, in theory, form-data validation should never fail here.
    */
    const parsedFormData = formDataSchema.safeParse(formData)
    if (!parsedFormData.success)
      return { error: "Form data validation failed" } as ActionState

    // Call the actual server action.
    return actionWithValidatedFormData(parsedFormData.data)
  }
}
