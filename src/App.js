import React, { useState, useEffect } from "react";
import Footer from './footer';
import Body from './body.js'
import SearchBox from './searchBox.js'


export default function App() {
    return (
        <div>      
            <Body/>
                <SearchBox/>
            <Footer/>
        </div>
    );
};
