"use client"

import type { FunctionComponent } from "react"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/shadcn/form"
import { Input } from "@/components/shadcn/input"
import { Button } from "@/components/shadcn/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { createSubRedditAction } from "./action"
import { createSubRedditFormSchema } from "./schema"
import { redirect } from "next/navigation"
import { useAction } from "next-safe-action/hooks"

export const CreateSubRedditForm: FunctionComponent = () => {
  const form = useForm({
    mode: "onBlur",
    resolver: zodResolver(createSubRedditFormSchema)
  })

  const {
    executeAsync: createSubRedditHandler,
    isExecuting: isCreateSubRedditActionRunning,
    hasErrored: createSubRedditActionFailed,
    result: createSubRedditActionOutput
  } = useAction(createSubRedditAction)

  const submitHandler = form.handleSubmit(async (formData) => {
    await createSubRedditHandler(formData)

    if (createSubRedditActionFailed) return

    const { subRedditID, error } = createSubRedditActionOutput.data!
    if (error) return

    // Clear the form and redirect the user to the created sub-reddit page.

    form.reset()

    redirect(`/subreddit/${subRedditID}`)
  })

  const isSubmitDisabled = () =>
    form.formState.isSubmitting || isCreateSubRedditActionRunning

  return (
    <Form {...form}>
      <form onSubmit={submitHandler}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitDisabled()}
        >
          Create
        </Button>
      </form>
    </Form>
  )
}
