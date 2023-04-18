import "./ClaimRewardModal.css";
import React, {useEffect, useState} from 'react';
import { claimsSelector, fetchClaims } from '../../slices/claims';
import { useDispatch, useSelector } from 'react-redux'
import QuicksilverLogo from '../../assets/quicksilver-logo.png';
import qStar from '../../assets/qStar.png';
import qAtom from '../../assets/qAtom.png';
import {quicksilverSelector} from '../../slices/quicksilver';
export default function ConnectWalletModal() {
    const {previousEpochMessages, previousEpochAssets} = useSelector(claimsSelector)
    const {balances, isQSWalletConnected, quicksilverClient, quicksilverAddress} = useSelector(quicksilverSelector);
    const [claimAssets, setClaimAssets] = useState({});
    useEffect(() => {
        if(previousEpochAssets) {
        let obj = {}
        let values = Object.values(previousEpochAssets);
        values.forEach((asset:any) => {

          asset.forEach((asset1: any) => {
            asset1["Amount"].forEach((asset2: any) => {
            obj[asset2.denom] = (obj[asset2.denom] || 0 ) + parseInt(asset2.amount)
            })

          })
        })
        setClaimAssets(obj);
        }
    }, [previousEpochAssets])

    const onClaimsClick = async (e: any) => {

        if (previousEpochMessages.length == 0) {
          alert("nope!")
          return
        }

        let msg = [];
        // @ts-ignore
          // msg = messages.map((message: any) => { return {
          //   typeUrl: "/quicksilver.participationrewards.v1.MsgSubmitClaim",
          //   value: message}
          // });

          //msg = messages.map((message: quicksilver.participationrewards.v1.MsgSubmitClaim) => { return submitClaim({claimType: message.claim_type, Proofs: message.proofs, SrcZone: message.src_zone, UserAddres: message.user_address, Zone: message.zone}) })
          msg = previousEpochMessages.map((message: quicksilver.participationrewards.v1.MsgSubmitClaim) => { return {
          typeUrl: "/quicksilver.participationrewards.v1.MsgSubmitClaim",
          value: {
            userAddress: message.user_address,
            zone: message.zone,
            srcZone: message.src_zone,
            claimType: message.claim_type,
            proofs: message.proofs.map((proof: any) => {
              return {
                  key: proof.key,
                  data: proof.data,
                  proofOps: proof.proof_ops,
                  proofType: proof.proof_type,
                  height: proof.height,
              }
            })
                  }}
                });


        // const msgAny = {
        //     typeUrl: "/quicksilver.participationrewards.v1.MsgSubmitClaim",
        //   value: messages.map((e: any) => 
        // }

        try {

       const broadcastResult = await quicksilverClient.signAndBroadcast(
        quicksilverAddress,
          [...msg],
         {
            "gas": (previousEpochMessages.length * 50000).toString(),
            "amount": [
              {
                "denom": "uqck",
                "amount": "300"
              }
            ]
          },
          'Claims Transaction'
        );  
        console.log(broadcastResult);
        if(broadcastResult.code === 0 ) {
          
        }
    } catch(err: any) {

      console.log(err);

    }
    }
    return (
        <>
    <div className="connect-wallet-modal p-5">
        <h4 className="text-center heading mb-4">You held the below assets in the previous epoch.</h4>
        <h6 className="text-center heading mb-4"> Your participation rewards claim and validator intent is based on this holding.</h6>
        <div className="button-containers d-flex flex-column">

        {Object.keys(claimAssets).map((key, i) => (
          <p key={i}>
            <span>{key} :  {+(claimAssets[key]/1000000).toFixed(2)} </span>
          </p>
        )
        )}


        <button onClick={onClaimsClick}> CLAIM</button>
    </div>
    </div> 
    </>
    );

}