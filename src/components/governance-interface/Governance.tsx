import { useEffect, useState } from "react";
import React from 'react';
import './Governance.css';

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 150) : text}
      
      <p onClick={toggleReadMore} className="read-or-hide mt-3">
    
        {isReadMore ? "Read more" : " Show less"}
      </p>
    </p>
  );
};

export default function Governance() {
    const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
    return (
        <>
          <div className="staking-interface row mx-0">
        
      
      <div className="col-12 content">
      <div className="allocation-pane d-flex flex-column align-items-center">
        <h4 className="text-center mt-4"> Proposals </h4>
        <div className="staking-pane d-flex flex-column mt-4">
        <div>
       <h5> #2 Proposal for STARS / qSTARS Incentivized Pool </h5>
       <div className="d-flex">
       <p> Voting start time: <span className="font-bold">2022-09-20 22:46 UTC</span></p>
       </div>
            <div className="d-flex">
       <p> Voting end time: <span className="font-bold">2022-09-26 22:46 UTC</span></p>

   
       
       </div>
    
       <h4> Description</h4>
      <ReadMore>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
 dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
      </ReadMore>
      
   
      <h4> Voting Details</h4>
      <div className="d-flex mt-3">
        <p className="vote yes text-center"> Yes: 55%</p>
        <p className="vote no mx-3 text-center"> No: 20%</p>
            <p className="vote nwv mx-3 text-center"> No with Veto: 23%</p>
            <p className="vote abstain mx-3 text-center"> Abstain: 10%</p>
      </div>

      <h4 className="mt-4"> Your Vote</h4>
      <div className="d-flex mt-3">
        <p className="vote yes-button text-center font-bold"> YES</p>
        <p className="vote no-button mx-3 text-center font-bold"> NO</p>
            <p className="vote nwv-button mx-3 text-center font-bold"> NO WITH VETO</p>
            <p className="vote abstain-button mx-3 text-center font-bold"> ABSTAIN</p>
      </div>
       
       
     
        </div>
        
 
        
      </div>
      </div>
      </div>
      </div>
      </>
      )
}