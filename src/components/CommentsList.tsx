import { Comment } from "./Comment"

type User = {
  image: string
  name: string
  username: string
}

export type Reply = {
  content: string
  replyingTo: string
  user: User
  commentId?: string 
}

export type Comment = {
  id: string
  content: string
  user: User
  replies?: Reply[] | undefined
}

type CommentsListProps = {
  commentsCount: number | undefined
  comments: Comment[] | undefined
}

export function CommentsList({ commentsCount, comments }: CommentsListProps) {
  return (
    <div className="comments-container">
      <h3 className={`${commentsCount === 0 ? 'no-content' : ''}`}>
        {commentsCount == null ? '0' : commentsCount} Comments
      </h3>
      {comments && comments.map(comment => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  )
}
