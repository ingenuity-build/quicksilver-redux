/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ProofOps } from "../../../tendermint/crypto/proof";

export const protobufPackage = "quicksilver.airdrop.v1";

export interface MsgClaim {
  chainId: string;
  action: Long;
  address: string;
  proofs: Proof[];
}

export interface MsgClaimResponse {
  amount: Long;
}

export interface Proof {
  key: Uint8Array;
  data: Uint8Array;
  proofOps?: ProofOps;
  height: Long;
}

function createBaseMsgClaim(): MsgClaim {
  return { chainId: "", action: Long.ZERO, address: "", proofs: [] };
}

export const MsgClaim = {
  encode(message: MsgClaim, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (!message.action.isZero()) {
      writer.uint32(16).int64(message.action);
    }
    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }
    for (const v of message.proofs) {
      Proof.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaim {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaim();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.action = reader.int64() as Long;
          break;
        case 3:
          message.address = reader.string();
          break;
        case 4:
          message.proofs.push(Proof.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClaim {
    return {
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
      action: isSet(object.action) ? Long.fromValue(object.action) : Long.ZERO,
      address: isSet(object.address) ? String(object.address) : "",
      proofs: Array.isArray(object?.proofs) ? object.proofs.map((e: any) => Proof.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgClaim): unknown {
    const obj: any = {};
    message.chainId !== undefined && (obj.chainId = message.chainId);
    message.action !== undefined && (obj.action = (message.action || Long.ZERO).toString());
    message.address !== undefined && (obj.address = message.address);
    if (message.proofs) {
      obj.proofs = message.proofs.map((e) => e ? Proof.toJSON(e) : undefined);
    } else {
      obj.proofs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgClaim>, I>>(object: I): MsgClaim {
    const message = createBaseMsgClaim();
    message.chainId = object.chainId ?? "";
    message.action = (object.action !== undefined && object.action !== null)
      ? Long.fromValue(object.action)
      : Long.ZERO;
    message.address = object.address ?? "";
    message.proofs = object.proofs?.map((e) => Proof.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgClaimResponse(): MsgClaimResponse {
  return { amount: Long.UZERO };
}

export const MsgClaimResponse = {
  encode(message: MsgClaimResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.amount.isZero()) {
      writer.uint32(8).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaimResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClaimResponse {
    return { amount: isSet(object.amount) ? Long.fromValue(object.amount) : Long.UZERO };
  },

  toJSON(message: MsgClaimResponse): unknown {
    const obj: any = {};
    message.amount !== undefined && (obj.amount = (message.amount || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgClaimResponse>, I>>(object: I): MsgClaimResponse {
    const message = createBaseMsgClaimResponse();
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Long.fromValue(object.amount)
      : Long.UZERO;
    return message;
  },
};

function createBaseProof(): Proof {
  return { key: new Uint8Array(), data: new Uint8Array(), proofOps: undefined, height: Long.ZERO };
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
    return message;
  },
};

/** Msg defines the airdrop Msg service. */
export interface Msg {
  Claim(request: MsgClaim): Promise<MsgClaimResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Claim = this.Claim.bind(this);
  }
  Claim(request: MsgClaim): Promise<MsgClaimResponse> {
    const data = MsgClaim.encode(request).finish();
    const promise = this.rpc.request("quicksilver.airdrop.v1.Msg", "Claim", data);
    return promise.then((data) => MsgClaimResponse.decode(new _m0.Reader(data)));
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
