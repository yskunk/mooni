import { ChainId } from '@uniswap/sdk';

interface IConfig {
  chainId: ChainId;
  infuraId: string;
  portisAppId: string;
  fortmaticId: string;
  logRocketId: string;
  gtagId: string;
  enableAnalytics: boolean;
  referralSharing: number;
  discordInviteUrl: string;
  private: {
    bityClientId: string;
    bityClientSecret: string;
    bityPartnerFee: number;
  };
}

function parseEnv<T extends string | number | boolean>(v: any, defaultValue: T): T {
  if (!v) return defaultValue;

  if (typeof defaultValue === 'number') {
    return Number(v) as T;
  }
  if (typeof defaultValue === 'boolean') {
    return Boolean(v === 'true') as T;
  }
  return v as T;
}
//

const config: IConfig = {
  chainId: parseEnv(process.env.REACT_APP_CHAIN_ID, ChainId.MAINNET),
  infuraId: parseEnv(process.env.REACT_APP_INFURA_ID, '653725ca4251410eafca128ba7e880c2'),
  portisAppId: parseEnv(
    process.env.REACT_APP_PORTIS_APP_ID,
    'e81e7794-66cd-4499-bfb0-5a3875d3bcef'
  ),
  fortmaticId: parseEnv(process.env.REACT_APP_FORTMATIC_ID, 'pk_live_1448D7EC14FD9FF7'),
  logRocketId: parseEnv(process.env.REACT_APP_LOG_ROCKET_ID, 'manifold-finance/usd-layer'),
  enableAnalytics: parseEnv(process.env.REACT_APP_ENABLE_ANALYTICS, false),
  gtagId: parseEnv(process.env.REACT_APP_GTAG_ID, ''),
  discordInviteUrl: 'https://t.me/manifoldfinance',
  referralSharing: 0.1,
  private: {
    bityClientId: parseEnv(process.env.PRIVATE_BITY_CLIENT_ID, ''),
    bityClientSecret: parseEnv(process.env.PRIVATE_BITY_CLIENT_SECRET, ''),
    bityPartnerFee: parseEnv(process.env.PRIVATE_BITY_FEE, 0),
  },
};

export default config;
