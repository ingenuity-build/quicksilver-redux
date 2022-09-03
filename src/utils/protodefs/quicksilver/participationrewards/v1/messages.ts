/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ProofOps } from "../../../tendermint/crypto/proof";

export const protobufPackage = "quicksilver.participationrewards.v1";

/**
 * MsgSubmitClaim represents a message type for submitting a participation
 * claim regarding the given zone (chain).
 */
export interface MsgSubmitClaim {
  userAddress: string;
  zone: string;
  proofType: Long;
  key: Uint8Array[];
  data: Uint8Array[];
  proofOps: ProofOps[];
  height: Long;
}

/** MsgSubmitClaimResponse defines the MsgSubmitClaim response type. */
export interface MsgSubmitClaimResponse {
}

function createBaseMsgSubmitClaim(): MsgSubmitClaim {
  return { userAddress: "", zone: "", proofType: Long.ZERO, key: [], data: [], proofOps: [], height: Long.ZERO };
}

export const MsgSubmitClaim = {
  encode(message: MsgSubmitClaim, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userAddress !== "") {
      writer.uint32(10).string(message.userAddress);
    }
    if (message.zone !== "") {
      writer.uint32(18).string(message.zone);
    }
    if (!message.proofType.isZero()) {
      writer.uint32(24).int64(message.proofType);
    }
    for (const v of message.key) {
      writer.uint32(34).bytes(v!);
    }
    for (const v of message.data) {
      writer.uint32(42).bytes(v!);
    }
    for (const v of message.proofOps) {
      ProofOps.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (!message.height.isZero()) {
      writer.uint32(56).int64(message.height);
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
          message.proofType = reader.int64() as Long;
          break;
        case 4:
          message.key.push(reader.bytes());
          break;
        case 5:
          message.data.push(reader.bytes());
          break;
        case 6:
          message.proofOps.push(ProofOps.decode(reader, reader.uint32()));
          break;
        case 7:
          message.height = reader.int64() as Long;
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
      proofType: isSet(object.proofType) ? Long.fromValue(object.proofType) : Long.ZERO,
      key: Array.isArray(object?.key) ? object.key.map((e: any) => bytesFromBase64(e)) : [],
      data: Array.isArray(object?.data) ? object.data.map((e: any) => bytesFromBase64(e)) : [],
      proofOps: Array.isArray(object?.proofOps) ? object.proofOps.map((e: any) => ProofOps.fromJSON(e)) : [],
      height: isSet(object.height) ? Long.fromValue(object.height) : Long.ZERO,
    };
  },

  toJSON(message: MsgSubmitClaim): unknown {
    const obj: any = {};
    message.userAddress !== undefined && (obj.userAddress = message.userAddress);
    message.zone !== undefined && (obj.zone = message.zone);
    message.proofType !== undefined && (obj.proofType = (message.proofType || Long.ZERO).toString());
    if (message.key) {
      obj.key = message.key.map((e) => base64FromBytes(e !== undefined ? e : new Uint8Array()));
    } else {
      obj.key = [];
    }
    if (message.data) {
      obj.data = message.data.map((e) => base64FromBytes(e !== undefined ? e : new Uint8Array()));
    } else {
      obj.data = [];
    }
    if (message.proofOps) {
      obj.proofOps = message.proofOps.map((e) => e ? ProofOps.toJSON(e) : undefined);
    } else {
      obj.proofOps = [];
    }
    message.height !== undefined && (obj.height = (message.height || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSubmitClaim>, I>>(object: I): MsgSubmitClaim {
    const message = createBaseMsgSubmitClaim();
    message.userAddress = object.userAddress ?? "";
    message.zone = object.zone ?? "";
    message.proofType = (object.proofType !== undefined && object.proofType !== null)
      ? Long.fromValue(object.proofType)
      : Long.ZERO;
    message.key = object.key?.map((e) => e) || [];
    message.data = object.data?.map((e) => e) || [];
    message.proofOps = object.proofOps?.map((e) => ProofOps.fromPartial(e)) || [];
    message.height = (object.height !== undefined && object.height !== null)
      ? Long.fromValue(object.height)
      : Long.ZERO;
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
