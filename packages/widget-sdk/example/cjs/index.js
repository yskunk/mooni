const MooniWidget = require('@usdlayer/widget');

const usdlayer = new MooniWidget();

document.getElementById('modal-opener').onclick = () => usdlayer.open();
