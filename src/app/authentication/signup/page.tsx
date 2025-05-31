import "server-only"

import type { NextPage } from "next"
import { SignUp } from "@clerk/nextjs"

const SignupPage: NextPage = () => {
  return <SignUp routing="hash" />
}
export default SignupPage
