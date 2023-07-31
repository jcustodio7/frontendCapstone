import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import Register from './components/Register';
import UpdateProduct from './components/UpdateProduct'
import Products from './components/Products';
import Admins from './components/Admins';
import Shopview from './components/Shopview';
import ShopStore from './components/ShopStore';
import AboutUs from './components/AboutUs';
import Signup from './components/Signup';
import Customer from './components/Customer';
import LoginCustomer from './components/LoginCustomer';


function App() {

  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
      <Route path='/' element= {<Login />}></Route>
      <Route path='/login' element= {<Login />}></Route>
      <Route path='/register' element= {<Register />}></Route>
      <Route path='/addProduct' element= {<AddProduct />}></Route>
      <Route path='/updateProduct/:id' element= {<UpdateProduct />}></Route>
      <Route path='/products' element= {<Products />}></Route>
      <Route path='/admins' element= {<Admins />}></Route>
      <Route path='/shopview' element= {<Shopview />}></Route>
      <Route path='/shopstore' element= {<ShopStore />}></Route>
      <Route path='/Home' element= {<ShopStore />}></Route>
      <Route path='/About' element= {<AboutUs />}></Route>
      <Route path='/Signup' element= {<Signup />}></Route>
      <Route path='/customers' element= {<Customer />}></Route>
      <Route path='/loginCustomer' element= {<LoginCustomer />}></Route>


      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// element= {<Products />}
