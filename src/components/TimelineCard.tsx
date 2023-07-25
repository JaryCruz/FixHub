import { Link } from "react-router-dom";
import upIcon from '../assets/icon-arrow-up.svg'
import commentIcon from '../assets/icon-comments.svg'
import { useFeedbacks } from "../context/FeedbackContext"
import { FeedbackCardProps as TimelineCardProps } from "./FeedbackCard"

export function TimelineCard({ 
  id,
  title, 
  category, 
  upvotes,
  upvoted, 
  status, 
  description, 
  commentsCount, 
}: TimelineCardProps) {
  const { toggleFeedbackVote } = useFeedbacks()

  return (
    <div className={`timeline-card ${status ?? ''}`}>
      <div className="timeline-category">
        <small className={status}></small>
        <p>{status}</p>
      </div>
      <Link to={`/${id}`}>
        <h3>{title}</h3>
        <p>{description}</p>
        <button className='btn-category'>{category}</button>
      </Link>
      <div className="timeline-card-footer">
        <button 
          className={`btn-upvote sm ${upvoted ? 'voted' : ''}`}
          onClick={() => toggleFeedbackVote(id)}
        >
          <img src={upIcon} alt="" />
          <p>{upvotes}</p>
        </button>
        <div className="comment-count">
          <img src={commentIcon} alt="" />
          <h3>{commentsCount}</h3>
        </div>
      </div>
    </div>
  )
}
