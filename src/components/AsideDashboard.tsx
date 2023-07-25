import { Link } from "react-router-dom"
import { CATEGORIES, STATUS } from "../data/constants"
import { useFeedbacks } from "../context/FeedbackContext"
import { useState } from "react"

export function AsideDashboard() {
  const [showMenuCards, setShowMenuCard] = useState(false)
  const { feedbackItems, categoryFilter, setCategoryFilter } = useFeedbacks()
  const plannedFeedbackItems = feedbackItems.filter(feedback => feedback.status === STATUS.PLANNED)
  const inProgressFeedbackItems = feedbackItems.filter(
    feedback => feedback.status === STATUS.IN_PROGRESS
  )
  const liveFeedbackItems = feedbackItems.filter(feedback => feedback.status === STATUS.LIVE)

  return (
    <aside>
      <div className="logo-card">
        <h3>FixHub</h3>
        <h4>Feedback Board</h4>
        <button 
          className={`btn-hamburger ${showMenuCards ? 'open': ''}`} 
          onClick={() => setShowMenuCard(prev => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div className={`menu-cards-modal ${showMenuCards ? 'open': ''}`}>
        <div className="menu-cards-content">
          <div className="category-filter-card">
            <button 
              className={`btn-category ${categoryFilter === 'All' ? 'active' : ''}`} 
              onClick={() => setCategoryFilter('All')}
            >
              All
            </button>
            {CATEGORIES.map((category, index) => (
              <button 
                key={index} 
                onClick={() => setCategoryFilter(category)} 
                className={`btn-category ${categoryFilter === category ? 'active': ''}`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="timeline-home-card">
            <div className="road-flex">
              <h3>Timeline</h3>
              <Link to='/timeline'>View</Link>
            </div>
            <div className="road-flex">
              <div className="timeline-category">
                <small className="planned"></small>
                <p>Planned</p>
              </div>
              <h3>{plannedFeedbackItems.length}</h3>
            </div>
            <div className="road-flex">
              <div className="timeline-category">
                <small className="in-progress"></small>
                <p>In-Progress</p>
              </div>
              <h3>{inProgressFeedbackItems.length}</h3>
            </div>
            <div className="road-flex">
              <div className="timeline-category">
                <small className="live"></small>
                <p>Live</p>
              </div>
              <h3>{liveFeedbackItems.length}</h3>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}