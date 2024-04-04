import React, { useState, useEffect } from 'react';
import HeaderView from '../components/views/HeaderView';
import FooterView from '../components/views/FooterView';
import CardView from '../components/views/CardView';

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
