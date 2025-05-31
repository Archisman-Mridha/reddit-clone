import type { NextPage } from "next"
import { CreateSubRedditForm } from "./components/create-subreddit-form/component"

const CreateSubRedditPage: NextPage = () => {
  return (
    <div>
      <h1>Create subreddit</h1>
      <CreateSubRedditForm />
    </div>
  )
}
export default CreateSubRedditPage
