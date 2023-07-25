import data from '../data/data.json'
import { ReactNode, createContext, useContext, useState } from 'react'
import { Comment } from '../components/CommentsList'
import { STATUS } from '../data/constants'
import { v4 as uuidv4 } from 'uuid'
import { useLocalStorage } from '../hooks/useLocalStorage'

type FeedbackProviderProps = {
  children: ReactNode
}

export type FeedbackItem = {
  id: string 
  title: string
  category: string
  upvotes: number
  upvoted: boolean
  status?: string
  description: string
  comments?: Comment[]
}

type FeedbackContext = {
  feedbackItems: FeedbackItem[]
  suggestionItemsFiltered: FeedbackItem[]
  categoryFilter: string
  toggleFeedbackVote: (id: string) => void
  updateFeedback: (id: string, title: string, category: string, status: string, description: string) => void
  setCategoryFilter: (category: string) => void
  addFeedback: (title: string, category: string, description: string) => void
  deleteFeedback: (id: string) => void
  addFeedbackComment: (id: string, comment: string) => void
  addCommentReply: (id: string, commentId: string, content: string, replyingTo: string) => void
}

const FeedbackContext = createContext({} as FeedbackContext)

export function useFeedbacks() {
  return useContext(FeedbackContext)
}

export function FeedbackProvider({ children }: FeedbackProviderProps) { 
  const [feedbackItems, setFeedbackItems] = useLocalStorage<FeedbackItem[]>('feedbacks', data.productRequests)
  const [categoryFilter, setCategoryFilter] = useState('All')

  function toggleFeedbackVote(id: string) {
    setFeedbackItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === id) {
          return {
            ...item,
            upvoted: !item.upvoted, 
            upvotes: item.upvoted ? item.upvotes - 1 : item.upvotes + 1 
          }
        }
        return item
      })
    })
  }

  function updateFeedback(
    id: string, 
    title: string, 
    category: string, 
    status: string, 
    description: string
  ) {
    setFeedbackItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === id) {
          return {
            ...item,
            title: title, 
            category: category,
            status: status,
            description: description
          }
        }
        return item
      })
    })
  }

  function addFeedback(
    title: string, 
    category: string, 
    description: string
  ) {
    setFeedbackItems(prevItems => {
      return [...prevItems, {
        id: uuidv4(),
        title: title,
        category: category,
        upvotes: 0,
        upvoted: false,
        status: 'suggestion',
        description:  description,
        comments: []
      }]
    })
  }

  function deleteFeedback(id: string) {
    setFeedbackItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  function addFeedbackComment(id: string, comment: string) {
    setFeedbackItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === id) {
          return {
            ...item,
            comments: [ 
              ...(item.comments ?? []), 
              { id: uuidv4(), content: comment, user: { ...data.currentUser } }
            ]
          }
        }
        return item
      })
    })
  }

  function addCommentReply(id: string, commentId: string, content: string, replyingTo: string) {
    setFeedbackItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === id) {
          return {
            ...item,
            comments: item.comments!.map(comment => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  replies: [
                    ...(comment.replies ?? []),
                    { content, replyingTo, user: { ...data.currentUser } }
                  ]
                }
              }
              return comment
            })
          }
        }
        return item
      })
    })
  }

  const suggestionItemsFiltered = feedbackItems.filter(feedback => {
    if (categoryFilter === 'All') return feedback.status === STATUS.SUGGESTION
    return feedback.status === STATUS.SUGGESTION && feedback.category === categoryFilter 
  })

  return (
    <FeedbackContext.Provider
      value={{
        feedbackItems,
        suggestionItemsFiltered,
        categoryFilter,
        toggleFeedbackVote,
        updateFeedback,
        setCategoryFilter,
        addFeedback,
        deleteFeedback,
        addFeedbackComment,
        addCommentReply,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}