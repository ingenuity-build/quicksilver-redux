
import "./ConnectWalletModal.css";
import { setWalletType } from '../../slices/quicksilver';
import { useDispatch} from 'react-redux';
import Keplr from '../../assets/icons/KeplrLogo.png';
import Leap from '../../assets/icons/LeapLogo.png';
import Cosmostation from '../../assets/icons/CosmostationLogo.png'
import React, {useEffect} from 'react';

interface PropComponent {
    handleClickOpen? : { (): void}
    loading: boolean;
    setLoading: any
  }
  

export default function ConnectWalletModal(props: PropComponent) {
    const [isKeplrInstalled, setIsKeplrInstalled] = React.useState(false);
    const [isLeapInstalled, setIsLeapInstalled] = React.useState(false);
    const [isCosmostationInstalled, setIsCosmostationInstalled] = React.useState(false);
    const dispatch = useDispatch();

    React.useEffect(() => {
     // @ts-expect-error
     if (window &&  window.keplr) {
        setIsKeplrInstalled(true);
             
     } 
     // @ts-expect-error
     if (window &&  window.leap) {
        setIsLeapInstalled(true);
     }
     // @ts-expect-error
      if (window &&  window.cosmostation) {
        setIsCosmostationInstalled(true);
     }
     
      } ,[]);

      

    const connectKeplr = () => {

           // @ts-expect-error
    dispatch(setWalletType('keplr'));
    localStorage.setItem( 'WalletType', 'keplr' );
         // @ts-expect-error
         props?.handleClickOpen();
        
            
    }

    const connectLeap = () => {

               // @ts-expect-error
dispatch(setWalletType('leap'));
localStorage.setItem( 'WalletType', 'leap' );
    // @ts-expect-error
    props?.handleClickOpen();
        
     

}

const connectCosmostation = () => {
    // @ts-expect-error
    dispatch(setWalletType('cosmostation'));
    localStorage.setItem( 'WalletType', 'cosmostation' );
    // @ts-expect-error
    props?.handleClickOpen();
}


    return (
        <>
    <div className="connect-wallet-modal p-5">
        <h4 className="text-center heading mb-4">Connect with  </h4>
        <div className="button-containers d-flex flex-column">
            <h4> {props.loading}</h4>
    <button className={`${isKeplrInstalled ? 'm-2 p-3 keplr' : 'm-2 p-3 wallet-disabled'}`} disabled={props.loading } onClick={connectKeplr}><img src={Keplr}/>Keplr</button> 
    <button className={`${isLeapInstalled ? 'm-2 p-3 keplr' : 'm-2 p-3 wallet-disabled disabled'}`} onClick={connectLeap}><img src={Leap}/>Leap</button>
    <button className={`${isCosmostationInstalled ? 'm-2 p-3 keplr' : 'm-2 p-3 wallet-disabled'}`} onClick={connectCosmostation} > <img src={Cosmostation}/> Cosmostation </button>
    {props.loading && <h5 className="text-center mt-2"> Connecting...</h5>}
    </div>
    </div> 
    </>
    );
    
}
