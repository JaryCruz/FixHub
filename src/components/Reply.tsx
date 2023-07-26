import { useRef, useState } from "react"
import { Reply as ReplyProps } from './CommentsList'
import { useFeedbacks } from "../context/FeedbackContext"
import { useParams } from "react-router-dom"

export function Reply({ content, replyingTo, user, commentId }: ReplyProps) {
  const [showReplyInput, setShowReplyInput] = useState(false)
  const replyRef = useRef<HTMLTextAreaElement>(null)
  const { addCommentReply } = useFeedbacks()
  const { id } = useParams()

  function submitReply() {
    if (replyRef.current?.value === '') return 
    addCommentReply(id!, commentId!, replyRef.current!.value, user.username)
    setShowReplyInput(prev => !prev)
  }

  return (
    <div className="comment-card">
      <div className="comment-header-container">
        <div className="comment-header">
          <img src={user.image} alt="" />
          <div className="profile-name">
            <h4>{user.name}</h4>
            <span>@{user.username}</span>
          </div>
        </div>
        <button className="btn-reply" onClick={() => setShowReplyInput(prev => !prev)}>Reply</button>
      </div>
      <p>
        <span>@{replyingTo}</span> {content}
      </p>
      {showReplyInput && (
        <div className="comment-reply">
          <textarea 
            placeholder="Type your reply here" 
            cols={20} 
            rows={2} 
            maxLength={250}
            ref={replyRef}
          ></textarea>
          <button className="btn-add" onClick={submitReply}>Post Reply</button>
        </div>
      )}
      <div className="line"></div>
    </div>
  )
}
