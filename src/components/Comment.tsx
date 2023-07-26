import { useRef, useState } from 'react'
import { Comment as CommentProps } from './CommentsList'
import { Reply } from './Reply'
import { useFeedbacks } from '../context/FeedbackContext'
import { useParams } from 'react-router-dom'

export function Comment({ content, user, replies, id: commentId }: CommentProps) {
  const [showReplyInput, setShowReplyInput] = useState(false)
  const replyRef = useRef<HTMLTextAreaElement>(null)
  const { addCommentReply } = useFeedbacks()
  const { id } = useParams()

  function submitReply() {
    if (replyRef.current?.value === '') return 
    addCommentReply(id!, commentId, replyRef.current!.value, user.username)
    setShowReplyInput(prev => !prev)
  }
  
  return (
    <div className="comment-card">
      <div className='comment-header-container'>
        <div className='comment-header'>
          <img src={user.image} alt="" />
          <div className="profile-name">
            <h4>{user.name}</h4>
            <span>@{user.username}</span>
          </div>
        </div>
        <button className="btn-reply" onClick={() => setShowReplyInput(prev => !prev)}>Reply</button>
      </div>
      <p>{content}</p>
      {showReplyInput && (
        <div className='comment-reply'>
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
      {replies && (
        <div className="replies-list">
          {replies.map((reply, index) => (
            <Reply 
              content={reply.content} 
              commentId={commentId} 
              user={reply.user} 
              replyingTo={reply.replyingTo} 
              key={index} 
            />
          ))}
        </div>
      )}
    </div>
  )
}
