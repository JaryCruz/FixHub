import { AsideDashboard } from '../components/AsideDashboard';
import { SuggestionList } from '../components/SuggestionList';

export function Home() {
  return (
    <div className="home-container">
      <AsideDashboard />
      <SuggestionList />
    </div>
  )
}
