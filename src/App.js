import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'
import Rents from './Pages/Home/Rents';
import Sales from './Pages/Home/Sales';
import Property from './Pages/Property/Property'

function App() {
  return (
   <Router>
     <Routes>
       <Route path='/' element={<Navigate replace to='/rent'/>}/>
       <Route path='/rent' element={<Rents/>}/>
       <Route path='/sale' element={<Sales/>}/>
       <Route path='/property/:id' element={<Property/>} />
     </Routes>
   </Router>
  );
}

export default App;
