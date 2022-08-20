import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';


export default function Delegate() {
    return  (
        <>
        <br/>
        <Link to="delegate">Delegate</Link>
        <Link to="redelegate">Redelegate</Link>
        <Link to="undelegate">Undelegate</Link>
            <Outlet/>
        </>
    )
}