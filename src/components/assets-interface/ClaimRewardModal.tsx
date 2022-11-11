
import "./ClaimRewardModal.css";

import { claimsSelector, fetchClaims } from '../../slices/claims';
import { useDispatch, useSelector } from 'react-redux'
export default function ConnectWalletModal() {
    const {previousEpochMessages, previousEpochAssets} = useSelector(claimsSelector)
    return (
        <>
    <div className="connect-wallet-modal p-5">
        <h4 className="text-center heading mb-4">You held the below assets in the previous epoch.</h4>
        <h6 className="text-center heading mb-4"> Your participation rewards claim and validator intent is based on this holding.</h6>
        <div className="button-containers d-flex flex-column">

            
        <button> CLAIM</button>
    </div>
    </div> 
    </>
    );
    
}
