/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Timestamp } from "../../../google/protobuf/timestamp";

export const protobufPackage = "quicksilver.interchainstaking.v1";

export interface Zone {
  connectionId: string;
  chainId: string;
  depositAddress?: ICAAccount;
  withdrawalAddress?: ICAAccount;
  performanceAddress?: ICAAccount;
  delegationAddresses: ICAAccount[];
  accountPrefix: string;
  localDenom: string;
  baseDenom: string;
  redemptionRate: string;
  lastRedemptionRate: string;
  validators: Validator[];
  aggregateIntent: { [key: string]: ValidatorIntent };
  multiSend: boolean;
  liquidityModule: boolean;
  withdrawalWaitgroup: number;
  ibcNextValidatorsHash: Uint8Array;
  validatorSelectionAllocation: Coin[];
  holdingsAllocation: Coin[];
  lastEpochHeight: Long;
}

export interface Zone_AggregateIntentEntry {
  key: string;
  value?: ValidatorIntent;
}

export interface ICAAccount {
  address: string;
  /** balance defines the different coins this balance holds. */
  balance: Coin[];
  portName: string;
  withdrawalAddress: string;
  balanceWaitgroup: number;
}

export interface WithdrawalRecord {
  chainId: string;
  delegator: string;
  validator: string;
  recipient: string;
  amount?: Coin;
  burnAmount?: Coin;
  txhash: string;
  status: number;
  completionTime?: Date;
}

export interface TransferRecord {
  sender: string;
  recipient: string;
  amount?: Coin;
}

export interface Validator {
  valoperAddress: string;
  commissionRate: string;
  delegatorShares: string;
  votingPower: string;
  score: string;
}

export interface DelegatorIntent {
  delegator: string;
  intents: ValidatorIntent[];
}

export interface ValidatorIntent {
  valoperAddress: string;
  weight: string;
}

export interface Delegation {
  delegationAddress: string;
  validatorAddress: string;
  amount?: Coin;
  height: Long;
  redelegationEnd: Long;
}

export interface PortConnectionTuple {
  connectionId: string;
  portId: string;
}

export interface Receipt {
  chainId: string;
  sender: string;
  txhash: string;
  amount: Coin[];
}

export interface DelegationPlan {
  validatorAddress: string;
  delegatorAddress: string;
  value: Coin[];
}

export interface Params {
  delegationAccountCount: Long;
  depositInterval: Long;
  validatorsetInterval: Long;
  commissionRate: string;
}

export interface DelegationsForZone {
  chainId: string;
  delegations: Delegation[];
}

export interface DelegationPlansForZone {
  chainId: string;
  delegationPlans: { [key: string]: DelegationPlan };
}

export interface DelegationPlansForZone_DelegationPlansEntry {
  key: string;
  value?: DelegationPlan;
}

export interface DelegatorIntentsForZone {
  chainId: string;
  delegationIntent: DelegatorIntent[];
  snapshot: boolean;
}

/** GenesisState defines the interchainstaking module's genesis state. */
export interface GenesisState {
  params?: Params;
  zones: Zone[];
  receipts: Receipt[];
  delegations: DelegationsForZone[];
  delegationPlans: DelegationPlansForZone[];
  delegatorIntents: DelegatorIntentsForZone[];
  portConnections: PortConnectionTuple[];
}

function createBaseZone(): Zone {
  return {
    connectionId: "",
    chainId: "",
    depositAddress: undefined,
    withdrawalAddress: undefined,
    performanceAddress: undefined,
    delegationAddresses: [],
    accountPrefix: "",
    localDenom: "",
    baseDenom: "",
    redemptionRate: "",
    lastRedemptionRate: "",
    validators: [],
    aggregateIntent: {},
    multiSend: false,
    liquidityModule: false,
    withdrawalWaitgroup: 0,
    ibcNextValidatorsHash: new Uint8Array(),
    validatorSelectionAllocation: [],
    holdingsAllocation: [],
    lastEpochHeight: Long.ZERO,
  };
}

