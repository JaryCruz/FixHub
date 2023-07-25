import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Timeline } from "./pages/Timeline"
import { AddFeedback } from "./pages/AddFeedback"
import { FeedbackDetails } from "./pages/ FeedbackDetails"
import { EditFeedback } from "./pages/EditFeedback"
import { FeedbackProvider } from "./context/FeedbackContext"

export default function App() {
  return (
    <FeedbackProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/timeline' element={<Timeline />} />
        <Route path='/add' element={<AddFeedback />} />
        <Route path=":id">
          <Route index element={<FeedbackDetails />} />
          <Route path="edit" element={<EditFeedback />} />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </FeedbackProvider>
  )
}
