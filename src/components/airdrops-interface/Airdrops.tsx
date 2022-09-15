import { useEffect, useState } from "react";
import React from 'react';

export default function Airdrop() {
    const [showAirdrops, setShowAirdrops] = useState(false);
    return (
        <>
          <div className="assets-interface row mx-0">
        
      
      {!showAirdrops && <div className="col-12 max-auto mt-5">
      <div className="mt-5 d-flex justify-content-center align-items-center">
      <h4 className="text-center"> Coming Soon!</h4>
      </div>
      </div>}
      
      </div>
      </>
      )
}