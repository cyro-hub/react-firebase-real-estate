import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'
import Register from './Pages/Account/Register';
import Login from './Pages/Account/Login'
import Rents from './Pages/Home/Rents';
import Sales from './Pages/Home/Sales';
import Property from './Pages/Property/Property'
import { useEffect, useState } from 'react';
import * as firebase from './Firebase/firebase'
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import * as typesOfActions from './Redux/actionTypes'

function App() {
const dispatch = useDispatch();

useEffect(()=>{
  onAuthStateChanged(firebase.auth, (user) => {
    if(user){
      dispatch({type:typesOfActions.getUserInfo,payload:user})
      return
    }else{
      return
    }
  });
},[])

  return (
   <Router>
     <Routes>
       <Route path='/' element={<Navigate replace to='/rent'/>}/>
       <Route path='/rent' element={<Rents/>}/>
       <Route path='/sale' element={<Sales/>}/>
       <Route path='/property/:key' element={<Property/>} />
       <Route path='/register' element={<Register/>}/>
       <Route path='/login' element={<Login/>} />
     </Routes>
   </Router>
  );
}

export default App;
