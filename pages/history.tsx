import React from 'react';
import Layout from '../layout/layout';

const History = () => {
  const fetchHistory = async () => {
    const response = await fetch('/api/previousShoppingHistory');
    const data = await response.json();
    return data;
  };

  return <Layout></Layout>;
};

export default History;
