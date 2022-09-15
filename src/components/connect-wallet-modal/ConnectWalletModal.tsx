
import "./ConnectWalletModal.css";

interface PropComponent {
    handleClickOpen? : { (): void}
    loading: boolean;
    setLoading: any
  }
  

export default function ConnectWalletModal(props: PropComponent) {
    return (
        <>
    <div className="connect-wallet-modal p-5">
        <h4 className="text-center heading mb-4">Connect with  </h4>
        <div className="button-containers d-flex flex-column">
            <h4> {props.loading}</h4>
    <button className="m-2 p-3 keplr" disabled={props.loading} onClick={props.handleClickOpen}>Keplr</button> 
    <button className="m-2 p-3 cosmos-station"  disabled> Cosmos Station (coming soon) </button>
    {props.loading && <h5 className="text-center mt-2"> Connecting...</h5>}
    </div>
    </div> 
    </>
    );
    
}
