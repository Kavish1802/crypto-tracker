import React from 'react'
import BelowNavbar from './Banner/BelowNavbar'
import { CryptoTable } from './Banner/CryptoTable';
import './FontStyle.css';
import Login from './Login';

export const Home = () => {

    return (localStorage.getItem('token')?(
        
        <div>
            <BelowNavbar />
            <CryptoTable/>
        </div>):
        (<div>
            <Login/>
        </div>)
    )
}
