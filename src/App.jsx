import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ExpenseTracker } from './pages/expense-tracker/Index'
import { Auth } from './pages/auth/Index'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact element={<Auth />} />
          <Route path='/expense-tracker' element={<ExpenseTracker />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
