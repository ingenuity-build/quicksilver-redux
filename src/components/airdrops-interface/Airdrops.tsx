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
      <h3 className="text-center mt-5"> Airdrop</h3>
      <p className="text-center coming-soon"> Coming Soon</p>
      <div className="w-50 mt-2 text-center">
        <p>
        As new chains are onboarded, eligible stakers will receive a QCK airdrop. We’re airdropping this way because we’re committed to decentralization and onboarding new users to ensure the protocol is in the hands of the community.
      
<br/>
<br/>
The first QCK token airdrop is coming soon.
        </p>
        </div>
        
      </div>
      </div>}
      
      </div>
      </>
      )
}