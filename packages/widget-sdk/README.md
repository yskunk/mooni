# USD Layer


Widget allows to quickly add Usdlayer into any web app in minutes.

The widget can either appear as a modal on top of an app, or included inside an HTML element.

If the hosting app already has a connected user with web3, this wallet can be forwarded to the widget.

## 🎁 Quick start

#### Install

`yarn add @usdlayer/widget`

#### Start widget

```javascript
// Import package
import UsdlayerWidget from '@usdlayer/widget';

// Instanciate the widget
const usdlayer = new UsdlayerWidget();

// Open the widget as a modal when you want it
usdlayer.open();
```

## 🎛 Reference

#### Instanciation

- `new UsdlayerWidget(opts)`  
  Instanciate a Usdlayer widget.

`opts.containerElement`: Include Usdlayer inside of an HTML element on your website. If not set, the widget will appear as a modal.

`opts.ethereum`: A standard JSON-RPC provider. This is useful if the hosting app already authenticated the web3 wallet of the user, so he doesn't have to login again on Usdlayer.

`opts.token`: Automatically select a token to sell in Usdlayer. Must be an ERC20 contract address.

#### If used as a modal:

- `usdlayer.open()`  
  Opens the Usdlayer widget modal.

* `usdlayer.close()`  
  Closes the Usdlayer widget modal. Not mandatory, a button is present to enable the user to close it.

## Additional information

### Import on different module systems

- ES6

`import UsdlayerWidget from '@usdlayer/widget';`

- CommonJS

`const UsdlayerWidget = require('@usdlayer/widget');`


- UMD

```
<!-- not yet published! -->
<script src="https://unpkg.com/@usdlayer/widget"></script>
<script>
  UsdlayerWidget.open()
</script>
```

## 💻 Development

```
# Install dependencies
yarn

# Build package
yarn build

# Publish package
npm publish
```

## License 

GPL-3.0
