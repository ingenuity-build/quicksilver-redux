import React, {useState, useEffect} from 'react';
import { selectedNetworkWalletSelector } from '../../../slices/selectedNetworkWallet';
import { useSelector, useDispatch } from 'react-redux'
import {quicksilverSelector} from '../../../slices/quicksilver';
import {  setModalOpen } from '../../../slices/connectWalletModal';
import { selectedNetworkSelector } from "../../../slices/selectedNetwork";
import { fetchUnbondings, unbondingsSelector } from "../../../slices/unbonding";
import { epochsSelector, fetchEpoch } from '../../../slices/epoch';
import Moment from 'moment';
import './Undelegate.css';
import Collapsible from 'react-collapsible';
import { SpinnerCircular } from 'spinners-react';

export default function Undelegate() {
    const {networkAddress} = useSelector(selectedNetworkWalletSelector);
    const {isQSWalletConnected, balances, quicksilverClient, quicksilverAddress} = useSelector(quicksilverSelector);
    const {selectedNetwork} = useSelector(selectedNetworkSelector);
    const {withdrawals} = useSelector(unbondingsSelector);
    const {epochs} = useSelector(epochsSelector)
    const [unstakingAmount, setUnstakingAmount] = useState(0.1);
    const [epochStartTime, setEpochStartTime] = useState("");
    const [epochDuration, setEpochDuration] = useState("")
    const [QCKBalance, setQCKBalance] = useState(0);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [transactionSuccessful, setTransactionSuccessful] = useState(false);
    const [time, setTime] = useState(new Date());
    const [unbondingSum, setUnbondingSum] = useState(0);
    const dispatch = useDispatch();
    const onButtonClick = () => {
      // @ts-expect-error
    dispatch(setModalOpen());
  }
      const changeAmount = (e: any) => {
                    setUnstakingAmount(e.target.value);
    }
    useEffect(() => {
      setUnstakingAmount(0.1);
     
  }, [])
  useEffect(() => {
    // @ts-expect-error
    dispatch(fetchEpoch());
  }, [])
  useEffect(() => {
    if(selectedNetwork !=="Select a network" && quicksilverAddress)
       // @ts-expect-error
    dispatch(fetchUnbondings(selectedNetwork.chain_id, quicksilverAddress))
    setTransactionSuccessful(false);
    setUnstakingAmount(0.1);
    
}, [selectedNetwork, quicksilverAddress])

useEffect(() => {
  if(epochs && selectedNetwork !== "Select a network"){ 
    let epoch =  epochs.find((y:any) => y.identifier === "epoch"); 

     const date = new Date(epoch?.current_epoch_start_time);
     let unbondingPeriod = +(selectedNetwork?.unbonding_period)/1000000000;
     let duration = +(epoch?.duration.slice(0, -1))
    let time = unbondingPeriod + duration;
    let finalTime = addSeconds(time, date);
    setTime(finalTime)
  }
}, [epochs, selectedNetwork])

useEffect(() => {
    setUnbondingSum(withdrawals.reduce((partialSum: any, a: any) => partialSum + a.amount[0].amount/1000000, 0));
}, [withdrawals, selectedNetwork])

  useEffect(() => {
    if(balances !== []) {
         let balance = balances.find((bal: any) => bal.denom === selectedNetwork.local_denom);
         if(balance) {
          console.log(balance)
          setQCKBalance((balance.amount)/1000000);
         } else
         {
           setQCKBalance(0);
         }
    }
}, [balances, selectedNetwork])

function addSeconds(numOfSeconds: any, date = new Date()) {
  date.setSeconds(date.getSeconds() + numOfSeconds);

  return date;
}

const onMaxClick =  (event: React.MouseEvent<HTMLElement>) => {

setUnstakingAmount(QCKBalance);
}
    const Unbond =  async (actionID: any) => {

        let msg =  {typeUrl: "/quicksilver.interchainstaking.v1.MsgRequestRedemption",
        value: {
        chainId: selectedNetwork.chain_id,
        fromAddress: quicksilverAddress,
        value: {
          "denom": selectedNetwork.local_denom,
          "amount": "" + (unstakingAmount * 1000000)
        },
        destinationAddress: networkAddress
      }
    }
    try {
      setLoading(true);

        const broadcastResult = await quicksilverClient.signAndBroadcast(
           quicksilverAddress,
            [msg],
           {
              "gas": (2000000 + (1000 * selectedNetwork.validators.length)).toString(),
              "amount": [
                {
                  "denom": "uqck",
                  "amount": "5000"
                }
              ]
            },
            'MEMO'
          );
          if(broadcastResult.code === 0 ) {
            setLoading(false);
            setTransactionSuccessful(true);
                  // @ts-expect-error
    dispatch(fetchUnbondings(selectedNetwork.chain_id, quicksilverAddress))
    setUnstakingAmount(0.1);
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
    return (
        <>
      
        {!isQSWalletConnected && <div>
          <div className="connect-wallet-pane d-flex flex-column align-items-center ">
                <h4 className="sub-heading"> Hey there! </h4>
                <h1 className="mt-3"> Connect your wallet to get started! </h1>
                <button  onClick={onButtonClick} className="connect-wallet-button mt-5"> Connect Wallet </button>
                </div>
        </div>}
        
        {isQSWalletConnected && selectedNetwork === "Select a network" && <div className='text-center'>
        <h2 className="mt-4">Choose your network </h2>
        <p className="mt-2">Choose the network from the dropdown in the Navbar</p>
          </div>}
        {isQSWalletConnected && selectedNetwork !== "Select a network" && <div className='unbonding-interface'>
   
        <div className='mt-5'>
        <h3 className="mt-5 mb-5 text-center">Unbond your {selectedNetwork.local_denom[1] + selectedNetwork.local_denom.slice(2).toUpperCase()} in exchange for  {selectedNetwork.base_denom.slice(1).toUpperCase()}</h3>
          <div>
           {withdrawals.length > 0 && <div className="col-8 m-auto">
          <Collapsible trigger={'Unbondings in progress: ' + unbondingSum.toFixed(6) + ' ' +  selectedNetwork.base_denom.slice(1).toUpperCase()}>
          
<table className="table mt-3">

  <tbody className="mt-3">
  {withdrawals.map((row: any) =>
          <>

         
                <tr>
      <td>{row?.amount[0].amount/1000000} {selectedNetwork.base_denom.slice(1).toUpperCase()} </td>
                {row.status === 1 && <td> A few minutes later.. </td>}
                {row.status === 2 && <td> {Moment(time).format('MMMM Do YYYY, h:mm a')}</td>} 
                {row.status === 3 && <td>{Moment(row.completion_time).format('MMMM Do YYYY, h:mm a').toLocaleString()} </td>}
                {row.status === 4 && <td> A few minutes later..</td>}
                {row.status === 5 && <td> Completed</td>}
                {row.status === 1 && <td> Tokenize </td>}
                {row.status === 2 && <td> Queued</td>} 
                {row.status === 3 && <td> Unbonding</td>}
                {row.status === 4 && <td> Sending</td>}
                {row.status === 5 && <td> Completed</td>}
    </tr>
          
               
           
      
   
       

            
         
          </>
  

)}
   
  </tbody>
</table>
  
    </Collapsible>
    </div>  }

</div>
        <h5 className='text-center mt-4'> Available  {selectedNetwork.local_denom[1] + selectedNetwork.local_denom.slice(2).toUpperCase()} on Quicksilver Zone: <span> {QCKBalance}   {selectedNetwork.local_denom[1] + selectedNetwork.local_denom.slice(2).toUpperCase()}</span></h5>
        </div>

        <div className="d-flex mt-3 align-items-center justify-content-center">
                    <p className="m-0 mx-3"> Number of  {selectedNetwork.local_denom[1] + selectedNetwork.local_denom.slice(2 ).toUpperCase()} you want to unbond:</p>
                    <input className="mx-3" type="number" value={unstakingAmount}  placeholder="0" min={0} onChange={ changeAmount}/>
                    <button className="mx-3 p-1 max-button" onClick={onMaxClick}> MAX </button> 
                    {/* <button className="mx-3 p-1 max-button"> MAX </button>  */}
                </div>

                <div className="d-flex justify-content-center">
        <button disabled={unstakingAmount == 0 || unstakingAmount  > QCKBalance ?  true: false}  className="unbond text-center mt-5 " onClick={ () => Unbond(0)}> UNBOND </button>

        </div>
        <div className="d-flex flex-column mt-3 justify-content-center align-items-center">
        <div className="spinner">
        {loading && <SpinnerCircular />}
        </div>
        {loading && <p> Transaction in progress... </p>}
        {error !== '' && !loading && !transactionSuccessful && <p className="mt-3"> {error}</p>}
{!loading && transactionSuccessful && <p>Your transaction is successful. Your withdrawal request will be completed on {Moment(time).format('MMMM Do YYYY, h:mm a')} Revisit this page to check the status of your unbonding request.</p> }
      </div>
        </div>}
        </>
    )
}