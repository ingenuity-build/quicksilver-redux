import { useEffect, useState } from "react";
import React from 'react';
import './Airdrops.css';

export default function Airdrop() {
    const [showAirdrops, setShowAirdrops] = useState(false);
    return (
        <>
          <div className="assets-interface row mx-0">
        
      
      {!showAirdrops && <div className="col-12 max-auto mt-5">
      <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
      <h3 className="text-center mt-5"> Airdrops</h3>
      <p className="text-center coming-soon"> Coming soon</p>
      <div className="w-50 mt-2">
        <p>
        Over 50% of the Genesis supply will be going to incentivising the community and driving usage. Eligible stakers of chains onboarded on the Protocol will receive airdrops upon the onboarding of said chains. This means that stakers of chains that do not exist yet will receive a `QCK` airdrop in the future. 
        <br/>
        <br/>
With decentralization in mind, the protocol will weigh the way users stake, and not just how much, in the airdrop formula. The goal of this airdrop model is to ensure the Quicksilver protocol is in the hands of its present and future community, and `QCK` tokens are spread as far and wide across the Cosmos ecosystem.
<br/>
<br/>
The Quicksilver Airdrop is scheduled to start in Q1 2023.
        </p>
        </div>
        
      </div>
      </div>}
      
      </div>
      </>
      )
}