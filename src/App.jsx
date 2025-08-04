import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransactionsList from './components/TransactionsList';
import CreateTransaction from './components/CreateTransaction';
import './App.css'

// Main App component sets up routing for the application
function App() {
  return (
    // Router provides navigation between pages
    <Router>
      {/* Define application routes */}
      <Routes>
        {/* Route for transactions list page */}
        <Route path="/" element={<TransactionsList />} />
        {/* Route for create transaction page */}
        <Route path="/create" element={<CreateTransaction />} />
      </Routes>
    </Router>
  );
}

export default App
