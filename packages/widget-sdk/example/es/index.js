import UsdlayerWidget from '@usdlayer/widget';

const usdlayer = new UsdlayerWidget();

document.getElementById('modal-opener').onclick = () => usdlayer.open();
