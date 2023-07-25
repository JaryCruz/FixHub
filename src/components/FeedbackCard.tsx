import { Link } from 'react-router-dom'
import { FeedbackItem, useFeedbacks } from '../context/FeedbackContext'
import upIcon from '../assets/icon-arrow-up.svg'
import commentIcon from '../assets/icon-comments.svg'

export type FeedbackCardProps = FeedbackItem & {
  uncheckable?: boolean
  commentsCount: number | undefined
}

export function FeedbackCard({ 
  id, 
  title, 
  category, 
  upvotes,
  upvoted,
  description, 
  uncheckable,
  commentsCount 
}: FeedbackCardProps) {
  const { toggleFeedbackVote } = useFeedbacks()

  return (
    <div className="feedback-card">
      <div>
        <button 
          className={`btn-upvote ${upvoted ? 'voted' : ''}`} 
          onClick={() => toggleFeedbackVote(id)}
        >  
          <img src={upIcon} alt="" />
          <p>{upvotes}</p>
        </button>
        <Link to={`${id}`} className={`${uncheckable ? 'uncheckable': ''}`}>
          <h3>{title}</h3>
          <p>{description}</p>
          <button className='btn-category'>{category}</button>
        </Link>
      </div>
      <div className='comment-count'>
        <img src={commentIcon} alt="" />
        <h3>{commentsCount}</h3>
      </div>
    </div>
  )
}
