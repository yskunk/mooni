import React, { useRef, useLayoutEffect } from 'react';
import { PluginPageContext } from '@burner-wallet/types';

import MooniWidget from '@usdlayer/widget';

import MooniPlugin from '../MooniPlugin';

const MooniPage: React.FC<PluginPageContext> = ({ burnerComponents, plugin }) => {
  const { Page } = burnerComponents;
  const usdlayerContainer = useRef<HTMLDivElement>(null);
  const _plugin = plugin as MooniPlugin;

  useLayoutEffect(() => {

    if(!usdlayerContainer.current) return;

    const container = usdlayerContainer.current;

    new MooniWidget({
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

export default MooniPage;
