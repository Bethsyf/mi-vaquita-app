import React from 'react';
import HeaderView from '../components/views/HeaderView';
import FooterView from '../components/views/FooterView';

const FriendsPage = () => {
  return (
    <main>
      <HeaderView />
      <p className="p-2">aqui va listado de amigos</p>
      <FooterView />
    </main>
  );
};

export default FriendsPage;