export const Zone = {
  encode(message: Zone, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.connectionId !== "") {
      writer.uint32(10).string(message.connectionId);
    }
    if (message.chainId !== "") {
      writer.uint32(18).string(message.chainId);
    }
    if (message.depositAddress !== undefined) {
      ICAAccount.encode(message.depositAddress, writer.uint32(26).fork()).ldelim();
    }
    if (message.withdrawalAddress !== undefined) {
      ICAAccount.encode(message.withdrawalAddress, writer.uint32(34).fork()).ldelim();
    }
    if (message.performanceAddress !== undefined) {
      ICAAccount.encode(message.performanceAddress, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.delegationAddresses) {
      ICAAccount.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.accountPrefix !== "") {
      writer.uint32(58).string(message.accountPrefix);
    }
    if (message.localDenom !== "") {
      writer.uint32(66).string(message.localDenom);
    }
    if (message.baseDenom !== "") {
      writer.uint32(74).string(message.baseDenom);
    }
    if (message.redemptionRate !== "") {
      writer.uint32(82).string(message.redemptionRate);
    }
    if (message.lastRedemptionRate !== "") {
      writer.uint32(90).string(message.lastRedemptionRate);
    }
    for (const v of message.validators) {
      Validator.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    Object.entries(message.aggregateIntent).forEach(([key, value]) => {
      Zone_AggregateIntentEntry.encode({ key: key as any, value }, writer.uint32(106).fork()).ldelim();
    });
    if (message.multiSend === true) {
      writer.uint32(112).bool(message.multiSend);
    }
    if (message.liquidityModule === true) {
      writer.uint32(120).bool(message.liquidityModule);
    }
    if (message.withdrawalWaitgroup !== 0) {
      writer.uint32(128).uint32(message.withdrawalWaitgroup);
    }
    if (message.ibcNextValidatorsHash.length !== 0) {
      writer.uint32(138).bytes(message.ibcNextValidatorsHash);
    }
    for (const v of message.validatorSelectionAllocation) {
      Coin.encode(v!, writer.uint32(146).fork()).ldelim();
    }
    for (const v of message.holdingsAllocation) {
      Coin.encode(v!, writer.uint32(154).fork()).ldelim();
    }
    if (!message.lastEpochHeight.isZero()) {
      writer.uint32(160).int64(message.lastEpochHeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Zone {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseZone();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connectionId = reader.string();
          break;
        case 2:
          message.chainId = reader.string();
          break;
        case 3:
          message.depositAddress = ICAAccount.decode(reader, reader.uint32());
          break;
        case 4:
          message.withdrawalAddress = ICAAccount.decode(reader, reader.uint32());
          break;
        case 5:
          message.performanceAddress = ICAAccount.decode(reader, reader.uint32());
          break;
        case 6:
          message.delegationAddresses.push(ICAAccount.decode(reader, reader.uint32()));
          break;
        case 7:
          message.accountPrefix = reader.string();
          break;
        case 8:
          message.localDenom = reader.string();
          break;
        case 9:
          message.baseDenom = reader.string();
          break;
        case 10:
          message.redemptionRate = reader.string();
          break;
        case 11:
          message.lastRedemptionRate = reader.string();
          break;
        case 12:
          message.validators.push(Validator.decode(reader, reader.uint32()));
          break;
        case 13:
          const entry13 = Zone_AggregateIntentEntry.decode(reader, reader.uint32());
          if (entry13.value !== undefined) {
            message.aggregateIntent[entry13.key] = entry13.value;
          }
          break;
        case 14:
          message.multiSend = reader.bool();
          break;
        case 15:
          message.liquidityModule = reader.bool();
          break;
        case 16:
          message.withdrawalWaitgroup = reader.uint32();
          break;
        case 17:
          message.ibcNextValidatorsHash = reader.bytes();
          break;
        case 18:
          message.validatorSelectionAllocation.push(Coin.decode(reader, reader.uint32()));
          break;
        case 19:
          message.holdingsAllocation.push(Coin.decode(reader, reader.uint32()));
          break;
        case 20:
          message.lastEpochHeight = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Zone {
    return {
      connectionId: isSet(object.connectionId) ? String(object.connectionId) : "",
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
      depositAddress: isSet(object.depositAddress) ? ICAAccount.fromJSON(object.depositAddress) : undefined,
      withdrawalAddress: isSet(object.withdrawalAddress) ? ICAAccount.fromJSON(object.withdrawalAddress) : undefined,
      performanceAddress: isSet(object.performanceAddress) ? ICAAccount.fromJSON(object.performanceAddress) : undefined,
      delegationAddresses: Array.isArray(object?.delegationAddresses)
        ? object.delegationAddresses.map((e: any) => ICAAccount.fromJSON(e))
        : [],
      accountPrefix: isSet(object.accountPrefix) ? String(object.accountPrefix) : "",
      localDenom: isSet(object.localDenom) ? String(object.localDenom) : "",
      baseDenom: isSet(object.baseDenom) ? String(object.baseDenom) : "",
      redemptionRate: isSet(object.redemptionRate) ? String(object.redemptionRate) : "",
      lastRedemptionRate: isSet(object.lastRedemptionRate) ? String(object.lastRedemptionRate) : "",
      validators: Array.isArray(object?.validators) ? object.validators.map((e: any) => Validator.fromJSON(e)) : [],
      aggregateIntent: isObject(object.aggregateIntent)
        ? Object.entries(object.aggregateIntent).reduce<{ [key: string]: ValidatorIntent }>((acc, [key, value]) => {
          acc[key] = ValidatorIntent.fromJSON(value);
          return acc;
        }, {})
        : {},
      multiSend: isSet(object.multiSend) ? Boolean(object.multiSend) : false,
      liquidityModule: isSet(object.liquidityModule) ? Boolean(object.liquidityModule) : false,
      withdrawalWaitgroup: isSet(object.withdrawalWaitgroup) ? Number(object.withdrawalWaitgroup) : 0,
      ibcNextValidatorsHash: isSet(object.ibcNextValidatorsHash)
        ? bytesFromBase64(object.ibcNextValidatorsHash)
        : new Uint8Array(),
      validatorSelectionAllocation: Array.isArray(object?.validatorSelectionAllocation)
        ? object.validatorSelectionAllocation.map((e: any) => Coin.fromJSON(e))
        : [],
      holdingsAllocation: Array.isArray(object?.holdingsAllocation)
        ? object.holdingsAllocation.map((e: any) => Coin.fromJSON(e))
        : [],
      lastEpochHeight: isSet(object.lastEpochHeight) ? Long.fromValue(object.lastEpochHeight) : Long.ZERO,
    };
  },

  toJSON(message: Zone): unknown {
    const obj: any = {};
    message.connectionId !== undefined && (obj.connectionId = message.connectionId);
    message.chainId !== undefined && (obj.chainId = message.chainId);
    message.depositAddress !== undefined
      && (obj.depositAddress = message.depositAddress ? ICAAccount.toJSON(message.depositAddress) : undefined);
    message.withdrawalAddress !== undefined
      && (obj.withdrawalAddress = message.withdrawalAddress ? ICAAccount.toJSON(message.withdrawalAddress) : undefined);
    message.performanceAddress !== undefined && (obj.performanceAddress = message.performanceAddress
      ? ICAAccount.toJSON(message.performanceAddress)
      : undefined);
    if (message.delegationAddresses) {
      obj.delegationAddresses = message.delegationAddresses.map((e) => e ? ICAAccount.toJSON(e) : undefined);
    } else {
      obj.delegationAddresses = [];
    }
    message.accountPrefix !== undefined && (obj.accountPrefix = message.accountPrefix);
    message.localDenom !== undefined && (obj.localDenom = message.localDenom);
    message.baseDenom !== undefined && (obj.baseDenom = message.baseDenom);
    message.redemptionRate !== undefined && (obj.redemptionRate = message.redemptionRate);
    message.lastRedemptionRate !== undefined && (obj.lastRedemptionRate = message.lastRedemptionRate);
    if (message.validators) {
      obj.validators = message.validators.map((e) => e ? Validator.toJSON(e) : undefined);
    } else {
      obj.validators = [];
    }
    obj.aggregateIntent = {};
    if (message.aggregateIntent) {
      Object.entries(message.aggregateIntent).forEach(([k, v]) => {
        obj.aggregateIntent[k] = ValidatorIntent.toJSON(v);
      });
    }
    message.multiSend !== undefined && (obj.multiSend = message.multiSend);
    message.liquidityModule !== undefined && (obj.liquidityModule = message.liquidityModule);
    message.withdrawalWaitgroup !== undefined && (obj.withdrawalWaitgroup = Math.round(message.withdrawalWaitgroup));
    message.ibcNextValidatorsHash !== undefined
      && (obj.ibcNextValidatorsHash = base64FromBytes(
        message.ibcNextValidatorsHash !== undefined ? message.ibcNextValidatorsHash : new Uint8Array(),
      ));
    if (message.validatorSelectionAllocation) {
      obj.validatorSelectionAllocation = message.validatorSelectionAllocation.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.validatorSelectionAllocation = [];
    }
    if (message.holdingsAllocation) {
      obj.holdingsAllocation = message.holdingsAllocation.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.holdingsAllocation = [];
    }
    message.lastEpochHeight !== undefined && (obj.lastEpochHeight = (message.lastEpochHeight || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Zone>, I>>(object: I): Zone {
    const message = createBaseZone();
    message.connectionId = object.connectionId ?? "";
    message.chainId = object.chainId ?? "";
    message.depositAddress = (object.depositAddress !== undefined && object.depositAddress !== null)
      ? ICAAccount.fromPartial(object.depositAddress)
      : undefined;
    message.withdrawalAddress = (object.withdrawalAddress !== undefined && object.withdrawalAddress !== null)
      ? ICAAccount.fromPartial(object.withdrawalAddress)
      : undefined;
    message.performanceAddress = (object.performanceAddress !== undefined && object.performanceAddress !== null)
      ? ICAAccount.fromPartial(object.performanceAddress)
      : undefined;
    message.delegationAddresses = object.delegationAddresses?.map((e) => ICAAccount.fromPartial(e)) || [];
    message.accountPrefix = object.accountPrefix ?? "";
    message.localDenom = object.localDenom ?? "";
    message.baseDenom = object.baseDenom ?? "";
    message.redemptionRate = object.redemptionRate ?? "";
    message.lastRedemptionRate = object.lastRedemptionRate ?? "";
    message.validators = object.validators?.map((e) => Validator.fromPartial(e)) || [];
    message.aggregateIntent = Object.entries(object.aggregateIntent ?? {}).reduce<{ [key: string]: ValidatorIntent }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = ValidatorIntent.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    message.multiSend = object.multiSend ?? false;
    message.liquidityModule = object.liquidityModule ?? false;
    message.withdrawalWaitgroup = object.withdrawalWaitgroup ?? 0;
    message.ibcNextValidatorsHash = object.ibcNextValidatorsHash ?? new Uint8Array();
    message.validatorSelectionAllocation = object.validatorSelectionAllocation?.map((e) => Coin.fromPartial(e)) || [];
    message.holdingsAllocation = object.holdingsAllocation?.map((e) => Coin.fromPartial(e)) || [];
    message.lastEpochHeight = (object.lastEpochHeight !== undefined && object.lastEpochHeight !== null)
      ? Long.fromValue(object.lastEpochHeight)
      : Long.ZERO;
    return message;
  },
};

function createBaseZone_AggregateIntentEntry(): Zone_AggregateIntentEntry {
  return { key: "", value: undefined };
}

export const Zone_AggregateIntentEntry = {
  encode(message: Zone_AggregateIntentEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      ValidatorIntent.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Zone_AggregateIntentEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseZone_AggregateIntentEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = ValidatorIntent.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Zone_AggregateIntentEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? ValidatorIntent.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: Zone_AggregateIntentEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? ValidatorIntent.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Zone_AggregateIntentEntry>, I>>(object: I): Zone_AggregateIntentEntry {
    const message = createBaseZone_AggregateIntentEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? ValidatorIntent.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseICAAccount(): ICAAccount {
  return { address: "", balance: [], portName: "", withdrawalAddress: "", balanceWaitgroup: 0 };
}

export const ICAAccount = {
  encode(message: ICAAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    for (const v of message.balance) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.portName !== "") {
      writer.uint32(26).string(message.portName);
    }
    if (message.withdrawalAddress !== "") {
      writer.uint32(34).string(message.withdrawalAddress);
    }
    if (message.balanceWaitgroup !== 0) {
      writer.uint32(40).uint32(message.balanceWaitgroup);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ICAAccount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseICAAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.balance.push(Coin.decode(reader, reader.uint32()));
          break;
        case 3:
          message.portName = reader.string();
          break;
        case 4:
          message.withdrawalAddress = reader.string();
          break;
        case 5:
          message.balanceWaitgroup = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ICAAccount {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      balance: Array.isArray(object?.balance) ? object.balance.map((e: any) => Coin.fromJSON(e)) : [],
      portName: isSet(object.portName) ? String(object.portName) : "",
      withdrawalAddress: isSet(object.withdrawalAddress) ? String(object.withdrawalAddress) : "",
      balanceWaitgroup: isSet(object.balanceWaitgroup) ? Number(object.balanceWaitgroup) : 0,
    };
  },

  toJSON(message: ICAAccount): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    if (message.balance) {
      obj.balance = message.balance.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.balance = [];
    }
    message.portName !== undefined && (obj.portName = message.portName);
    message.withdrawalAddress !== undefined && (obj.withdrawalAddress = message.withdrawalAddress);
    message.balanceWaitgroup !== undefined && (obj.balanceWaitgroup = Math.round(message.balanceWaitgroup));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ICAAccount>, I>>(object: I): ICAAccount {
    const message = createBaseICAAccount();
    message.address = object.address ?? "";
    message.balance = object.balance?.map((e) => Coin.fromPartial(e)) || [];
    message.portName = object.portName ?? "";
    message.withdrawalAddress = object.withdrawalAddress ?? "";
    message.balanceWaitgroup = object.balanceWaitgroup ?? 0;
    return message;
  },
};

function createBaseWithdrawalRecord(): WithdrawalRecord {
  return {
    chainId: "",
    delegator: "",
    validator: "",
    recipient: "",
    amount: undefined,
    burnAmount: undefined,
    txhash: "",
    status: 0,
    completionTime: undefined,
  };
}

export const WithdrawalRecord = {
  encode(message: WithdrawalRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.delegator !== "") {
      writer.uint32(18).string(message.delegator);
    }
    if (message.validator !== "") {
      writer.uint32(26).string(message.validator);
    }
    if (message.recipient !== "") {
      writer.uint32(34).string(message.recipient);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(42).fork()).ldelim();
    }
    if (message.burnAmount !== undefined) {
      Coin.encode(message.burnAmount, writer.uint32(50).fork()).ldelim();
    }
    if (message.txhash !== "") {
      writer.uint32(58).string(message.txhash);
    }
    if (message.status !== 0) {
      writer.uint32(64).int32(message.status);
    }
    if (message.completionTime !== undefined) {
      Timestamp.encode(toTimestamp(message.completionTime), writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WithdrawalRecord {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWithdrawalRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.delegator = reader.string();
          break;
        case 3:
          message.validator = reader.string();
          break;
        case 4:
          message.recipient = reader.string();
          break;
        case 5:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        case 6:
          message.burnAmount = Coin.decode(reader, reader.uint32());
          break;
        case 7:
          message.txhash = reader.string();
          break;
        case 8:
          message.status = reader.int32();
          break;
        case 9:
          message.completionTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WithdrawalRecord {
    return {
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
      delegator: isSet(object.delegator) ? String(object.delegator) : "",
      validator: isSet(object.validator) ? String(object.validator) : "",
      recipient: isSet(object.recipient) ? String(object.recipient) : "",
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
      burnAmount: isSet(object.burnAmount) ? Coin.fromJSON(object.burnAmount) : undefined,
      txhash: isSet(object.txhash) ? String(object.txhash) : "",
      status: isSet(object.status) ? Number(object.status) : 0,
      completionTime: isSet(object.completionTime) ? fromJsonTimestamp(object.completionTime) : undefined,
    };
  },

  toJSON(message: WithdrawalRecord): unknown {
    const obj: any = {};
    message.chainId !== undefined && (obj.chainId = message.chainId);
    message.delegator !== undefined && (obj.delegator = message.delegator);
    message.validator !== undefined && (obj.validator = message.validator);
    message.recipient !== undefined && (obj.recipient = message.recipient);
    message.amount !== undefined && (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    message.burnAmount !== undefined
      && (obj.burnAmount = message.burnAmount ? Coin.toJSON(message.burnAmount) : undefined);
    message.txhash !== undefined && (obj.txhash = message.txhash);
    message.status !== undefined && (obj.status = Math.round(message.status));
    message.completionTime !== undefined && (obj.completionTime = message.completionTime.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WithdrawalRecord>, I>>(object: I): WithdrawalRecord {
    const message = createBaseWithdrawalRecord();
    message.chainId = object.chainId ?? "";
    message.delegator = object.delegator ?? "";
    message.validator = object.validator ?? "";
    message.recipient = object.recipient ?? "";
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    message.burnAmount = (object.burnAmount !== undefined && object.burnAmount !== null)
      ? Coin.fromPartial(object.burnAmount)
      : undefined;
    message.txhash = object.txhash ?? "";
    message.status = object.status ?? 0;
    message.completionTime = object.completionTime ?? undefined;
    return message;
  },
};

function createBaseTransferRecord(): TransferRecord {
  return { sender: "", recipient: "", amount: undefined };
}

export const TransferRecord = {
  encode(message: TransferRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.recipient !== "") {
      writer.uint32(18).string(message.recipient);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TransferRecord {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransferRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.recipient = reader.string();
          break;
        case 3:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TransferRecord {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      recipient: isSet(object.recipient) ? String(object.recipient) : "",
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
    };
  },

  toJSON(message: TransferRecord): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.recipient !== undefined && (obj.recipient = message.recipient);
    message.amount !== undefined && (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TransferRecord>, I>>(object: I): TransferRecord {
    const message = createBaseTransferRecord();
    message.sender = object.sender ?? "";
    message.recipient = object.recipient ?? "";
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    return message;
  },
};

function createBaseValidator(): Validator {
  return { valoperAddress: "", commissionRate: "", delegatorShares: "", votingPower: "", score: "" };
}

export const Validator = {
  encode(message: Validator, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.valoperAddress !== "") {
      writer.uint32(10).string(message.valoperAddress);
    }
    if (message.commissionRate !== "") {
      writer.uint32(18).string(message.commissionRate);
    }
    if (message.delegatorShares !== "") {
      writer.uint32(26).string(message.delegatorShares);
    }
    if (message.votingPower !== "") {
      writer.uint32(34).string(message.votingPower);
    }
    if (message.score !== "") {
      writer.uint32(42).string(message.score);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Validator {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.valoperAddress = reader.string();
          break;
        case 2:
          message.commissionRate = reader.string();
          break;
        case 3:
          message.delegatorShares = reader.string();
          break;
        case 4:
          message.votingPower = reader.string();
          break;
        case 5:
          message.score = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Validator {
    return {
      valoperAddress: isSet(object.valoperAddress) ? String(object.valoperAddress) : "",
      commissionRate: isSet(object.commissionRate) ? String(object.commissionRate) : "",
      delegatorShares: isSet(object.delegatorShares) ? String(object.delegatorShares) : "",
      votingPower: isSet(object.votingPower) ? String(object.votingPower) : "",
      score: isSet(object.score) ? String(object.score) : "",
    };
  },

  toJSON(message: Validator): unknown {
    const obj: any = {};
    message.valoperAddress !== undefined && (obj.valoperAddress = message.valoperAddress);
    message.commissionRate !== undefined && (obj.commissionRate = message.commissionRate);
    message.delegatorShares !== undefined && (obj.delegatorShares = message.delegatorShares);
    message.votingPower !== undefined && (obj.votingPower = message.votingPower);
    message.score !== undefined && (obj.score = message.score);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Validator>, I>>(object: I): Validator {
    const message = createBaseValidator();
    message.valoperAddress = object.valoperAddress ?? "";
    message.commissionRate = object.commissionRate ?? "";
    message.delegatorShares = object.delegatorShares ?? "";
    message.votingPower = object.votingPower ?? "";
    message.score = object.score ?? "";
    return message;
  },
};

function createBaseDelegatorIntent(): DelegatorIntent {
  return { delegator: "", intents: [] };
}

export const DelegatorIntent = {
  encode(message: DelegatorIntent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.delegator !== "") {
      writer.uint32(10).string(message.delegator);
    }
    for (const v of message.intents) {
      ValidatorIntent.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DelegatorIntent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegatorIntent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegator = reader.string();
          break;
        case 2:
          message.intents.push(ValidatorIntent.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DelegatorIntent {
    return {
      delegator: isSet(object.delegator) ? String(object.delegator) : "",
      intents: Array.isArray(object?.intents) ? object.intents.map((e: any) => ValidatorIntent.fromJSON(e)) : [],
    };
  },

  toJSON(message: DelegatorIntent): unknown {
    const obj: any = {};
    message.delegator !== undefined && (obj.delegator = message.delegator);
    if (message.intents) {
      obj.intents = message.intents.map((e) => e ? ValidatorIntent.toJSON(e) : undefined);
    } else {
      obj.intents = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DelegatorIntent>, I>>(object: I): DelegatorIntent {
    const message = createBaseDelegatorIntent();
    message.delegator = object.delegator ?? "";
    message.intents = object.intents?.map((e) => ValidatorIntent.fromPartial(e)) || [];
    return message;
  },
};

function createBaseValidatorIntent(): ValidatorIntent {
  return { valoperAddress: "", weight: "" };
}

export const ValidatorIntent = {
  encode(message: ValidatorIntent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.valoperAddress !== "") {
      writer.uint32(10).string(message.valoperAddress);
    }
    if (message.weight !== "") {
      writer.uint32(18).string(message.weight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorIntent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorIntent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.valoperAddress = reader.string();
          break;
        case 2:
          message.weight = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidatorIntent {
    return {
      valoperAddress: isSet(object.valoperAddress) ? String(object.valoperAddress) : "",
      weight: isSet(object.weight) ? String(object.weight) : "",
    };
  },

  toJSON(message: ValidatorIntent): unknown {
    const obj: any = {};
    message.valoperAddress !== undefined && (obj.valoperAddress = message.valoperAddress);
    message.weight !== undefined && (obj.weight = message.weight);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ValidatorIntent>, I>>(object: I): ValidatorIntent {
    const message = createBaseValidatorIntent();
    message.valoperAddress = object.valoperAddress ?? "";
    message.weight = object.weight ?? "";
    return message;
  },
};

function createBaseDelegation(): Delegation {
  return {
    delegationAddress: "",
    validatorAddress: "",
    amount: undefined,
    height: Long.ZERO,
    redelegationEnd: Long.ZERO,
  };
}

export const Delegation = {
  encode(message: Delegation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.delegationAddress !== "") {
      writer.uint32(10).string(message.delegationAddress);
    }
    if (message.validatorAddress !== "") {
      writer.uint32(18).string(message.validatorAddress);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
    }
    if (!message.height.isZero()) {
      writer.uint32(32).int64(message.height);
    }
    if (!message.redelegationEnd.isZero()) {
      writer.uint32(40).int64(message.redelegationEnd);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Delegation {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegationAddress = reader.string();
          break;
        case 2:
          message.validatorAddress = reader.string();
          break;
        case 3:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.height = reader.int64() as Long;
          break;
        case 5:
          message.redelegationEnd = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Delegation {
    return {
      delegationAddress: isSet(object.delegationAddress) ? String(object.delegationAddress) : "",
      validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : "",
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
      height: isSet(object.height) ? Long.fromValue(object.height) : Long.ZERO,
      redelegationEnd: isSet(object.redelegationEnd) ? Long.fromValue(object.redelegationEnd) : Long.ZERO,
    };
  },

  toJSON(message: Delegation): unknown {
    const obj: any = {};
    message.delegationAddress !== undefined && (obj.delegationAddress = message.delegationAddress);
    message.validatorAddress !== undefined && (obj.validatorAddress = message.validatorAddress);
    message.amount !== undefined && (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    message.height !== undefined && (obj.height = (message.height || Long.ZERO).toString());
    message.redelegationEnd !== undefined && (obj.redelegationEnd = (message.redelegationEnd || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Delegation>, I>>(object: I): Delegation {
    const message = createBaseDelegation();
    message.delegationAddress = object.delegationAddress ?? "";
    message.validatorAddress = object.validatorAddress ?? "";
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    message.height = (object.height !== undefined && object.height !== null)
      ? Long.fromValue(object.height)
      : Long.ZERO;
    message.redelegationEnd = (object.redelegationEnd !== undefined && object.redelegationEnd !== null)
      ? Long.fromValue(object.redelegationEnd)
      : Long.ZERO;
    return message;
  },
};

function createBasePortConnectionTuple(): PortConnectionTuple {
  return { connectionId: "", portId: "" };
}

export const PortConnectionTuple = {
  encode(message: PortConnectionTuple, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.connectionId !== "") {
      writer.uint32(10).string(message.connectionId);
    }
    if (message.portId !== "") {
      writer.uint32(18).string(message.portId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PortConnectionTuple {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePortConnectionTuple();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connectionId = reader.string();
          break;
        case 2:
          message.portId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PortConnectionTuple {
    return {
      connectionId: isSet(object.connectionId) ? String(object.connectionId) : "",
      portId: isSet(object.portId) ? String(object.portId) : "",
    };
  },

  toJSON(message: PortConnectionTuple): unknown {
    const obj: any = {};
    message.connectionId !== undefined && (obj.connectionId = message.connectionId);
    message.portId !== undefined && (obj.portId = message.portId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PortConnectionTuple>, I>>(object: I): PortConnectionTuple {
    const message = createBasePortConnectionTuple();
    message.connectionId = object.connectionId ?? "";
    message.portId = object.portId ?? "";
    return message;
  },
};

function createBaseReceipt(): Receipt {
  return { chainId: "", sender: "", txhash: "", amount: [] };
}

export const Receipt = {
  encode(message: Receipt, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.sender !== "") {
      writer.uint32(18).string(message.sender);
    }
    if (message.txhash !== "") {
      writer.uint32(26).string(message.txhash);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Receipt {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReceipt();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.sender = reader.string();
          break;
        case 3:
          message.txhash = reader.string();
          break;
        case 4:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Receipt {
    return {
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
      sender: isSet(object.sender) ? String(object.sender) : "",
      txhash: isSet(object.txhash) ? String(object.txhash) : "",
      amount: Array.isArray(object?.amount) ? object.amount.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: Receipt): unknown {
    const obj: any = {};
    message.chainId !== undefined && (obj.chainId = message.chainId);
    message.sender !== undefined && (obj.sender = message.sender);
    message.txhash !== undefined && (obj.txhash = message.txhash);
    if (message.amount) {
      obj.amount = message.amount.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.amount = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Receipt>, I>>(object: I): Receipt {
    const message = createBaseReceipt();
    message.chainId = object.chainId ?? "";
    message.sender = object.sender ?? "";
    message.txhash = object.txhash ?? "";
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDelegationPlan(): DelegationPlan {
  return { validatorAddress: "", delegatorAddress: "", value: [] };
}

export const DelegationPlan = {
  encode(message: DelegationPlan, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    if (message.delegatorAddress !== "") {
      writer.uint32(18).string(message.delegatorAddress);
    }
    for (const v of message.value) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DelegationPlan {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegationPlan();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddress = reader.string();
          break;
        case 2:
          message.delegatorAddress = reader.string();
          break;
        case 3:
          message.value.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DelegationPlan {
    return {
      validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : "",
      delegatorAddress: isSet(object.delegatorAddress) ? String(object.delegatorAddress) : "",
      value: Array.isArray(object?.value) ? object.value.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: DelegationPlan): unknown {
    const obj: any = {};
    message.validatorAddress !== undefined && (obj.validatorAddress = message.validatorAddress);
    message.delegatorAddress !== undefined && (obj.delegatorAddress = message.delegatorAddress);
    if (message.value) {
      obj.value = message.value.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.value = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DelegationPlan>, I>>(object: I): DelegationPlan {
    const message = createBaseDelegationPlan();
    message.validatorAddress = object.validatorAddress ?? "";
    message.delegatorAddress = object.delegatorAddress ?? "";
    message.value = object.value?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseParams(): Params {
  return {
    delegationAccountCount: Long.UZERO,
    depositInterval: Long.UZERO,
    validatorsetInterval: Long.UZERO,
    commissionRate: "",
  };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.delegationAccountCount.isZero()) {
      writer.uint32(8).uint64(message.delegationAccountCount);
    }
    if (!message.depositInterval.isZero()) {
      writer.uint32(16).uint64(message.depositInterval);
    }
    if (!message.validatorsetInterval.isZero()) {
      writer.uint32(24).uint64(message.validatorsetInterval);
    }
    if (message.commissionRate !== "") {
      writer.uint32(34).string(message.commissionRate);
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
          message.delegationAccountCount = reader.uint64() as Long;
          break;
        case 2:
          message.depositInterval = reader.uint64() as Long;
          break;
        case 3:
          message.validatorsetInterval = reader.uint64() as Long;
          break;
        case 4:
          message.commissionRate = reader.string();
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
      delegationAccountCount: isSet(object.delegationAccountCount)
        ? Long.fromValue(object.delegationAccountCount)
        : Long.UZERO,
      depositInterval: isSet(object.depositInterval) ? Long.fromValue(object.depositInterval) : Long.UZERO,
      validatorsetInterval: isSet(object.validatorsetInterval)
        ? Long.fromValue(object.validatorsetInterval)
        : Long.UZERO,
      commissionRate: isSet(object.commissionRate) ? String(object.commissionRate) : "",
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.delegationAccountCount !== undefined
      && (obj.delegationAccountCount = (message.delegationAccountCount || Long.UZERO).toString());
    message.depositInterval !== undefined && (obj.depositInterval = (message.depositInterval || Long.UZERO).toString());
    message.validatorsetInterval !== undefined
      && (obj.validatorsetInterval = (message.validatorsetInterval || Long.UZERO).toString());
    message.commissionRate !== undefined && (obj.commissionRate = message.commissionRate);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.delegationAccountCount =
      (object.delegationAccountCount !== undefined && object.delegationAccountCount !== null)
        ? Long.fromValue(object.delegationAccountCount)
        : Long.UZERO;
    message.depositInterval = (object.depositInterval !== undefined && object.depositInterval !== null)
      ? Long.fromValue(object.depositInterval)
      : Long.UZERO;
    message.validatorsetInterval = (object.validatorsetInterval !== undefined && object.validatorsetInterval !== null)
      ? Long.fromValue(object.validatorsetInterval)
      : Long.UZERO;
    message.commissionRate = object.commissionRate ?? "";
    return message;
  },
};

function createBaseDelegationsForZone(): DelegationsForZone {
  return { chainId: "", delegations: [] };
}

export const DelegationsForZone = {
  encode(message: DelegationsForZone, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    for (const v of message.delegations) {
      Delegation.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DelegationsForZone {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegationsForZone();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.delegations.push(Delegation.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DelegationsForZone {
    return {
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
      delegations: Array.isArray(object?.delegations) ? object.delegations.map((e: any) => Delegation.fromJSON(e)) : [],
    };
  },

  toJSON(message: DelegationsForZone): unknown {
    const obj: any = {};
    message.chainId !== undefined && (obj.chainId = message.chainId);
    if (message.delegations) {
      obj.delegations = message.delegations.map((e) => e ? Delegation.toJSON(e) : undefined);
    } else {
      obj.delegations = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DelegationsForZone>, I>>(object: I): DelegationsForZone {
    const message = createBaseDelegationsForZone();
    message.chainId = object.chainId ?? "";
    message.delegations = object.delegations?.map((e) => Delegation.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDelegationPlansForZone(): DelegationPlansForZone {
  return { chainId: "", delegationPlans: {} };
}

export const DelegationPlansForZone = {
  encode(message: DelegationPlansForZone, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    Object.entries(message.delegationPlans).forEach(([key, value]) => {
      DelegationPlansForZone_DelegationPlansEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DelegationPlansForZone {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegationPlansForZone();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          const entry2 = DelegationPlansForZone_DelegationPlansEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.delegationPlans[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DelegationPlansForZone {
    return {
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
      delegationPlans: isObject(object.delegationPlans)
        ? Object.entries(object.delegationPlans).reduce<{ [key: string]: DelegationPlan }>((acc, [key, value]) => {
          acc[key] = DelegationPlan.fromJSON(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: DelegationPlansForZone): unknown {
    const obj: any = {};
    message.chainId !== undefined && (obj.chainId = message.chainId);
    obj.delegationPlans = {};
    if (message.delegationPlans) {
      Object.entries(message.delegationPlans).forEach(([k, v]) => {
        obj.delegationPlans[k] = DelegationPlan.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DelegationPlansForZone>, I>>(object: I): DelegationPlansForZone {
    const message = createBaseDelegationPlansForZone();
    message.chainId = object.chainId ?? "";
    message.delegationPlans = Object.entries(object.delegationPlans ?? {}).reduce<{ [key: string]: DelegationPlan }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = DelegationPlan.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBaseDelegationPlansForZone_DelegationPlansEntry(): DelegationPlansForZone_DelegationPlansEntry {
  return { key: "", value: undefined };
}

export const DelegationPlansForZone_DelegationPlansEntry = {
  encode(message: DelegationPlansForZone_DelegationPlansEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      DelegationPlan.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DelegationPlansForZone_DelegationPlansEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegationPlansForZone_DelegationPlansEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = DelegationPlan.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DelegationPlansForZone_DelegationPlansEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? DelegationPlan.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: DelegationPlansForZone_DelegationPlansEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? DelegationPlan.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DelegationPlansForZone_DelegationPlansEntry>, I>>(
    object: I,
  ): DelegationPlansForZone_DelegationPlansEntry {
    const message = createBaseDelegationPlansForZone_DelegationPlansEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? DelegationPlan.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseDelegatorIntentsForZone(): DelegatorIntentsForZone {
  return { chainId: "", delegationIntent: [], snapshot: false };
}

export const DelegatorIntentsForZone = {
  encode(message: DelegatorIntentsForZone, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    for (const v of message.delegationIntent) {
      DelegatorIntent.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.snapshot === true) {
      writer.uint32(24).bool(message.snapshot);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DelegatorIntentsForZone {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegatorIntentsForZone();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.delegationIntent.push(DelegatorIntent.decode(reader, reader.uint32()));
          break;
        case 3:
          message.snapshot = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DelegatorIntentsForZone {
    return {
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
      delegationIntent: Array.isArray(object?.delegationIntent)
        ? object.delegationIntent.map((e: any) => DelegatorIntent.fromJSON(e))
        : [],
      snapshot: isSet(object.snapshot) ? Boolean(object.snapshot) : false,
    };
  },

  toJSON(message: DelegatorIntentsForZone): unknown {
    const obj: any = {};
    message.chainId !== undefined && (obj.chainId = message.chainId);
    if (message.delegationIntent) {
      obj.delegationIntent = message.delegationIntent.map((e) => e ? DelegatorIntent.toJSON(e) : undefined);
    } else {
      obj.delegationIntent = [];
    }
    message.snapshot !== undefined && (obj.snapshot = message.snapshot);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DelegatorIntentsForZone>, I>>(object: I): DelegatorIntentsForZone {
    const message = createBaseDelegatorIntentsForZone();
    message.chainId = object.chainId ?? "";
    message.delegationIntent = object.delegationIntent?.map((e) => DelegatorIntent.fromPartial(e)) || [];
    message.snapshot = object.snapshot ?? false;
    return message;
  },
};

function createBaseGenesisState(): GenesisState {
  return {
    params: undefined,
    zones: [],
    receipts: [],
    delegations: [],
    delegationPlans: [],
    delegatorIntents: [],
    portConnections: [],
  };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.zones) {
      Zone.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.receipts) {
      Receipt.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.delegations) {
      DelegationsForZone.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.delegationPlans) {
      DelegationPlansForZone.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.delegatorIntents) {
      DelegatorIntentsForZone.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.portConnections) {
      PortConnectionTuple.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.zones.push(Zone.decode(reader, reader.uint32()));
          break;
        case 3:
          message.receipts.push(Receipt.decode(reader, reader.uint32()));
          break;
        case 4:
          message.delegations.push(DelegationsForZone.decode(reader, reader.uint32()));
          break;
        case 5:
          message.delegationPlans.push(DelegationPlansForZone.decode(reader, reader.uint32()));
          break;
        case 6:
          message.delegatorIntents.push(DelegatorIntentsForZone.decode(reader, reader.uint32()));
          break;
        case 7:
          message.portConnections.push(PortConnectionTuple.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      zones: Array.isArray(object?.zones) ? object.zones.map((e: any) => Zone.fromJSON(e)) : [],
      receipts: Array.isArray(object?.receipts) ? object.receipts.map((e: any) => Receipt.fromJSON(e)) : [],
      delegations: Array.isArray(object?.delegations)
        ? object.delegations.map((e: any) => DelegationsForZone.fromJSON(e))
        : [],
      delegationPlans: Array.isArray(object?.delegationPlans)
        ? object.delegationPlans.map((e: any) => DelegationPlansForZone.fromJSON(e))
        : [],
      delegatorIntents: Array.isArray(object?.delegatorIntents)
        ? object.delegatorIntents.map((e: any) => DelegatorIntentsForZone.fromJSON(e))
        : [],
      portConnections: Array.isArray(object?.portConnections)
        ? object.portConnections.map((e: any) => PortConnectionTuple.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.zones) {
      obj.zones = message.zones.map((e) => e ? Zone.toJSON(e) : undefined);
    } else {
      obj.zones = [];
    }
    if (message.receipts) {
      obj.receipts = message.receipts.map((e) => e ? Receipt.toJSON(e) : undefined);
    } else {
      obj.receipts = [];
    }
    if (message.delegations) {
      obj.delegations = message.delegations.map((e) => e ? DelegationsForZone.toJSON(e) : undefined);
    } else {
      obj.delegations = [];
    }
    if (message.delegationPlans) {
      obj.delegationPlans = message.delegationPlans.map((e) => e ? DelegationPlansForZone.toJSON(e) : undefined);
    } else {
      obj.delegationPlans = [];
    }
    if (message.delegatorIntents) {
      obj.delegatorIntents = message.delegatorIntents.map((e) => e ? DelegatorIntentsForZone.toJSON(e) : undefined);
    } else {
      obj.delegatorIntents = [];
    }
    if (message.portConnections) {
      obj.portConnections = message.portConnections.map((e) => e ? PortConnectionTuple.toJSON(e) : undefined);
    } else {
      obj.portConnections = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    message.zones = object.zones?.map((e) => Zone.fromPartial(e)) || [];
    message.receipts = object.receipts?.map((e) => Receipt.fromPartial(e)) || [];
    message.delegations = object.delegations?.map((e) => DelegationsForZone.fromPartial(e)) || [];
    message.delegationPlans = object.delegationPlans?.map((e) => DelegationPlansForZone.fromPartial(e)) || [];
    message.delegatorIntents = object.delegatorIntents?.map((e) => DelegatorIntentsForZone.fromPartial(e)) || [];
    message.portConnections = object.portConnections?.map((e) => PortConnectionTuple.fromPartial(e)) || [];
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

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds.toNumber() * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}