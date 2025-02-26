import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Engine {
  'add' : ActorMethod<
    [
      string,
      Array<TokenFrequency>,
      string,
      string,
      string,
      string,
      string,
      bigint,
      string,
    ],
    boolean
  >,
  'add_to_feed' : ActorMethod<
    [string, string, string, string, string, string, string],
    bigint
  >,
  'autoscale' : ActorMethod<[], bigint>,
  'autoscale_feed' : ActorMethod<[], bigint>,
  'balance' : ActorMethod<[], bigint>,
  'get_feed' : ActorMethod<[], Array<string>>,
  'get_workers' : ActorMethod<[], Array<string>>,
  'remove' : ActorMethod<[string, Array<TokenFrequency>], boolean>,
  'update' : ActorMethod<
    [
      string,
      Array<TokenFrequency>,
      string,
      string,
      string,
      string,
      string,
      bigint,
      string,
    ],
    boolean
  >,
  'upgrade' : ActorMethod<[Uint8Array | number[]], undefined>,
  'upgrade_feed' : ActorMethod<[Uint8Array | number[]], undefined>,
}
export interface TokenFrequency { 'token' : string, 'frequency' : number }
export interface _SERVICE extends Engine {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
