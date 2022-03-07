// import logo from './logo.svg';
import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Containers/Home/Home';
import Login from './Containers/Login/Login';
import Register from './Containers/Register/Register';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
      
        <Header/>

        <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        
        

        </Routes>
          
        

        <Footer/> 
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
