import arrowIcon from '../assets/icon-arrow-up.svg'
import { Link, useParams } from "react-router-dom"
import { FeedbackCard } from "../components/FeedbackCard"
import { AddComment } from "../components/AddComment"
import { CommentsList } from '../components/CommentsList'
import { useFeedbacks } from '../context/FeedbackContext'

export function FeedbackDetails() {
  const { id } = useParams()
  const { feedbackItems } = useFeedbacks()
  const feedbackItem = feedbackItems.find(feedback => feedback.id === id)

  return (
    <div className="large-container">
      <div className="suggestion-header">
        <Link to='..'>
          <button className="btn-back">
            <img src={arrowIcon} alt="" />
            <p>Go Back</p>
          </button>
        </Link>
        {id && (
          <Link to='edit'>
            <button className="btn-edit">Edit Feedback</button>
          </Link>
        )}
      </div>
      {feedbackItem && (
        <FeedbackCard 
          upvotes={feedbackItem.upvotes} 
          upvoted={feedbackItem.upvoted}
          title={feedbackItem.title}
          description={feedbackItem.description}
          category={feedbackItem.category}
          commentsCount={feedbackItem.comments?.length}
          id={feedbackItem.id}
          key={feedbackItem.id} 
          uncheckable
        />
      )}
      <CommentsList 
        commentsCount={feedbackItem?.comments?.length} 
        comments={feedbackItem?.comments}
      />
      <AddComment id={id!} />
    </div>
  )
}
