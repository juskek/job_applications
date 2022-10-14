import { Router } from "@reach/router";

import Posts from './components/Posts'
import './App.css';

/**
 * Entry point for app
 * @returns 
 */
function App() {
  return (
      <Router>
        <Posts path="/" />
      </Router>
  );
}

export default App;
