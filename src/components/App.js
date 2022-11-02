import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import '@fortawesome/fontawesome-free/js/all';
import Header from './Header';
import Home from './Home/Home';
import Level from './Level/Level';
import Footer from './Footer';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mapSlug' element={<Level />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;