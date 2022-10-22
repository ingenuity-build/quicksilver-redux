/* eslint-disable */
import { AminoConverter , AminoTypes, AminoConverters, defaultRegistryTypes, SigningStargateClientOptions, createAuthzAminoConverters, createBankAminoConverters , createDistributionAminoConverters, createGovAminoConverters, createStakingAminoConverters, createIbcAminoConverters, createFeegrantAminoConverters, } from "@ingenuity/quicksilverjs/node_modules/@cosmjs/stargate";
import { AminoMsg, Coin } from "@ingenuity/quicksilverjs/node_modules/@cosmjs/amino";
import { GeneratedType, Registry} from "@ingenuity/quicksilverjs/node_modules/@cosmjs/proto-signing";
import { MsgRequestRedemption } from "./protodefs/quicksilver/interchainstaking/v1/messages"
import { MsgClaim, Proof } from "./protodefs/quicksilver/airdrop/v1/messages"
import { MsgSubmitClaim, ClaimProof } from "@ingenuity/quicksilverjs/src/codegen/quicksilver/participationrewards/v1/messages";


import { ClaimType} from "../../src/utils/protodefs/quicksilver/claimsmanager/v1/claimsmanager"

import * as _m0 from "protobufjs/minimal";
import Long from "long";

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;
  export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
  function isSet(value: any): boolean { 
    return value !== null && value !== undefined;
  }
  export const Coin1 = {
    encode(message: Coin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
      if (message.denom !== "") {
        writer.uint32(10).string(message.denom);
      }
      if (message.amount !== "") {
        writer.uint32(18).string(message.amount);
      }
      return writer;
    },
  
    decode(input: _m0.Reader | Uint8Array, length?: number): Coin {
      const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
      let end = length === undefined ? reader.len : reader.pos + length;
      let denom = ""
      let amount = "0"
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            denom = reader.string();
            break;
          case 2:
            amount = reader.string();
            break;
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return createBaseCoinFrom(denom, amount);
    },
  
    fromJSON(object: any): Coin {
      return {
        denom: isSet(object.denom) ? String(object.denom) : "",
        amount: isSet(object.amount) ? String(object.amount) : "",
      };
    },
  
    toJSON(message: Coin): unknown {
      const obj: any = {};
      message.denom !== undefined && (obj.denom = message.denom);
      message.amount !== undefined && (obj.amount = message.amount);
      return obj;
    },
  
    fromPartial<I extends Exact<DeepPartial<Coin>, I>>(object: I): Coin {
      return createBaseCoinFrom(object.denom ?? "", object.amount ?? "");
    },
  };
  
  function createBaseCoin(): Coin {
    return { denom: "", amount: "" };
  }
  function createBaseCoinFrom(denom: string, amount: string): Coin {
    return { denom: denom, amount: amount };
  }
