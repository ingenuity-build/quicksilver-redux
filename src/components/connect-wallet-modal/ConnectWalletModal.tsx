
import "./ConnectWalletModal.css";
import { setWalletType } from '../../slices/quicksilver';
import { useDispatch} from 'react-redux'

interface PropComponent {
    handleClickOpen? : { (): void}
    loading: boolean;
    setLoading: any
  }
  

export default function ConnectWalletModal(props: PropComponent) {
    const dispatch = useDispatch();

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
    <button className="m-2 p-3 keplr" disabled={props.loading} onClick={connectKeplr}>Keplr</button> 
    <button className="m-2 p-3 cosmos-station" onClick={connectCosmostation} > Cosmostation </button>
    <button className="m-2 p-3 keplr"  onClick={connectLeap}>Leap</button> 
    {props.loading && <h5 className="text-center mt-2"> Connecting...</h5>}
    </div>
    </div> 
    </>
    );
    
}
