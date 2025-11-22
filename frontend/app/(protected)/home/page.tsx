import React from 'react';
import Dashboard from '@/components/Dashboard/Dashboard';
import { getTotals } from '@backend/services/card';
const Home = async () => {
  const totalDataCard = await getTotals();

  return (
    <div>
      <Dashboard totalDataCard={totalDataCard} />
    </div>
  );
};

export default Home;