export function createLiquidStakingTypes(): Record<string, AminoConverter | "not_supported_by_chain"> {
    return {
      "/cosmos.staking.v1beta1.MsgTokenizeShares": {
        aminoType: "cosmos-sdk/MsgTokenizeShares",
        toAmino: ({
          delegatorAddress,
          validatorAddress,
          amount,
          tokenizedShareOwner,
        }: MsgTokenizeShares): AminoMsgTokenizeShares["value"] => {
            // assertDefinedAndNotNull(amount, "missing amount");
          return {
            delegator_address: delegatorAddress,
            validator_address: validatorAddress,
            amount: amount,
            tokenized_share_owner: tokenizedShareOwner,
          };
        },
        fromAmino: ({
          delegator_address,
          validator_address,
          amount,
          tokenized_share_owner,
        }: AminoMsgTokenizeShares["value"]): MsgTokenizeShares => ({
          delegatorAddress: delegator_address,
          validatorAddress: validator_address,
          amount: amount,
          tokenizedShareOwner: tokenized_share_owner,
        }),
      }
    }
  }
  export function createMsgRequestRedemptions(): Record<string, AminoConverter | "not_supported_by_chain"> {
    return {
      "/quicksilver.interchainstaking.v1.MsgRequestRedemption": {
        aminoType: "quicksilver/MsgRequestRedemption",
        toAmino: ({
          destinationAddress,
          fromAddress,
          value,
        }: MsgRequestRedemption): AminoMsgRequestRedemption["value"] => {
          return {
            destination_address: destinationAddress,
            from_address: fromAddress,
            value: value,
          };
        },
        fromAmino: ({
          destination_address,
          from_address,
          value,
        }: AminoMsgRequestRedemption["value"]): MsgRequestRedemption => ({
          destinationAddress: destination_address,
          fromAddress: from_address,
          value: value,
        }),
      }
    }
  }
  export function createMsgSubmitClaim(): Record<string, AminoConverter | "not_supported_by_chain"> {
    return {
      "/quicksilver.participationrewards.v1.MsgSubmitClaim": {
        aminoType: "quicksilver/MsgSubmitClaim",
        toAmino: ({
          userAddress,
          zone,
          srcZone,
          claimType,
          proofs
        }: MsgSubmitClaim): AminoMsgSubmitClaim["value"] => {
          return {
           user_address: userAddress,
            zone: zone,
            src_zone: srcZone,
            claim_type: claimType,
            proofs: proofs
          };
        },
        fromAmino: ({
          user_address,
          zone,
          src_zone,
          claim_type,
          proofs
        }: AminoMsgSubmitClaim["value"]): MsgSubmitClaim => ({
          userAddress: user_address,
          zone: zone,
          srcZone: src_zone,
          claimType: claim_type,
          proofs: proofs
        }),
      }
    }
  }
  /**
   * 
  // Initial claim action
  ActionInitialClaim = 0;
  // Deposit tier 1 (e.g. > 5% of base_value)
  ActionDepositT1 = 1;
  // Deposit tier 2 (e.g. > 10% of base_value)
  ActionDepositT2 = 2;
  // Deposit tier 3 (e.g. > 15% of base_value)
  ActionDepositT3 = 3;
  // Deposit tier 4 (e.g. > 22% of base_value)
  ActionDepositT4 = 4;
  // Deposit tier 5 (e.g. > 30% of base_value)
  ActionDepositT5 = 5;
  // Active QCK delegation
  ActionStakeQCK = 6;
  // Intent is set
  ActionSignalIntent = 7;
  // Cast governance vote on QS
  ActionQSGov = 8;
  // Governance By Proxy (GbP): cast vote on remote zone
  ActionGbP = 9;
  // Provide liquidity on Osmosis
  ActionOsmosis = 10;
   */
  
  export function createMsgClaim(): Record<string, AminoConverter | "not_supported_by_chain"> {
    return {
      "/quicksilver.airdrop.v1.MsgClaim": {
        aminoType: "quicksilver/MsgClaim",
        toAmino: ({
          chainId,
          address,
          action,
          proofs,
        }: MsgClaim): AminoMsgClaim["value"] => {
          return {
            chain_id: chainId,
            address: address,
            action: action.toString(),
            proofs: proofs,
          };
        },
        fromAmino: ({
          chain_id,
          address,
          action,
          proofs,
        }: AminoMsgClaim["value"]): MsgClaim => ({
          chainId: chain_id,
          address: address,
          action: new Long(parseInt(action)),
          proofs: proofs,
        }),
      }
    }
  }
  
  export interface AminoMsgTokenizeShares extends AminoMsg {
    readonly type: "cosmos-sdk/MsgTokenizeShares";
    readonly value: {
      /** Bech32 encoded delegator address */
      readonly delegator_address: string;
      /** Bech32 encoded validator address */
      readonly validator_address: string;
      readonly amount: Coin | undefined;
      readonly tokenized_share_owner: string;
    };
  }
  
  export interface AminoMsgRequestRedemption extends AminoMsg {
    readonly type: "quicksilver/MsgRequestRedemption";
    readonly value: {
      /** Bech32 encoded delegator address */
      readonly destination_address: string;
      /** Bech32 encoded validator address */
      readonly from_address: string;
      readonly value: Coin | undefined;
    };
  }
  export interface AminoMsgSubmitClaim extends AminoMsg {
    readonly type: "quicksilver/MsgSubmitClaim";
    readonly value: {
      readonly user_address: string;
      readonly zone: string;
      readonly src_zone: string;
      readonly claim_type: ClaimType;
      readonly proofs: ClaimProof[]
    }
  }
  export interface AminoMsgClaim extends AminoMsg {
    readonly type: "quicksilver/MsgClaim";
    readonly value: {
      readonly chain_id: string;
      /** Bech32 encoded validator address */
      readonly address: string;
      readonly action: string;
      readonly proofs: Proof[];
    };
  }
  export interface MsgTokenizeShares {
    delegatorAddress: string;
    validatorAddress: string;
    amount?: Coin;
    tokenizedShareOwner: string;
  }
  
  
  
  function createCustomTypes(prefix: string): AminoConverters {
    return {
      ...createAuthzAminoConverters(),
      ...createBankAminoConverters(),
      ...createDistributionAminoConverters(),
      ...createGovAminoConverters(),
      ...createStakingAminoConverters(prefix),
      ...createIbcAminoConverters(),
      ...createFeegrantAminoConverters(),
      ...createLiquidStakingTypes(),
      ...createMsgRequestRedemptions(),
      ...createMsgClaim(),
      ...createMsgSubmitClaim()
    };
  }
   
  function createBaseMsgTokenizeShares(): MsgTokenizeShares {
    return { delegatorAddress: "", validatorAddress: "", amount: undefined, "tokenizedShareOwner": "" };
  }
  
  export const MsgTokenizeShares = {
    encode(message: MsgTokenizeShares, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
      if (message.delegatorAddress !== "") {
        writer.uint32(10).string(message.delegatorAddress);
      }
      if (message.validatorAddress !== "") {
        writer.uint32(18).string(message.validatorAddress);
      }
      if (message.amount !== undefined) {
        Coin1.encode(message.amount, writer.uint32(26).fork()).ldelim();
      }
      if (message.tokenizedShareOwner !== "") {
        writer.uint32(34).string(message.tokenizedShareOwner);
      }
      return writer;
    },
  
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgTokenizeShares {
      const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
      let end = length === undefined ? reader.len : reader.pos + length;
      const message = createBaseMsgTokenizeShares();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.delegatorAddress = reader.string();
            break;
          case 2:
            message.validatorAddress = reader.string();
            break;
          case 3:
            message.amount = Coin1.decode(reader, reader.uint32());
            break;
          case 4:
            message.tokenizedShareOwner = reader.string();
            break;
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    },
  
    fromJSON(object: any): MsgTokenizeShares {
      return {
        delegatorAddress: isSet(object.delegatorAddress) ? String(object.delegatorAddress) : "",
        validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : "",
        amount: isSet(object.amount) ? Coin1.fromJSON(object.amount) : undefined,
        tokenizedShareOwner: isSet(object.tokenizedShareOwner) ? String(object.tokenizedShareOwner) : "",
      };
    },
  
    toJSON(message: MsgTokenizeShares): unknown {
      const obj: any = {};
      message.delegatorAddress !== undefined && (obj.delegatorAddress = message.delegatorAddress);
      message.validatorAddress !== undefined && (obj.validatorAddress = message.validatorAddress);
      message.amount !== undefined && (obj.amount = message.amount ? Coin1.toJSON(message.amount) : undefined);
      message.tokenizedShareOwner !== undefined && (obj.tokenizedShareOwner = message.tokenizedShareOwner);
      return obj;
    },
  
    fromPartial<I extends Exact<DeepPartial<MsgTokenizeShares>, I>>(object: I): MsgTokenizeShares {
      const message = createBaseMsgTokenizeShares();
      message.delegatorAddress = object.delegatorAddress ?? "";
      message.validatorAddress = object.validatorAddress ?? "";
      message.amount =
        object.amount !== undefined && object.amount !== null ? Coin1.fromPartial(object.amount) : undefined;
      message.tokenizedShareOwner = object.tokenizedShareOwner ?? "";
      return message;
    },
  };
  export const customTypes: ReadonlyArray<[string, GeneratedType]> = [
    ["/quicksilver.interchainstaking.v1.MsgRequestRedemption", MsgRequestRedemption],
    ["/cosmos.staking.v1beta1.MsgTokenizeShares", MsgTokenizeShares],
    ["/quicksilver.airdrop.v1.MsgClaim", MsgClaim],
    ["/quicksilver.participationrewards.v1.MsgSubmitClaim", MsgSubmitClaim],
    
   ...defaultRegistryTypes
 ];
 export const options = { registry : new Registry(customTypes), aminoTypes : new AminoTypes(createCustomTypes("cosmos")) }