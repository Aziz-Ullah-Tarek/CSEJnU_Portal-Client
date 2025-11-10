import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import LoadingAnimation from './components/LoadingAnimation';
import AppRouter from './router/router';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasSeenAnimation = sessionStorage.getItem('hasSeenAnimation');
    if (hasSeenAnimation) {
      setLoading(false);
    }
  }, []);

  const handleAnimationComplete = () => {
    setLoading(false);
    sessionStorage.setItem('hasSeenAnimation', 'true');
  };

  if (loading) {
    return <LoadingAnimation onComplete={handleAnimationComplete} />;
  }

  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
