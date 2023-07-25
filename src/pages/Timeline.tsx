import upIconWhite from '../assets/icon-arrow-up-white.svg'
import { Link } from "react-router-dom";
import { TimelineCard } from "../components/TimelineCard"
import { useState } from "react";
import { useFeedbacks } from '../context/FeedbackContext'
import { STATUS } from '../data/constants';

export function Timeline() {
  const [currentTab, setCurrentTab] = useState('in-progress')
  const { feedbackItems } = useFeedbacks()
  const plannedFeedbackItems = feedbackItems.filter(feedback => feedback.status === STATUS.PLANNED)
  const inProgressFeedbackItems = feedbackItems.filter(
    feedback => feedback.status === STATUS.IN_PROGRESS
  )
  const liveFeedbackItems = feedbackItems.filter(feedback => feedback.status === STATUS.LIVE)

  return (
    <div className="timeline-container">
      <div className="timeline-header">
        <div>
          <Link to='..'>
            <button className="btn-back">
              <img src={upIconWhite} alt="" />
              <p>Go Back</p>
            </button>
          </Link>
          <h1>Timeline</h1>
        </div>
        <Link to='/add'>
          <button className="btn-add">+ Add Feedback</button>
        </Link>
      </div>
      <div className="timeline-status-toggle">
        <button 
          className={`${currentTab === STATUS.PLANNED ? 'active' : ''}`} 
          onClick={() => setCurrentTab(STATUS.PLANNED)}
        >
          Planned ({plannedFeedbackItems.length})
        </button>
        <button 
          className={`${currentTab === STATUS.IN_PROGRESS ? 'active' : ''}`}
          onClick={() => setCurrentTab(STATUS.IN_PROGRESS)}
        >
          In-Progress ({inProgressFeedbackItems.length})
        </button>
        <button 
          className={`${currentTab === STATUS.LIVE ? 'active' : ''}`}
          onClick={() => setCurrentTab(STATUS.LIVE)}
        >
          Live ({liveFeedbackItems.length})
        </button>
      </div>
      <div className="timeline-body">
        <div className={`timeline-column ${currentTab === STATUS.PLANNED ? '' : 'none'}`}>
          <div>
            <h2>Planned ({plannedFeedbackItems.length})</h2>
            <p>Ideas prioritized for research</p>
          </div>
          {plannedFeedbackItems.map(feedback => (
            <TimelineCard 
              key={feedback.id}
              status={feedback.status}
              upvotes={feedback.upvotes} 
              upvoted={feedback.upvoted} 
              title={feedback.title}
              description={feedback.description}
              category={feedback.category}
              commentsCount={feedback.comments?.length}
              id={feedback.id}
            />
          ))}
        </div>  
        <div className={`timeline-column ${currentTab === STATUS.IN_PROGRESS ? '' : 'none'}`}>
          <div>
            <h2>In-Progress ({inProgressFeedbackItems.length})</h2>
            <p>Currently being developed</p>
          </div>
          {inProgressFeedbackItems.map(feedback => (
            <TimelineCard 
              key={feedback.id}
              status={feedback.status}
              upvotes={feedback.upvotes} 
              upvoted={feedback.upvoted} 
              title={feedback.title}
              description={feedback.description}
              category={feedback.category}
              commentsCount={feedback.comments?.length}
              id={feedback.id}
            />
          ))}
        </div>
        <div className={`timeline-column ${currentTab === STATUS.LIVE ? '' : 'none'}`}>
          <div>
            <h2>Live ({liveFeedbackItems.length})</h2>
            <p>Released features</p>
          </div>
          {liveFeedbackItems.map(feedback => (
            <TimelineCard 
              key={feedback.id}
              status={feedback.status}
              upvotes={feedback.upvotes} 
              upvoted={feedback.upvoted} 
              title={feedback.title}
              description={feedback.description}
              category={feedback.category}
              commentsCount={feedback.comments?.length}
              id={feedback.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
