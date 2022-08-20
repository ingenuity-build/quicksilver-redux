import React from 'react';
import { Link } from "react-router-dom";
import { useLocation} from "react-router-dom";

export default function Navbar() {
    return (
        <>
         <Link  to="/stake/delegate">STAKE</Link> 
         <Link  to="/pools">POOLS</Link> 
         <Link  to="/airdrop">AIRDROP</Link> 
         <Link  to="/claims">ASSETS</Link> 
         </>
       
    )
}