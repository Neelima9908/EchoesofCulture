import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tribes from './pages/Tribes';
import Languages from './pages/Languages';
import AddComment from './pages/AddComment';
import Comments from './pages/Comments';
import Navbar from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Learn from './pages/Learn';
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tribes" element={<Tribes />} />
        <Route path="/languages" element={<Languages />} />
        <Route path="/add-comment" element={<AddComment />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/about" element={<About />} />
        <Route path="/learn" element={<Learn />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
