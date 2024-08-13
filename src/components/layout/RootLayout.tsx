'use client';
import { store } from '../redux/store';
import { Provider } from 'react-redux';

import React from 'react';

const RootLayouts = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default RootLayouts;
