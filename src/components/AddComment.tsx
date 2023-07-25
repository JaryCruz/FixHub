import { FormEvent, useRef, useState } from "react"
import { useFeedbacks } from "../context/FeedbackContext"

type AddCommentFormProps = {
  id: string
}

export function AddComment({ id }: AddCommentFormProps) {
  const [commentValue, setCommentValue] = useState('')
  const commentRef = useRef<HTMLTextAreaElement>(null)
  const { addFeedbackComment } = useFeedbacks()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    addFeedbackComment(id, commentValue)
    setCommentValue('')
    commentRef.current?.focus()
  }

  return (
    <form className="add-comment-form" onSubmit={handleSubmit}>
      <h3>Add Comment</h3>
      <textarea 
        placeholder="Type your comment here" 
        cols={20} 
        rows={2} 
        maxLength={250} 
        required
        value={commentValue}
        onChange={e => setCommentValue(e.target.value)}
        ref={commentRef}
      ></textarea>
      <div>
        <p>{250 - commentValue.length} characters left</p>
        <button className="btn-add" type="submit">Post Comment</button>
      </div>
    </form>
  )
}
