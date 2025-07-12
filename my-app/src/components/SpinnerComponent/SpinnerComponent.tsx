import React from 'react';
import { Spin } from 'antd';

const SpinnerComponent: React.FC = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
    <Spin size="large" />
  </div>
);

export default SpinnerComponent; 