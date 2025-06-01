import prismaClient from "@/lib/prisma/prisma"
import type { WebhookEvent } from "@clerk/nextjs/server"
import { StatusCodeClass, Webhook } from "svix"

export async function POST(request: Request) {
  // Ensure that the clerk webhook verification secret is present as an environment variable.
  const clerkWebhookVerificationSecret = process.env.CLERK_WEBHOOK_VERIFICATION_SECRET
  if (!clerkWebhookVerificationSecret)
    return new Response("Missing clerk wehook verification secret", {
      status: StatusCodeClass.Code4xx
    })

  const clerkWebhook = new Webhook(clerkWebhookVerificationSecret)

  // Verify the clerk webhook request.

  const requestBody = await request.text()
  const requestHeaders = request.headers

  const clerkWebhookEvent = clerkWebhook.verify(requestBody, {
    "svix-id": requestHeaders.get("svix-id")!,
    "svix-timestamp": requestHeaders.get("svix-timestamp")!,
    "svix-signature": requestHeaders.get("svix-signature")!
  }) as WebhookEvent

  switch (clerkWebhookEvent.type) {
    case "user.created": {
      // Sync the Clerk user to the Postgres database.

      const {
        id,
        email_addresses: [{ email_address }],
        username
      } = clerkWebhookEvent.data

      await prismaClient.user.create({
        data: {
          id,
          email: email_address,
          username: username!
        }
      })
    }
  }

  return new Response("OK")
}
