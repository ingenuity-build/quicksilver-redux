import React, {useEffect} from 'react';
import { poolsSelector, fetchOsmosisPools } from '../../slices/pools';
import { useDispatch, useSelector } from 'react-redux'
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';

const poolsId = [1,15]

export default function Pools() {
    const dispatch = useDispatch()

  const { osmosisPools } = useSelector(poolsSelector);
    useEffect(() => {

        // @ts-expect-error
          dispatch(fetchOsmosisPools())

        }, [])

      
    return (
        <>
        
        <div className="pools-interface mt-5">
        {poolsId.map((poolId: any) =>
          <>   
          <div >
               <div className="d-flex align-items-start"> 
  
                
               <div className="card-details">
                <h5> {osmosisPools.find((x: any) => x.pool_id === poolId )?.tvl }</h5>
               
                </div>
              </div>
                </div>
              

          </>
          
   
  
)}
        </div>
        </>
    )
}