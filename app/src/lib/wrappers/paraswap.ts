import axios from 'axios';
import {BigNumber, ethers} from "ethers";
import {APIError, ParaSwap} from 'paraswap';

import {defaultProvider} from "../web3Providers";
import {DexTrade, TradeExact, TradeRequest, TradeType} from "../trading/types";
import config from "../../config";
import AUGUSTUS_ABI from "../abis/augustus.json";
import {ETHER} from "../trading/currencyList";
import {CurrencyType, TokenCurrency} from "../trading/currencyTypes";
import {amountToDecimal, amountToInt, BN} from "../numbers";
import {getCurrency} from "../trading/currencyHelpers";

const paraSwap = new ParaSwap().setWeb3Provider(defaultProvider);
const paraswapAxios = axios.create({
  baseURL: 'https://api.paraswap.io/v2',
  timeout: 10000,
});
let paraswapAdapters: any | null = null;

function applySlippage(amount: string, maxSlippage: number): string {
  return new BN(amount).times(new BN(1).plus(maxSlippage)).toFixed();
}

const ParaswapWrapper = {
  async getTokenList(): Promise<TokenCurrency[]> {
    const { data } = await paraswapAxios({
      method: 'get',
      url: '/tokens',
    });
    return data.tokens.map(t =>
      new TokenCurrency(t.decimals, t.address, config.chainId, t.symbol, undefined, t.img)
    );
  },
  async getRate(tradeRequest: TradeRequest): Promise<DexTrade> {
    const swapSide = tradeRequest.tradeExact === TradeExact.INPUT ? 'SELL' : 'BUY';

    const inputCurrency = getCurrency(tradeRequest.inputCurrencySymbol);
    const outputCurrency = getCurrency(tradeRequest.outputCurrencySymbol);
    const amountCurrency = tradeRequest.tradeExact === TradeExact.INPUT ? inputCurrency : outputCurrency;

    const intAmount = amountToInt(tradeRequest.amount, amountCurrency.decimals);

    const { data: dexMetadata } = await paraswapAxios({
      method: 'get',
      url: '/prices',
      params: {
        from: tradeRequest.inputCurrencySymbol,
        to: tradeRequest.outputCurrencySymbol,
        amount: intAmount,
        side: swapSide
      },
    });

    const inputAmount = amountToDecimal(dexMetadata.priceRoute.srcAmount, inputCurrency.decimals);
    const outputAmount = amountToDecimal(dexMetadata.priceRoute.destAmount, outputCurrency.decimals);

    return {
      tradeRequest,
      inputAmount,
      outputAmount,
      tradeType: TradeType.DEX,
      dexMetadata,
    };
  },
  async getSpender(): Promise<string> {
    if(!paraswapAdapters) {
      const { data } = await paraswapAxios({
        method: 'get',
        url: `/adapters/${config.chainId}`,
      });
      paraswapAdapters = data;
    }
    const augustusAddress = paraswapAdapters.augustus.exchange;
    const augustusContract = new ethers.Contract(
      augustusAddress,
      AUGUSTUS_ABI,
      defaultProvider
    );

    const spender = await augustusContract.getTokenTransferProxy();
    return spender;
  },
  async buildTx(dexTrade: DexTrade, senderAddress: string, maxSlippage: number): Promise<any> {
    function getTokenAddress(symbol) {
      const currency = getCurrency(symbol);

      if(currency.equals(ETHER)) {
        return '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
      } else if(currency.type === CurrencyType.ERC20) {
        return (currency as TokenCurrency).address;
      } else {
        throw new Error('impossible token address');
      }
    }
    const { priceRoute } = dexTrade.dexMetadata;

    const srcToken = getTokenAddress(dexTrade.tradeRequest.inputCurrencySymbol);
    const destToken = getTokenAddress(dexTrade.tradeRequest.outputCurrencySymbol);
    const srcAmount = applySlippage(dexTrade.dexMetadata.priceRoute.srcAmount, dexTrade.tradeRequest.tradeExact === TradeExact.INPUT ? 0 : maxSlippage);
    const destAmount = applySlippage(dexTrade.dexMetadata.priceRoute.destAmount, dexTrade.tradeRequest.tradeExact === TradeExact.OUTPUT ? 0 : -maxSlippage);
    const receiver = undefined;
    const referrer = 'mooni';

    const txParams = await paraSwap.buildTx(srcToken, destToken, srcAmount, destAmount, priceRoute, senderAddress, referrer, receiver);
    if((txParams as APIError).message) throw new Error((txParams as APIError).message);

    return {
      to: (txParams as any).to,
      from: (txParams as any).from,
      gasLimit: BigNumber.from((txParams as any).gas),
      gasPrice: BigNumber.from((txParams as any).gasPrice),
      data: (txParams as any).data,
      value: BigNumber.from((txParams as any).value),
      chainId: (txParams as any).chainId,
    };
  }
};

export default ParaswapWrapper;