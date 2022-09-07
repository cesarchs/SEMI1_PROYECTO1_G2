import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Dashboard } from './pages/dashboard'
import { Login } from './pages/login'
import { Register } from './pages/register'

import { Home } from './pages/home'

function App() {
    return (
        <div className='root'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <Home/> } />
                    <Route path='/login' element={ <Login/> } />
                    <Route path='/register' element={ <Register/> } />
                    <Route path='/dashboard' element={ <Dashboard/> } />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;