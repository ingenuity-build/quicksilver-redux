/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ProofOps } from "../../../tendermint/crypto/proof";
import { ClaimType, claimTypeFromJSON, claimTypeToJSON } from "./participationrewards";

export const protobufPackage = "quicksilver.participationrewards.v1";

/**
 * MsgSubmitClaim represents a message type for submitting a participation
 * claim regarding the given zone (chain).
 */
export interface MsgSubmitClaim {
  userAddress: string;
  zone: string;
  srcZone: string;
  claimType: ClaimType;
  proofs: Proof[];
}

/** MsgSubmitClaimResponse defines the MsgSubmitClaim response type. */
export interface MsgSubmitClaimResponse {
}

/** Proof defines a type used to cryptographically prove a claim. */
export interface Proof {
  key: Uint8Array;
  data: Uint8Array;
  proofOps?: ProofOps;
  height: Long;
  proofType: string;
}

function createBaseMsgSubmitClaim(): MsgSubmitClaim {
  return { userAddress: "", zone: "", srcZone: "", claimType: 0, proofs: [] };
}

export const MsgSubmitClaim = {
  encode(message: MsgSubmitClaim, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userAddress !== "") {
      writer.uint32(10).string(message.userAddress);
    }
    if (message.zone !== "") {
      writer.uint32(18).string(message.zone);
    }
    if (message.srcZone !== "") {
      writer.uint32(26).string(message.srcZone);
    }
    if (message.claimType !== 0) {
      writer.uint32(32).int32(message.claimType);
    }
    for (const v of message.proofs) {
      Proof.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitClaim {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitClaim();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userAddress = reader.string();
          break;
        case 2:
          message.zone = reader.string();
          break;
        case 3:
          message.srcZone = reader.string();
          break;
        case 4:
          message.claimType = reader.int32() as any;
          break;
        case 5:
          message.proofs.push(Proof.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSubmitClaim {
    return {
      userAddress: isSet(object.userAddress) ? String(object.userAddress) : "",
      zone: isSet(object.zone) ? String(object.zone) : "",
      srcZone: isSet(object.srcZone) ? String(object.srcZone) : "",
      claimType: isSet(object.claimType) ? claimTypeFromJSON(object.claimType) : 0,
      proofs: Array.isArray(object?.proofs) ? object.proofs.map((e: any) => Proof.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgSubmitClaim): unknown {
    const obj: any = {};
    message.userAddress !== undefined && (obj.userAddress = message.userAddress);
    message.zone !== undefined && (obj.zone = message.zone);
    message.srcZone !== undefined && (obj.srcZone = message.srcZone);
    message.claimType !== undefined && (obj.claimType = claimTypeToJSON(message.claimType));
    if (message.proofs) {
      obj.proofs = message.proofs.map((e) => e ? Proof.toJSON(e) : undefined);
    } else {
      obj.proofs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSubmitClaim>, I>>(object: I): MsgSubmitClaim {
    const message = createBaseMsgSubmitClaim();
    message.userAddress = object.userAddress ?? "";
    message.zone = object.zone ?? "";
    message.srcZone = object.srcZone ?? "";
    message.claimType = object.claimType ?? 0;
    message.proofs = object.proofs?.map((e) => Proof.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgSubmitClaimResponse(): MsgSubmitClaimResponse {
  return {};
}

export const MsgSubmitClaimResponse = {
  encode(_: MsgSubmitClaimResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitClaimResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitClaimResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgSubmitClaimResponse {
    return {};
  },

  toJSON(_: MsgSubmitClaimResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSubmitClaimResponse>, I>>(_: I): MsgSubmitClaimResponse {
    const message = createBaseMsgSubmitClaimResponse();
    return message;
  },
};

function createBaseProof(): Proof {
  return { key: new Uint8Array(), data: new Uint8Array(), proofOps: undefined, height: Long.ZERO, proofType: "" };
}

export const Proof = {
  encode(message: Proof, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key.length !== 0) {
      writer.uint32(10).bytes(message.key);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    if (message.proofOps !== undefined) {
      ProofOps.encode(message.proofOps, writer.uint32(26).fork()).ldelim();
    }
    if (!message.height.isZero()) {
      writer.uint32(32).int64(message.height);
    }
    if (message.proofType !== "") {
      writer.uint32(42).string(message.proofType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Proof {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProof();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.bytes();
          break;
        case 2:
          message.data = reader.bytes();
          break;
        case 3:
          message.proofOps = ProofOps.decode(reader, reader.uint32());
          break;
        case 4:
          message.height = reader.int64() as Long;
          break;
        case 5:
          message.proofType = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Proof {
    return {
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(),
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
      proofOps: isSet(object.proofOps) ? ProofOps.fromJSON(object.proofOps) : undefined,
      height: isSet(object.height) ? Long.fromValue(object.height) : Long.ZERO,
      proofType: isSet(object.proofType) ? String(object.proofType) : "",
    };
  },

  toJSON(message: Proof): unknown {
    const obj: any = {};
    message.key !== undefined
      && (obj.key = base64FromBytes(message.key !== undefined ? message.key : new Uint8Array()));
    message.data !== undefined
      && (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    message.proofOps !== undefined && (obj.proofOps = message.proofOps ? ProofOps.toJSON(message.proofOps) : undefined);
    message.height !== undefined && (obj.height = (message.height || Long.ZERO).toString());
    message.proofType !== undefined && (obj.proofType = message.proofType);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Proof>, I>>(object: I): Proof {
    const message = createBaseProof();
    message.key = object.key ?? new Uint8Array();
    message.data = object.data ?? new Uint8Array();
    message.proofOps = (object.proofOps !== undefined && object.proofOps !== null)
      ? ProofOps.fromPartial(object.proofOps)
      : undefined;
    message.height = (object.height !== undefined && object.height !== null)
      ? Long.fromValue(object.height)
      : Long.ZERO;
    message.proofType = object.proofType ?? "";
    return message;
  },
};

/** Msg defines the participationrewards Msg service. */
export interface Msg {
  SubmitClaim(request: MsgSubmitClaim): Promise<MsgSubmitClaimResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.SubmitClaim = this.SubmitClaim.bind(this);
  }
  SubmitClaim(request: MsgSubmitClaim): Promise<MsgSubmitClaimResponse> {
    const data = MsgSubmitClaim.encode(request).finish();
    const promise = this.rpc.request("quicksilver.participationrewards.v1.Msg", "SubmitClaim", data);
    return promise.then((data) => MsgSubmitClaimResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}