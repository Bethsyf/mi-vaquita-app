import React from 'react';
import HeaderView from '../components/views/HeaderView';
import FooterView from '../components/views/FooterView';

const ExpensesPage = () => {
  return (
    <main>
      <HeaderView />
      <p className="p-2">aqui va listado de gastos</p>
      <FooterView />
    </main>
  );
};

export default ExpensesPage;
