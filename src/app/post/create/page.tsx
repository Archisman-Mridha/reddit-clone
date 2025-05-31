import type { NextPage } from "next"
import { CreatePostForm } from "./create-post-form.component"

const CreatePostPage: NextPage = () => {
  return (
    <div>
      <h1>Create post</h1>
      <CreatePostForm />
    </div>
  )
}
export default CreatePostPage
