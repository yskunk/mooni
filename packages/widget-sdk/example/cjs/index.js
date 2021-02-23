const MooniWidget = require('@usdlayer/widget');

const mooni = new MooniWidget();

document.getElementById('modal-opener').onclick = () => mooni.open();
