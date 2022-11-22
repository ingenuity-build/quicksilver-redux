import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { validatorListSelector} from "../../../slices/validatorList";
import {quicksilverSelector} from '../../../slices/quicksilver';
import { selectedNetworkSelector } from "../../../slices/selectedNetwork";
import { decreaseRedelegateStep } from '../../../slices/relegateActiveStep';

export default function RedelegateAllocations() {
    const dispatch = useDispatch();
    const [allocationProp, setAllocationProp] = React.useState<any>({});
    const {redelegateValidatorList} = useSelector(validatorListSelector);
    const {isQSWalletConnected, balances, quicksilverClient, quicksilverAddress} = useSelector(quicksilverSelector);
    const {selectedNetwork} = useSelector(selectedNetworkSelector);
       let out : string | Array<any> = [];


    React.useEffect(() => {
          let temp =  redelegateValidatorList.reduce((acc: any, curr: any) => {
                    acc[curr.address] = {...curr, value: 1}
                    return acc;
            }, allocationProp);
  
            setAllocationProp(temp);
  
           
    }, [])

    const handleAllocationChange = (e: any) => {
        if(e.target.value !== "") {
             // setAllocationProp({...allocationProp, [e.target.name] :{ , value: e.target.value}})
             let newAllocationProp : any = {...allocationProp};
  
              newAllocationProp[e.target.name].value = +(e.target.value);
              setAllocationProp(newAllocationProp);

        }
        else {
          let newAllocationProp : any = {...allocationProp};
          newAllocationProp[e.target.name].value = 1;
          setAllocationProp(newAllocationProp);

        }
            }
        
        const onNext = async () => {
            const validators = Object.values(allocationProp);
            console.log(validators)
  
                let temp = validators?.map((obj : any) => {
                    out = out.concat((obj.value/100).toString() + obj.address);
      
        })
        out = out.toString();
        console.log(out);

        let msg =  {
            typeUrl: "/quicksilver.interchainstaking.v1.MsgSignalIntent",
            value: {
              chainId: selectedNetwork.chain_id,
              fromAddress: quicksilverAddress,
              intents: out
            }
          }
          try {
              const broadcastResult = await quicksilverClient.signAndBroadcast(
                quicksilverAddress,
                  [msg],
                 {
                    "gas": "200000",
                    "amount": [
                      {
                        "denom": "uqck",
                        "amount": "5000"
                      }
                    ]
                  },
                  'MEMO'
                );
                console.log(broadcastResult)
          } catch(err: any) {
              console.log(err)
          }
            }
          
            const onPrev = (e: any) => {
      
              // @ts-expect-error
              dispatch(decreaseRedelegateStep());
}
    

    return  (
    <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex flex-column align-items-end mt-2">
        {redelegateValidatorList.map((val: any) => <>   
        <div className="d-flex mt-3">
            <h5 className=" mx-2">{val.name}</h5>
            <input style={{accentColor: '#D35100'}} className="mx-2" onChange={handleAllocationChange} type="range" value={Object.keys(allocationProp).length ? allocationProp[val.address]['value'] : 1 } name={val.address} min="1" max="100"   />
            <input className="mx-2" onChange={handleAllocationChange} value={Object.keys(allocationProp).length ? allocationProp[val.address]['value']: '1' } name={val.address}  type="number" min="1" step=".5"></input>%
           </div>
            </>
   
            )}
            </div>
            <div className="button-containers mt-5 mb-4">
            <button onClick={onPrev} className="prev-button mx-3" > Previous </button>
        <button  className="next-button mx-3" onClick={onNext}>Next</button> 
</div>
        </div>
        
    )
        }
