import React from 'react';
import ReactDOM from 'react-dom';
import { eth, dai, usdc } from '@burner-wallet/assets';
import BurnerCore from '@burner-wallet/core';
import { LocalSigner } from '@burner-wallet/core/signers';
import { InfuraGateway } from '@burner-wallet/core/gateways';
import ModernUI from '@burner-wallet/modern-ui';

import MooniPlugin from '@usdlayer/burner-plugin';

const core = new BurnerCore({
  signers: [new LocalSigner()],
  gateways: [
    new InfuraGateway(process.env.REACT_APP_INFURA_KEY),
  ],
  assets: [eth, dai, usdc],
});

const BurnerWallet = () =>
  <ModernUI
    title="Mooni Burner Wallet"
    core={core}
    plugins={[new MooniPlugin({ appUrl: process.env.REACT_APP_MOONI_URL })]}
  />


ReactDOM.render(<BurnerWallet />, document.getElementById('root'));
