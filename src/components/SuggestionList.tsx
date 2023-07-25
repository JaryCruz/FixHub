import { Link } from "react-router-dom"
import { FeedbackCard} from "./FeedbackCard"
import { useFeedbacks } from '../context/FeedbackContext'
import { SORT_OPTIONS } from "../data/constants"
import { useState } from "react"
import emptyImg from '../assets/empty.svg'

export function SuggestionList() {
  const [filterValue, setFilterValue] = useState('most-upvotes')
  const { suggestionItemsFiltered } = useFeedbacks()

  function sortSuggestions() {
    const sortedItems = [...suggestionItemsFiltered]
    switch(filterValue) {
      case SORT_OPTIONS.MOST_UPVOTES: 
        return sortedItems.sort((a, b) => b.upvotes - a.upvotes)
      case SORT_OPTIONS.LEAST_UPVOTES:
        return sortedItems.sort((a, b) => a.upvotes - b.upvotes)
      case SORT_OPTIONS.MOST_COMMENTS: 
        return sortedItems.sort((a, b) => (b.comments?.length ?? 0) - (a.comments?.length ?? 0))
      case SORT_OPTIONS.LEAST_COMMENTS: 
        return sortedItems.sort((a, b) => (a.comments?.length ?? 0) - (b.comments?.length ?? 0))
      default:
        return sortedItems
    }
  }

  return (
    <main>
      <div className="suggestions-filter">
        <div>
          <h3>{suggestionItemsFiltered.length} Suggestions</h3>
          <label>
            Sort By: 
            <select onChange={e => setFilterValue(e.target.value)} value={filterValue}>
              <option value={SORT_OPTIONS.MOST_UPVOTES}>Most Upvotes</option>
              <option value={SORT_OPTIONS.LEAST_UPVOTES}>Least Upvotes</option>
              <option value={SORT_OPTIONS.MOST_COMMENTS}>Most Comments</option>
              <option value={SORT_OPTIONS.LEAST_COMMENTS}>Least Comments</option>
            </select>
          </label>
        </div>
        <Link to='/add'>
          <button className="btn-add">+ Add Feedback</button>
        </Link>
      </div>
      <div className="suggestions-container">
        {suggestionItemsFiltered.length === 0 ? (
          <div className="no-suggestions">
            <img src={emptyImg} alt="" />
            <h2>There is no feedback yet.</h2>
            <p>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
            <Link to='/add'>
              <button className="btn-add">+ Add Feedback</button>
            </Link>
          </div>
        ) : (
          sortSuggestions().map(suggestion => (
            <FeedbackCard 
              id={suggestion.id}
              title={suggestion.title}
              category={suggestion.category}
              upvotes={suggestion.upvotes} 
              upvoted={suggestion.upvoted}
              description={suggestion.description}
              commentsCount={suggestion.comments?.length}
              key={suggestion.id} 
            />
          ))
        )}
      </div>
    </main>
  )
}
