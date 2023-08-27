import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Form from './components/Form';
import Navbar from './components/Navbar';
import UpdateTask from './components/Update';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">

      <Toaster />

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/add-task' element={<Form />} />
          <Route path='/edit' element={<UpdateTask />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
