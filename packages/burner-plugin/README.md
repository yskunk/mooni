# Burner Wallet Mooni Plugin

[![npm (scoped)](https://img.shields.io/npm/v/@usdlayer/burner-plugin)](https://www.npmjs.com/package/@usdlayer/burner-plugin)

Allows transfering funds from your Burner Wallet to your bank account. 

This plugin is using [Mooni](https://usdlayer.tech) app.

A Burner Wallet have been deployed with this plugin included: [Mooni Burner Wallet](https://burner.usdlayer.tech).

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
    plugins={[new MooniPlugin()]}
  />


ReactDOM.render(<BurnerWallet />, document.getElementById('root'));
```
