import React, { useRef, useLayoutEffect } from 'react';
import { PluginPageContext } from '@burner-wallet/types';

import UsdlayerWidget from '@usdlayer/widget';

import UsdlayerPlugin from '../UsdlayerPlugin';

const UsdlayerPage: React.FC<PluginPageContext> = ({ burnerComponents, plugin }) => {
  const { Page } = burnerComponents;
  const usdlayerContainer = useRef<HTMLDivElement>(null);
  const _plugin = plugin as UsdlayerPlugin;

  useLayoutEffect(() => {

    if(!usdlayerContainer.current) return;

    const container = usdlayerContainer.current;

    new UsdlayerWidget({
      containerElement: container,
      ethereum: _plugin.getWeb3Provider(),
      appUrl: _plugin.appUrl,
    });

  }, []);

  return (
    <Page title="Cash out">
      <div ref={usdlayerContainer} style={{flex: 1, display: 'flex'}} />
    </Page>
  );
};

export default UsdlayerPage;
