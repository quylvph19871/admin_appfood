import logo from './logo.svg';
import './App.css';
import AddFoodData from './components/AddFoodData';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrderSelection from './components/Orders/OrderSelection';
import ShowOrderSpecific from './components/Orders/ShowOrderSpecific';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<OrderSelection />} />
        <Route path='/orders' element={<OrderSelection />} />
        <Route path='/addfood' element={<AddFoodData />} />
        <Route path='/orderdetails/:orderid' element={<ShowOrderSpecific />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
