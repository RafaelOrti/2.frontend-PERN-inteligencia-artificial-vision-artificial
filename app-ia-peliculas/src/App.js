// import logo from './logo.svg';
import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Containers/Home/Home';
import Login from './Containers/Login/Login';
import Register from './Containers/Register/Register';
import Profile from './Containers/Profile/Profile';
import Film from './Containers/Film/Film';
import Add from './Containers/Add/Add';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      
        <Header/>

        <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/film" element={<Film/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/moviedetail" element={<MovieDetail/>}/>

        
        

        </Routes>
          
        

        <Footer/> 
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
