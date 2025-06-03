## Development

Run the NextJS dev server :

```sh
bun run dev
```

Expose the dev server to the public internet :

```sh
bun run ngrok:expose
```

Now, when a user signs up, Clerk can send a webhook event to the NextJS dev
server, so we can sync the new user to the Postgres database.

## REFERENCEs

- [Next.js Server Actions Simply Explained in just 5 Minutes](https://www.youtube.com/watch?v=m0Ao0cu7GmY)

- [Next.js 15 just fixed Server Actions (faster & safer)](https://www.youtube.com/watch?v=JEvwFTY_xIA)

- [Next.js Modal Form w/ React-Hook-Form, ShadCN/ui Dialog, Server Actions & Validation](https://www.youtube.com/watch?v=WyL_Jc6_-sY&t=1504s)

- [Prisma founder is solving local-first (LiveStore)](https://www.youtube.com/watch?v=ZW9dVJ_eFIU)

- [Is Next.js 15 any good? "use cache" API first look](https://www.youtube.com/watch?v=xWkozeculPo)

- [This Next.js Data Fetching Pattern Is CRITICAL For Every Developer](https://www.youtube.com/watch?v=bKm1rNaCFOo)

- [Learn React Hooks: useActionState - Simply Explained!](https://www.youtube.com/watch?v=NVddtG6syJg)
