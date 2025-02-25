import fetch from "isomorphic-fetch";
import { HttpAgent } from "@dfinity/agent";
import { createActor as createEngineActor} from "./declarations/querio_se/index.js";
import { createActor as createWorkerActor} from "./declarations/querio_worker/index.js";

import BigNumber from 'bignumber.js';

import { QUERIO_SE_HOST, QUERIO_SE_CANISTER_ID } from './config.js';

export class QuerioSearch {
  constructor() {
    const agent = new HttpAgent({
        host: QUERIO_SE_HOST,
        fetch,
    });
    this.agent = agent;
    this.workers = [];
    this.se_actor = createEngineActor(QUERIO_SE_CANISTER_ID, {agent});
  }

  async init() {
    if (this.workers.length > 0) {
      return;
    }

    try {
      const workers = await this.se_actor.get_workers();
      if (workers?.length > 0) {
        for (const w of workers) {
          this.workers.push(createWorkerActor(w, {agent : this.agent}))
        }
      }
      
    } catch (e) {
      console.log(e);
    }
  }

  async search(q, page, chain) {
    if (this.workers.length == 0) {
      await this.init();
    }

    let items = [];
    let total = 0;
    let pages = 0;

    let start = Date.now();

    await Promise.all(this.workers.map(async (w) => {
      try {
        const currentResult = await w.search(q, page, chain);
        if (currentResult) {
          const currentPages = (new BigNumber(currentResult?.pages)).toNumber();
          items = [...items, ...currentResult?.items];
          total += (new BigNumber(currentResult?.total)).toNumber();

          if (currentPages > pages) {
            pages = currentPages;
          }
        }
      } catch (e) {
      }
    }));

    let duration = Date.now() - start;

    const result = {
      items: items,
      total: total,
      pages: pages,
      duration: duration,
    }

    return result;
  }

  async suggest(q, chain) {
    let result = undefined;
    let items = [];

    if (this.workers.length == 0) {
      await this.init();
    }

    await Promise.all(this.workers.map(async (w) => {
      try {
        const currentItems = await w.suggest(q, chain);

        if (currentItems?.length > 0) {
          items = [...items, ...currentItems];
        }
      } catch (e) {
      }
    }));

    if (items?.length > 0) {
      result = items;
    }

    return result;
  }
}

export const Chains = [
  { title: "ICP" },
  { title: "ETH" },
  { title: "XLM" },
  { title: "NEAR" },
  { title: "BNB" },
  { title: "SOL" },
  { title: "ADA" },
  { title: "DOT" },
  { title: "MATIC" },
  { title: "ARB" },
  { title: "OP" },
];

export const ChainMap = {
  icp: 1,
  eth: 2,
  xlm: 3,
  near: 4,
  bnb: 5,
  sol: 6,
  ada: 7,
  dot: 8,
  matic: 9,
  arb: 10,
  op: 11
};

export const ReverseChainMap = Object.keys(ChainMap).reduce((acc, key) => {
  const value = ChainMap[key];
  acc[value] = key;
  return acc;
}, {});