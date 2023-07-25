import arrowIcon from '../assets/icon-arrow-up.svg'
import { Link, useNavigate } from "react-router-dom"
import { CATEGORIES } from "../data/constants"
import { FormEvent, useRef } from "react"
import { useFeedbacks } from "../context/FeedbackContext"

export function AddFeedback() {
  const { addFeedback } = useFeedbacks()
  const navigate = useNavigate()
  const titleRef = useRef<HTMLInputElement>(null)
  const categoryRef = useRef<HTMLSelectElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()  
    addFeedback(titleRef.current!.value, categoryRef.current!.value, descriptionRef.current!.value)
    navigate('/')
  }

  return (
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
          <input type="text" required ref={titleRef} />
        </label>
        <label>
          Category
          <span>Choose a category for your feedback</span>
          <select required ref={categoryRef}>
            <option value="">Choose a Category</option>
            {CATEGORIES.map((category, index) => (
              <option key={index}>{category}</option>
            ))}
          </select>
        </label>
        <label>
          Feedback Detail
          <span>Include any specific comments on what should be improved, added, etc.</span>
          <textarea cols={20} rows={4} required ref={descriptionRef}></textarea>
        </label>
        <div>
          <Link to={'..'}>
            <button className="btn-cancel" type="button">Cancel</button>
          </Link>
          <button className="btn-add" type="submit">Add Feedback</button>
        </div>
      </form>
    </div>
  )
}
