import './App.css';
import {Link, BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Form from './components/Form';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      {/* Hello world */}
      {/* <Login /> */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/add-task' element={<Form />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
