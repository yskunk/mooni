import axios, { AxiosRequestConfig } from 'axios';
import {BityOrderError, BityOrderResponse} from './wrappers/bityTypes';
import {MultiTrade, MultiTradeEstimation, MultiTradeRequest, TradeRequest} from "./trading/types";
import { MooniOrder, ProfitShare, Stats, TransactionHash, User, UUID } from '../types/api';
import {APIError} from "./errors";

interface IAPI {
  getBityOrder(orderId: string, jwsToken?: string): Promise<BityOrderResponse>;
  createMultiTrade(multiTradeRequest: MultiTradeRequest, jwsToken: string): Promise<MultiTrade>;
  estimateMultiTrade(tradeRequest: TradeRequest): Promise<MultiTradeEstimation>;
  getOrders(jwsToken: string): Promise<MooniOrder[]>;
  getUser(jwsToken: string): Promise<User>;
  getProfitShare(jwsToken: string): Promise<ProfitShare>;
  setPaymentTx(multiTradeId: UUID, txHash: TransactionHash, jwsToken: string): Promise<User>;
  getStats(): Promise<Stats>;
}

const API_URL = '/api';
const mooniAPI = axios.create({
  baseURL: API_URL,
  timeout: 30 * 1000,
});

/*
const RETRY_ATTEMPTS = 3;

async function mooniAPIRetryer(config: AxiosRequestConfig, attempt: number = 1) {
  try {
    return await mooniAPICatcher(config);
  }
  catch (error) {
    if(error.message === 'timeout' && attempt < RETRY_ATTEMPTS) {
      console.log('timeout retry', config)
      return await mooniAPIRetryer(config, attempt+1);
    }
    throw error;
  }
}
*/

async function mooniAPICatcher(config: AxiosRequestConfig) {
  try {
    return await mooniAPI(config);
  }
  catch (error) {
    if(error.code === 'ECONNABORTED') {
      throw new APIError(502, 'timeout');
    }
    if(error.response?.status === 404) {
      throw new APIError(404, 'not-found');
    }
    const data = error.response?.data;
    if(data?._bityError) {
      throw new BityOrderError(data.message, data.meta.errors);
    } else if(data?._apiError) {
      throw new APIError(data.code, data.message, data.description, data.meta);
    } else {
      throw new APIError(500, 'unexpected-server-error', '', error);
    }
  }
}

const ApiWrapper: IAPI = {
  async estimateMultiTrade(tradeRequest: TradeRequest): Promise<MultiTradeEstimation> {
    const {data} = await mooniAPICatcher({
      method: 'post',
      url: 'trading/estimateMultiTrade',
      data: tradeRequest,
    });

    return data;
  },
  async createMultiTrade(multiTradeRequest: MultiTradeRequest, jwsToken: string): Promise<MultiTrade> {
    const {data} = await mooniAPICatcher({
      method: 'post',
      url: 'trading/createMultiTrade',
      headers: {
        'Authorization': `Bearer ${jwsToken}`,
      },
      data: multiTradeRequest,
    });

    return data;
  },

  async getBityOrder(bityOrderId: string, jwsToken: string): Promise<BityOrderResponse> {
    const {data} = await mooniAPICatcher({
      method: 'post',
      url: 'bity/getOrder',
      headers: {
        'Authorization': `Bearer ${jwsToken}`,
      },
      data: {
        bityOrderId,
      },
    });

    return data;
  },
  async getOrders(jwsToken: string): Promise<MooniOrder[]> {
    const {data} = await mooniAPICatcher({
      method: 'get',
      url: 'orders',
      headers: {
        'Authorization': `Bearer ${jwsToken}`,
      },
    });

    return data;
  },
  async getUser(jwsToken: string): Promise<User> {
    const {data} = await mooniAPICatcher({
      method: 'get',
      url: 'user',
      headers: {
        'Authorization': `Bearer ${jwsToken}`,
      },
    });

    return data;
  },
  async setPaymentTx(multiTradeId: UUID, txHash: TransactionHash, jwsToken: string): Promise<User> {
    const {data} = await mooniAPICatcher({
      method: 'post',
      url: 'trading/setPaymentTx',
      headers: {
        'Authorization': `Bearer ${jwsToken}`,
      },
      data: {
        multiTradeId,
        txHash,
      },
    });

    return data;
  },
  async getStats(): Promise<Stats> {
    const {data} = await mooniAPICatcher({
      method: 'get',
      url: 'stats',
    });

    return data;
  },
  async getProfitShare(jwsToken: string): Promise<ProfitShare> {
    const {data} = await mooniAPICatcher({
      method: 'get',
      headers: {
        'Authorization': `Bearer ${jwsToken}`,
      },
      url: 'profitshare',
    });

    return data;
  },
};

export default ApiWrapper;
