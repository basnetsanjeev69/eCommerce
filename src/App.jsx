import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import ForgetPassword from './pages/auth/ForgetPassword'
import Register from './pages/auth/Register'
import Category from './pages/category/Category'
import Client from './pages/client/Client'
import Product from './pages/product/Product'
import Dashboard from './pages/dashboard/Dashboard'
import Order from './pages/order/Order'
import PaymentOption from './pages/payment-option/PaymentOption'
import Profile from './pages/profile/Profile'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import { ToastContainer } from 'react-toastify'
import PrivateRoute from './components/privateRoute/PrivateRoute'
import AddNewProduct from './pages/product/AddNewProduct'
import { getAllCategoriesAction } from './redux/category/categoryAction'
import { useDispatch } from 'react-redux'
import { getAllProductsAction } from './redux/product/productAction'
import EditProduct from './pages/product/EditProduct'


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategoriesAction())
    dispatch(getAllProductsAction())
  }, [])
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Login />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/forget-password' element={<ForgetPassword />}></Route>

        {/* Private Routes */}
        <Route path='/register' element={<PrivateRoute><Register /></PrivateRoute>}></Route>
        <Route path='/category' element={<PrivateRoute><Category /></PrivateRoute>}></Route>
        <Route path='/client' element={<PrivateRoute><Client /></PrivateRoute>}></Route>
        <Route path='/product' element={<PrivateRoute><Product /></PrivateRoute>}></Route>
        <Route path='/product/new' element={<PrivateRoute><AddNewProduct /></PrivateRoute>}></Route>
        <Route path='/product/edit/:slug' element={<PrivateRoute><EditProduct /></PrivateRoute>}></Route>
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>}></Route>
        <Route path='/order' element={<PrivateRoute><Order /></PrivateRoute>}></Route>
        <Route path='/payment-option' element={<PrivateRoute><PaymentOption /></PrivateRoute>}></Route>
        <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>}></Route>
        <Route path='*' element={<Login />}></Route>

      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
