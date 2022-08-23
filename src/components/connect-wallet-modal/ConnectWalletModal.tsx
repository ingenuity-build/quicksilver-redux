
import "./ConnectWalletModal.css";

interface PropComponent {
    handleClickOpen? : { (): void}
  }
  

export default function ConnectWalletModal(props: PropComponent) {
    return (
        <>
    <div className="connect-wallet-modal p-5">
        <h4 className="text-center heading mb-4">Connect with  </h4>
        <div className="button-containers d-flex flex-column">
    <button className="m-2 p-3 keplr" onClick={props.handleClickOpen}>Keplr</button> 
    <button className="m-2 p-3 cosmos-station"  disabled> Cosmos Station (coming soon) </button>
    </div>
    </div> 
    </>
    );
    
}
