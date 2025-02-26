import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface SearchResult {
  'total' : bigint,
  'pages' : bigint,
  'items' : Array<SearchResultItem>,
}
export interface SearchResultItem {
  'url' : string,
  'title' : string,
  'chain' : bigint,
  'heading' : string,
  'snippet' : string,
  'icon_data' : string,
}
export interface TokenFrequency { 'token' : string, 'frequency' : number }
export interface Worker {
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
    number
  >,
  'balance' : ActorMethod<[], bigint>,
  'remove' : ActorMethod<[string, Array<TokenFrequency>], boolean>,
  'search' : ActorMethod<[string, bigint, bigint], SearchResult>,
  'suggest' : ActorMethod<[string, bigint], Array<string>>,
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
}
export interface _SERVICE extends Worker {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
