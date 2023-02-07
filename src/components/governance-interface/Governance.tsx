import { useEffect, useState } from "react";
import React from 'react';
import './Governance.css';

export default function Governance() {
    const [showAirdrops, setShowAirdrops] = useState(false);
    return (
        <>
          <div className="assets-interface row mx-0">
        
      
      {!showAirdrops && <div className="col-12 max-auto mt-5">
      <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
      <h3 className="text-center mt-5">Governance by Proxy</h3>
      <p className="text-center coming-soon"> Coming Soon</p>
      <div className="w-50 mt-2 text-center">
        <p>
        Governance by Proxy will allow stakers to retain their voting rights when liquid staking their assets by voting on active proposals through the Quicksilver protocol interface.
        <br/>
        <br/>
        The Quicksilver team is building this feature because community participation in governance is key to a healthy blockchain ecosystem.
<br/>
<br/>
Governance by Proxy is scheduled for 2023.
        </p>
        </div>
        
      </div>
      </div>}
      
      </div>
      </>
      )
}