import './App.css';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Admin from './components/Admin/Admin';
import PropertyDetails from './components/PropertyDetails.js/PropertyDetails';
import ReachUs from './components/ReachUs/ReachUs';
import Favourites from './components/Favourites/Favourites';
import SalesRentals from './components/SalesRentals/SalesRentals';
import FreeEvaluation from './components/FreeEvaluation/FreeEvaluation';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/reachUs" element={<ReachUs />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/sales" element={<SalesRentals type={'Sale'}/>} />
        <Route path="/rentals" element={<SalesRentals type={'Rent'}/>} />
        <Route path="/freeEvaluation" element={<FreeEvaluation />} />
        <Route path="/properties/details/:_id" element={<PropertyDetails />}/>

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
