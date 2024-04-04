import React, { useState, useEffect } from 'react';
import HeaderView from '../components/views/HeaderView';
import FooterView from '../components/views/FooterView';
import CardView from '../components/views/CardView';
import ButtonControl from '../components/controls/ButtonControl';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/groups')
      .then((response) => response.json())
      .then((data) => setGroups(data))
      .catch((error) => console.error('Error al obtener grupos:', error));
  }, []);

  return (
    <main>
      <HeaderView />
      <div className="flex justify-end mt-9">
        <ButtonControl text={'Nuevo Grupo'} styles={'mr-2'} onClickFn={''} />
      </div>
      <div className="ml-3 mb-9">aqui va el saldo</div>

      <div className="flex justify-center items-center flex-wrap">
        {groups.map((group) => (
          <CardView
            key={group.id}
            groupName={group.name}
            description={group.description}
            value={group.value}
          />
        ))}
      </div>
      <FooterView />
    </main>
  );
};

export default GroupsPage;
