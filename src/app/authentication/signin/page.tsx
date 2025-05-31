import "server-only"

import { SignIn } from "@clerk/nextjs"
import type { NextPage } from "next"

const SigninPage: NextPage = () => {
  return <SignIn routing="hash" />
}
export default SigninPage
