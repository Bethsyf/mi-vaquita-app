import React from 'react';
import HeaderView from '../components/views/HeaderView';
import FooterView from '../components/views/FooterView';

const GroupsPage = () => {
  return (
    <main>
      <HeaderView />
      <p className="p-2">aqui va listado de grupos</p>
      <FooterView />
    </main>
  );
};

export default GroupsPage;
