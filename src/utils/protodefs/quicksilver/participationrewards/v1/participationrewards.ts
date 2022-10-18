/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "quicksilver.participationrewards.v1";

export enum ClaimType {
  /** ClaimTypeUndefined - Undefined action (per protobuf spec) */
  ClaimTypeUndefined = 0,
  ClaimTypeLiquidToken = 1,
  ClaimTypeOsmosisPool = 2,
  ClaimTypeCrescentPool = 3,
  ClaimTypeSifchainPool = 4,
  UNRECOGNIZED = -1,
}

export function claimTypeFromJSON(object: any): ClaimType {
  switch (object) {
    case 0:
    case "ClaimTypeUndefined":
      return ClaimType.ClaimTypeUndefined;
    case 1:
    case "ClaimTypeLiquidToken":
      return ClaimType.ClaimTypeLiquidToken;
    case 2:
    case "ClaimTypeOsmosisPool":
      return ClaimType.ClaimTypeOsmosisPool;
    case 3:
    case "ClaimTypeCrescentPool":
      return ClaimType.ClaimTypeCrescentPool;
    case 4:
    case "ClaimTypeSifchainPool":
      return ClaimType.ClaimTypeSifchainPool;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ClaimType.UNRECOGNIZED;
  }
}

export function claimTypeToJSON(object: ClaimType): string {
  switch (object) {
    case ClaimType.ClaimTypeUndefined:
      return "ClaimTypeUndefined";
    case ClaimType.ClaimTypeLiquidToken:
      return "ClaimTypeLiquidToken";
    case ClaimType.ClaimTypeOsmosisPool:
      return "ClaimTypeOsmosisPool";
    case ClaimType.ClaimTypeCrescentPool:
      return "ClaimTypeCrescentPool";
    case ClaimType.ClaimTypeSifchainPool:
      return "ClaimTypeSifchainPool";
    case ClaimType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ProtocolDataType {
  /** ProtocolDataTypeUndefined - Undefined action (per protobuf spec) */
  ProtocolDataTypeUndefined = 0,
  ProtocolDataTypeConnection = 1,
  ProtocolDataTypeOsmosisParams = 2,
  ProtocolDataTypeLiquidToken = 3,
  ProtocolDataTypeOsmosisPool = 4,
  ProtocolDataTypeCrescentPool = 5,
  ProtocolDataTypeSifchainPool = 6,
  UNRECOGNIZED = -1,
}

export function protocolDataTypeFromJSON(object: any): ProtocolDataType {
  switch (object) {
    case 0:
    case "ProtocolDataTypeUndefined":
      return ProtocolDataType.ProtocolDataTypeUndefined;
    case 1:
    case "ProtocolDataTypeConnection":
      return ProtocolDataType.ProtocolDataTypeConnection;
    case 2:
    case "ProtocolDataTypeOsmosisParams":
      return ProtocolDataType.ProtocolDataTypeOsmosisParams;
    case 3:
    case "ProtocolDataTypeLiquidToken":
      return ProtocolDataType.ProtocolDataTypeLiquidToken;
    case 4:
    case "ProtocolDataTypeOsmosisPool":
      return ProtocolDataType.ProtocolDataTypeOsmosisPool;
    case 5:
    case "ProtocolDataTypeCrescentPool":
      return ProtocolDataType.ProtocolDataTypeCrescentPool;
    case 6:
    case "ProtocolDataTypeSifchainPool":
      return ProtocolDataType.ProtocolDataTypeSifchainPool;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ProtocolDataType.UNRECOGNIZED;
  }
}

export function protocolDataTypeToJSON(object: ProtocolDataType): string {
  switch (object) {
    case ProtocolDataType.ProtocolDataTypeUndefined:
      return "ProtocolDataTypeUndefined";
    case ProtocolDataType.ProtocolDataTypeConnection:
      return "ProtocolDataTypeConnection";
    case ProtocolDataType.ProtocolDataTypeOsmosisParams:
      return "ProtocolDataTypeOsmosisParams";
    case ProtocolDataType.ProtocolDataTypeLiquidToken:
      return "ProtocolDataTypeLiquidToken";
    case ProtocolDataType.ProtocolDataTypeOsmosisPool:
      return "ProtocolDataTypeOsmosisPool";
    case ProtocolDataType.ProtocolDataTypeCrescentPool:
      return "ProtocolDataTypeCrescentPool";
    case ProtocolDataType.ProtocolDataTypeSifchainPool:
      return "ProtocolDataTypeSifchainPool";
    case ProtocolDataType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * DistributionProportions defines the proportions of minted QCK that is to be
 * allocated as participation rewards.
 */
export interface DistributionProportions {
  validatorSelectionAllocation: string;
  holdingsAllocation: string;
  lockupAllocation: string;
}

/** Params holds parameters for the participationrewards module. */
export interface Params {
  /**
   * distribution_proportions defines the proportions of the minted
   * participation rewards;
   */
  distributionProportions?: DistributionProportions;
}

/** Claim define the users claim for holdings rewards for the last epoch. */
export interface Claim {
  userAddress: string;
  chainId: string;
  module: ClaimType;
  sourceChainId: string;
  amount: Long;
}

export interface KeyedProtocolData {
  key: string;
  protocolData?: ProtocolData;
}

/**
 * Protocol Data is an arbitrary data type held against a given zone for the
 * determination of rewards.
 */
export interface ProtocolData {
  type: string;
  data: Uint8Array;
}

function createBaseDistributionProportions(): DistributionProportions {
  return { validatorSelectionAllocation: "", holdingsAllocation: "", lockupAllocation: "" };
}

export const DistributionProportions = {
  encode(message: DistributionProportions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validatorSelectionAllocation !== "") {
      writer.uint32(10).string(message.validatorSelectionAllocation);
    }
    if (message.holdingsAllocation !== "") {
      writer.uint32(18).string(message.holdingsAllocation);
    }
    if (message.lockupAllocation !== "") {
      writer.uint32(26).string(message.lockupAllocation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DistributionProportions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDistributionProportions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorSelectionAllocation = reader.string();
          break;
        case 2:
          message.holdingsAllocation = reader.string();
          break;
        case 3:
          message.lockupAllocation = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DistributionProportions {
    return {
      validatorSelectionAllocation: isSet(object.validatorSelectionAllocation)
        ? String(object.validatorSelectionAllocation)
        : "",
      holdingsAllocation: isSet(object.holdingsAllocation) ? String(object.holdingsAllocation) : "",
      lockupAllocation: isSet(object.lockupAllocation) ? String(object.lockupAllocation) : "",
    };
  },

  toJSON(message: DistributionProportions): unknown {
    const obj: any = {};
    message.validatorSelectionAllocation !== undefined
      && (obj.validatorSelectionAllocation = message.validatorSelectionAllocation);
    message.holdingsAllocation !== undefined && (obj.holdingsAllocation = message.holdingsAllocation);
    message.lockupAllocation !== undefined && (obj.lockupAllocation = message.lockupAllocation);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DistributionProportions>, I>>(object: I): DistributionProportions {
    const message = createBaseDistributionProportions();
    message.validatorSelectionAllocation = object.validatorSelectionAllocation ?? "";
    message.holdingsAllocation = object.holdingsAllocation ?? "";
    message.lockupAllocation = object.lockupAllocation ?? "";
    return message;
  },
};

function createBaseParams(): Params {
  return { distributionProportions: undefined };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.distributionProportions !== undefined) {
      DistributionProportions.encode(message.distributionProportions, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.distributionProportions = DistributionProportions.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      distributionProportions: isSet(object.distributionProportions)
        ? DistributionProportions.fromJSON(object.distributionProportions)
        : undefined,
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.distributionProportions !== undefined && (obj.distributionProportions = message.distributionProportions
      ? DistributionProportions.toJSON(message.distributionProportions)
      : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.distributionProportions =
      (object.distributionProportions !== undefined && object.distributionProportions !== null)
        ? DistributionProportions.fromPartial(object.distributionProportions)
        : undefined;
    return message;
  },
};

function createBaseClaim(): Claim {
  return { userAddress: "", chainId: "", module: 0, sourceChainId: "", amount: Long.UZERO };
}

export const Claim = {
  encode(message: Claim, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userAddress !== "") {
      writer.uint32(10).string(message.userAddress);
    }
    if (message.chainId !== "") {
      writer.uint32(18).string(message.chainId);
    }
    if (message.module !== 0) {
      writer.uint32(24).int32(message.module);
    }
    if (message.sourceChainId !== "") {
      writer.uint32(34).string(message.sourceChainId);
    }
    if (!message.amount.isZero()) {
      writer.uint32(40).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Claim {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClaim();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userAddress = reader.string();
          break;
        case 2:
          message.chainId = reader.string();
          break;
        case 3:
          message.module = reader.int32() as any;
          break;
        case 4:
          message.sourceChainId = reader.string();
          break;
        case 5:
          message.amount = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Claim {
    return {
      userAddress: isSet(object.userAddress) ? String(object.userAddress) : "",
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
      module: isSet(object.module) ? claimTypeFromJSON(object.module) : 0,
      sourceChainId: isSet(object.sourceChainId) ? String(object.sourceChainId) : "",
      amount: isSet(object.amount) ? Long.fromValue(object.amount) : Long.UZERO,
    };
  },

  toJSON(message: Claim): unknown {
    const obj: any = {};
    message.userAddress !== undefined && (obj.userAddress = message.userAddress);
    message.chainId !== undefined && (obj.chainId = message.chainId);
    message.module !== undefined && (obj.module = claimTypeToJSON(message.module));
    message.sourceChainId !== undefined && (obj.sourceChainId = message.sourceChainId);
    message.amount !== undefined && (obj.amount = (message.amount || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Claim>, I>>(object: I): Claim {
    const message = createBaseClaim();
    message.userAddress = object.userAddress ?? "";
    message.chainId = object.chainId ?? "";
    message.module = object.module ?? 0;
    message.sourceChainId = object.sourceChainId ?? "";
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Long.fromValue(object.amount)
      : Long.UZERO;
    return message;
  },
};

function createBaseKeyedProtocolData(): KeyedProtocolData {
  return { key: "", protocolData: undefined };
}

export const KeyedProtocolData = {
  encode(message: KeyedProtocolData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.protocolData !== undefined) {
      ProtocolData.encode(message.protocolData, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KeyedProtocolData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeyedProtocolData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.protocolData = ProtocolData.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): KeyedProtocolData {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      protocolData: isSet(object.protocolData) ? ProtocolData.fromJSON(object.protocolData) : undefined,
    };
  },

  toJSON(message: KeyedProtocolData): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.protocolData !== undefined
      && (obj.protocolData = message.protocolData ? ProtocolData.toJSON(message.protocolData) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<KeyedProtocolData>, I>>(object: I): KeyedProtocolData {
    const message = createBaseKeyedProtocolData();
    message.key = object.key ?? "";
    message.protocolData = (object.protocolData !== undefined && object.protocolData !== null)
      ? ProtocolData.fromPartial(object.protocolData)
      : undefined;
    return message;
  },
};

function createBaseProtocolData(): ProtocolData {
  return { type: "", data: new Uint8Array() };
}

export const ProtocolData = {
  encode(message: ProtocolData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProtocolData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.string();
          break;
        case 2:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProtocolData {
    return {
      type: isSet(object.type) ? String(object.type) : "",
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
    };
  },

  toJSON(message: ProtocolData): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type);
    message.data !== undefined
      && (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProtocolData>, I>>(object: I): ProtocolData {
    const message = createBaseProtocolData();
    message.type = object.type ?? "";
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

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