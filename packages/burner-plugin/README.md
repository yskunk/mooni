# Burner Wallet Usdlayer Plugin

[![npm (scoped)](https://img.shields.io/npm/v/@usdlayer/burner-plugin)](https://www.npmjs.com/package/@usdlayer/burner-plugin)

Allows transfering funds from your Burner Wallet to your bank account. 

This plugin is using [Usdlayer](https://usdlayer.com) app.

A Burner Wallet have been deployed with this plugin included: [Usdlayer Burner Wallet](https://burner.usdlayer.com).

## Usage

Install package:

```
yarn add @usdlayer/burner-plugin
```

Add plugin to Burner Wallet

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { eth, dai, usdc } from '@burner-wallet/assets';
import BurnerCore from '@burner-wallet/core';
import { LocalSigner } from '@burner-wallet/core/signers';
import { InfuraGateway } from '@burner-wallet/core/gateways';
import ModernUI from '@burner-wallet/modern-ui';

import UsdlayerPlugin from '@usdlayer/burner-plugin';

const core = new BurnerCore({
  signers: [new LocalSigner()],
  gateways: [
    new InfuraGateway(process.env.REACT_APP_INFURA_KEY),
  ],
  assets: [eth, dai, usdc],
});

const BurnerWallet = () =>
  <ModernUI
    title="Usdlayer Burner Wallet"
    core={core}
    plugins={[new UsdlayerPlugin()]}
  />


ReactDOM.render(<BurnerWallet />, document.getElementById('root'));
```
