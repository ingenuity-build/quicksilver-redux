import { useEffect, useState } from "react";
import React from 'react';
import './Governance.css';

export default function Governance() {
    const [showAirdrops, setShowAirdrops] = useState(false);
    return (
        <>
          <div className="assets-interface row mx-0">
        
      
      {!showAirdrops && <div className="col-12 mx-auto mt-3">
      <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
      <h3 className="text-center mt-2">Governance by Proxy</h3>
      <p className="text-center coming-soon"> Coming soon</p>
      <div className="col-7 mt-2">
        <p>
        Governance by Proxy will allow users to retain their voting rights when liquid staking their assets, and continue participating in network governance while staking assets through the Protocol.
        <br/>
        <br/>
        This feature will prevent the concentration of governance power within select few actors by maintaining the community’s voice. The Quicksilver team believes that active governance is key to a healthy and functioning ecosystem, thus, it is of the highest importance that Quicksilver users continue to benefit from governance rights while holding liquid staked assets.
{/* <br/>
<br/>
The Quicksilver Airdrop is scheduled to start in Q1 2023. */}
        </p>
        </div>
        
      </div>
      </div>}
      
      </div>
      </>
      )
}