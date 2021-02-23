# 🔵 Usdlayer

Easily transfer funds from your crypto wallet to your bank account.

[🖼 Landing page](https://usdlayer.com)

[🚀 Web Application](https://app.usdlayer.com)

[📒 Documentation](https://doc.usdlayer.com)

[🔮 Frontend integration](#-frontend-integration)

[📎 Burner Wallet Plugin](#-burner-wallet-plugin)

> This is experimental software under active development.

## 📃 Presentation

Usdlayer is a simple solution for end-users, marketplaces or DAOs to cash out cryptos in fiat directly to a bank account.

### Features

- **Web wallets** Login with any web3-compatible wallet _\(Metamask, WalletConnect, etc...\)_
- **Bank transfer** Receive funds in your bank account in EUR/CHF \(thanks to [Bity](https://bity.com)\)
- **Quick checkout** No need to register accounts and pass long KYC verifications. Subject to amount limits.

[🚀 Use Usdlayer now](https://app.usdlayer.com)

### Use cases

- **Crypto owner** Any crypto holder can convert some crypto into fiat into their bank account
- **dApps** Decentralized applications that makes users generate revenue can allow them to exit and withdraw funds into their bank account \(games, decentralized marketplaces, via a widget\)

## 🔮 Frontend integration

You can easily integrate Usdlayer into your web application and quickly enable your users to cash out their crypto.

This is useful for marketplace builders which want to increase conversion rate by allowing their users to withdraw the profit they make on the app.

An [example app](https://integration-example.usdlayer.com) including Usdlayer widget is available to let you try it out.

### 🎁 Quick start

#### Install

`yarn add @usdlayer/widget`

#### Start widget

```javascript
// Import package
import UsdlayerWidget from '@usdlayer/widget';

// Instanciate the widget
const usdlayer = new UsdlayerWidget();

// Open the widget when you want to show Usdlayer
usdlayer.open();
```

Check [the package](./packages/widget-sdk) for full API documentation.

## 📎 Burner Wallet Plugin

A plugin for [Burner Wallet](https://github.com/burner-wallet/burner-wallet-2/) have been done to easily add the possibilty to cash out.

We have our own [Usdlayer Burner Wallet](https://burner.usdlayer.com) deployed if you want to try it.

Please refer to the [plugin documentation](packages/burner-plugin) for integration instructions.

## 💻 Development

This repo is a monorepo including different apps and libraries for running usdlayer which are located under folders in `packages/*`.

### App

The app is in the `packages/app` folder.

#### Start tooling

```bash
# Install dependencies
yarn

# Start dev server
yarn start

# Build production bundle
yarn build
```

### Burner plugin

#### Start tooling

```bash
# Install dependencies
yarn

# Start dev server
yarn start:burner

```
