import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { validatorListSelector} from "../../../slices/validatorList";
import {quicksilverSelector} from '../../../slices/quicksilver';
import { selectedNetworkSelector } from "../../../slices/selectedNetwork";
import { decreaseRedelegateStep } from '../../../slices/relegateActiveStep';
import { SpinnerCircular } from 'spinners-react';
import { fetchIntents, intentsSelector } from '../../../slices/intents';


export default function RedelegateAllocations() {
    const dispatch = useDispatch();
    const [allocationProp, setAllocationProp] = React.useState<any>({});
    const {redelegateValidatorList, validatorList} = useSelector(validatorListSelector);
    const {isQSWalletConnected, balances, quicksilverClient, quicksilverAddress} = useSelector(quicksilverSelector);
    const {selectedNetwork} = useSelector(selectedNetworkSelector);
    const {intents} = useSelector(intentsSelector)
    const [sum, setSum] = React.useState(redelegateValidatorList.length);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [transactionSuccessful, setTransactionSuccessful] = React.useState(false);
       let out : string | Array<any> = [];


    React.useEffect(() => {
      if(redelegateValidatorList.length === 1) {
        let temp =  redelegateValidatorList.reduce((acc: any, curr: any) => {
            acc[curr.address] = {...curr, value: 100}
            return acc;
            }, allocationProp);
        setAllocationProp(temp); 
        setSum(100);
      }
        
        else {
          let temp =  redelegateValidatorList.reduce((acc: any, curr: any) => {
                    acc[curr.address] = {...curr, value: 1}
                    return acc;
            }, allocationProp);
  
            setAllocationProp(temp);
          }
           
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
          
        let sum = 0;
        if(redelegateValidatorList.length > 1) {
          redelegateValidatorList.forEach((x: any) => {      
          
        sum = sum + allocationProp[x.address]['value'] ;  console.log(allocationProp[x.address]['value'])})
        console.log(sum);
        if(sum < 100) {
            console.log("Please allocation more atoms");
        } else if(sum > 100) {
            console.log("Please allocation less atoms");
        } else {
            console.log("please proceed");
        }
        setSum(sum);

            }
          }
        
        const onNext = async () => {
            const validators = Object.values(allocationProp);
            console.log(validators)
  
            if(redelegateValidatorList.length === 1) {
              let temp = validators?.map((obj : any) => {
                out = out.concat((obj.value/100).toString() + '.0' + obj.address);
            })
          
          } else {
                let temp = validators?.map((obj : any) => {
                    out = out.concat((obj.value/100).toString() + obj.address);
               
        })
   
      }
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
            setLoading(true);
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
                if(broadcastResult.code === 0 ) {
                  setLoading(false);
                  setTransactionSuccessful(true);
                      // @ts-ignore
     dispatch(fetchIntents(selectedNetwork.chain_id, quicksilverAddress))
            } else {
              setLoading(false);
              console.log(broadcastResult);
              setError('The transaction failed! Please try again.');
            }
          } catch(err: any) {
            setLoading(false);
            console.log(err);
            setError('The transaction failed! Please try again.');
          }
            }
          
            const onPrev = (e: any) => {
      
              // @ts-expect-error
              dispatch(decreaseRedelegateStep());
}
    

    return  (
    <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
      {!transactionSuccessful && <div className="redelegate-pane">
      <h4 className="text-center"> Allocate Intent</h4>  
      {!transactionSuccessful && <div className="d-flex flex-column align-items-end mt-2">
     
        {redelegateValidatorList.length > 1 && redelegateValidatorList.map((val: any) => <>   
        <div className="d-flex mt-3">
            <h5 className=" mx-2">{val.name}</h5>
            <input style={{accentColor: '#D35100'}} className="mx-2" onChange={handleAllocationChange} type="range" value={Object.keys(allocationProp).length ? allocationProp[val.address]['value'] : 1 } name={val.address} min="1" max="100"   />
            <input className="mx-2" onChange={handleAllocationChange} value={Object.keys(allocationProp).length ? allocationProp[val.address]['value']: '1' } name={val.address}  type="number" min="1" step=".5"></input>%
           </div>
            </>
   
            )}
            {redelegateValidatorList.length === 1 && 
            redelegateValidatorList.map((val: any) => <>   
            <div className="d-flex mt-3">
                <h5 className=" mx-2">{val.name}</h5>
                <input style={{accentColor: '#D35100'}} className="mx-2" type="range" value={Object.keys(allocationProp).length ? allocationProp[val.address]['value'] : 1 } name={val.address} min="1" max="100"   />
                <input className="mx-2"  value={Object.keys(allocationProp).length ? allocationProp[val.address]['value']: '1' } name={val.address}  type="number" min="1" step=".5"></input>%
               </div>
                </>
       
                )}
            
            </div>}
            </div>}
            { sum > 100 && <p className="mt-2"> You have allocated {sum} % . Please move the sliders around until you hit 100% and then you can proceed ahead. </p>}
            { sum < 99.9 && <p className="mt-2"> Please allocate the remaining {100.00 - sum} % to continue </p>}
            {!transactionSuccessful && <div className="button-containers mt-5 mb-4">
            <button onClick={onPrev} className="prev-button mx-3" > Previous </button>
        <button disabled={sum < 99.9  || sum  > 100 } className="next-button mx-3" onClick={onNext}>Next</button> 
        </div>}
        <div className="spinner">
        {loading && <SpinnerCircular />}
        </div>
        {loading && <p> Transaction in progress... </p>}
        {error !== '' && !loading &&  !transactionSuccessful &&  <p className="mt-3"> {error}</p>}
        {!loading && transactionSuccessful && <h4>Your transaction is successful.</h4>}

        {!loading && transactionSuccessful && <h3 className="mt-3 mb-1"> Your current intent is:</h3>}
        
        {!loading && transactionSuccessful &&  intents.map((intent: any) => 
            <>
                              <h6 className="mt-1 mb-2">{validatorList.find((x: any) => x.address === intent.valoper_address ) ? validatorList.find((x: any) => x.address === intent.valoper_address ).name : ''} : {+(100*intent.weight).toFixed(2) } %</h6>
                </>
            )}

        
        </div>
    )
        }
      
