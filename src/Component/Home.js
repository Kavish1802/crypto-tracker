import React from 'react'
import BelowNavbar from './Banner/BelowNavbar'
import { CryptoTable } from './Banner/CryptoTable';
import './FontStyle.css';

export const Home = () => {

    return (
        <div>
            <BelowNavbar />
            <CryptoTable/>
        </div>
    )
}
