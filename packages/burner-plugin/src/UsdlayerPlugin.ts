import { BurnerPluginContext, Plugin } from '@burner-wallet/types';
import UsdlayerPage from './ui/UsdlayerPage';
import UsdlayerElement from './ui/UsdlayerElement';

interface UsdlayerConstructor {
  appUrl?: string;
}

export default class UsdlayerPlugin implements Plugin {
  private pluginContext?: BurnerPluginContext;

  public appUrl?: string;

  constructor(props: UsdlayerConstructor) {
    this.appUrl = props.appUrl;
  }

  initializePlugin(pluginContext: BurnerPluginContext) {
    this.pluginContext = pluginContext;

    pluginContext.addPage('/usdlayer', UsdlayerPage);
    pluginContext.addButton('apps', 'Cash out', '/usdlayer', {
      description: 'Transfer funds to your bank account',
    });

    pluginContext.addElement('home-middle', UsdlayerElement);
  }

  getWeb3Provider() {
    const web3 = this.pluginContext!.getWeb3('1');
    return web3.currentProvider;
  }
}
