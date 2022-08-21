/* eslint-disable */
import { AminoConverter , AminoTypes, AminoConverters, defaultRegistryTypes, SigningStargateClientOptions, createAuthzAminoConverters, createBankAminoConverters , createDistributionAminoConverters, createGovAminoConverters, createStakingAminoConverters, createIbcAminoConverters, createFreegrantAminoConverters, } from "@cosmjs/stargate";
import { AminoMsg, Coin } from "@cosmjs/amino";
import { GeneratedType, Registry} from "@cosmjs/proto-signing";


import * as _m0 from "protobufjs/minimal";


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
      ...createFreegrantAminoConverters(),
      ...createLiquidStakingTypes()
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
   
    ["/cosmos.staking.v1beta1.MsgTokenizeShares", MsgTokenizeShares],
    
   ...defaultRegistryTypes
 ];

 export const options = { registry : new Registry(customTypes), aminoTypes : new AminoTypes(createCustomTypes("cosmos")) }
