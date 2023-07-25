import arrowIcon from '../assets/icon-arrow-up.svg'
import { Link, useNavigate, useParams } from "react-router-dom"
import { useFeedbacks } from "../context/FeedbackContext"
import { FormEvent, useRef } from "react"
import { CATEGORIES, STATUS } from "../data/constants"

export function EditFeedback() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { feedbackItems, deleteFeedback, updateFeedback } = useFeedbacks()
  const feedback = feedbackItems.find(feedback => feedback.id === (id))
  
  const titleRef = useRef<HTMLInputElement>(null)
  const categoryRef = useRef<HTMLSelectElement>(null)
  const statusRef = useRef<HTMLSelectElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    updateFeedback(
      feedback!.id, 
      titleRef.current!.value, 
      categoryRef.current!.value, 
      statusRef.current!.value, 
      descriptionRef.current!.value
    )
    navigate(-1)
  }

  return (
    feedback && (
      <div className="medium-container">
        <Link to='..'>
          <button className="btn-back">
            <img src={arrowIcon} alt="" />
            <p>Go Back</p>
          </button>
        </Link>
        <form onSubmit={handleSubmit}>
          <h1>Create New Feedback</h1>
          <label>
            Feedback Title
            <span>Add a short, descriptive headline</span>
            <input ref={titleRef} type="text" required defaultValue={feedback.title} />
          </label>
          <label>
            Category
            <span>Choose a category for your feedback</span>
            <select ref={categoryRef} required defaultValue={feedback.category}>
              {CATEGORIES.map(category => (
                <option value={category}>{category}</option>
              ))}
            </select>
          </label>
          <label>
            Update Status
            <span>Change feature state</span>
            <select ref={statusRef} required defaultValue={feedback.status}>
              <option value={STATUS.SUGGESTION}>Suggestion</option>
              <option value={STATUS.PLANNED}>Planned</option>
              <option value={STATUS.IN_PROGRESS}>In-Progress</option>
              <option value={STATUS.LIVE}>Live</option>
            </select>
          </label>
          <label>
            Feedback Detail
            <span>Include any specific comments on what should be improved, added, etc.</span>
            <textarea ref={descriptionRef} cols={20} rows={4} required defaultValue={feedback.description}></textarea>
          </label>
          <div className="edit-buttons">
            <button 
              className="btn-delete" type="button" 
              onClick={() => {
                deleteFeedback(feedback.id)
                navigate('/')
              }}
            >
              Delete
            </button>
            <div>
              <Link to={'..'}>
                <button className="btn-cancel" type="button">Cancel</button>
              </Link>
              <button className="btn-add" type="submit">Save Changes</button>
            </div>
          </div>
        </form>
      </div>
    )
  )
}
