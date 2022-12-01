import React, {useEffect, useState} from 'react';
import { poolsSelector, fetchOsmosisPools } from '../../slices/pools';
import { useDispatch, useSelector } from 'react-redux'
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';
import env from "@ludovicm67/react-dotenv";

const poolsId = [1,15]

export default function Pools() {
    const dispatch = useDispatch();
    const [showPools, setShowPools] = useState(false);

  const { osmosisPools } = useSelector(poolsSelector);
    useEffect(() => {

        // @ts-expect-error
          dispatch(fetchOsmosisPools())

        }, [])

      
//     return (
//         <>
        
//         <div className="pools-interface mt-5">
//         {poolsId.map((poolId: any) =>
//           <>   
//           <div >
//                <div className="d-flex align-items-start"> 
  
                
//                <div className="card-details">
//                 <h5> {osmosisPools.find((x: any) => x.pool_id === poolId )?.tvl }</h5>
               
//                 </div>
//               </div>
//                 </div>
              

//           </>
          
   
  
// )}
//         </div>
//         </>
//     )
return (
  <>
    <div className="assets-interface row mx-0">
  

{!showPools && <div className="col-12 max-auto mt-5">
<div className="mt-5 d-flex justify-content-center align-items-center">
<h4 className="text-center"> Coming Soon!</h4>
</div>
</div>}

</div>
</>
)
}