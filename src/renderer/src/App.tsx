import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Clients from './pages/Clients';

function App(): JSX.Element {
  
  return (
    <Router>
      <div className="flex flex-row h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 ml-64 h-screen overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
