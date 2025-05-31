"use client"

import { useActionState, type FunctionComponent } from "react"
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

export const CreateSubRedditForm: FunctionComponent = () => {
  const form = useForm({
    mode: "onBlur",
    resolver: zodResolver(createSubRedditFormSchema)
  })

  const [
    createSubRedditActionState,
    createSubRedditHandler,
    isCreateSubRedditActionRunning
  ] = useActionState(createSubRedditAction, {})

  const isSubmitDisabled = () =>
    form.formState.isSubmitting || isCreateSubRedditActionRunning

  const submitHandler = form.handleSubmit((formData) => createSubRedditHandler(formData))

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
