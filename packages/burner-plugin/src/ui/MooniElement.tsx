import React, { useEffect, useState } from 'react';
import { PluginElementContext } from '@burner-wallet/types';
import UsdlayerPlugin from '../UsdlayerPlugin';

const UsdlayerElement: React.FC<PluginElementContext> = ({ plugin }) => {
  return (
    <div>
      <div>Injected plugin element</div>
  </div>
);
};

export default UsdlayerElement;
