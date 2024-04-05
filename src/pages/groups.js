import React, { useState, useEffect } from 'react';
import HeaderView from '../components/views/HeaderView';
import FooterView from '../components/views/FooterView';
import CardView from '../components/views/CardView';
import ButtonControl from '../components/controls/ButtonControl';
import { useNavigate } from 'react-router-dom';
import CreateGroupView from '../components/views/CreateGroupView';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const createGroup = (groupName, groupColor) => {
    if (!groupName) {
      alert('Por favor ingrese un nombre de grupo');
      return;
    }

    fetch('http://localhost:5000/api/groups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: groupName,
        color: groupColor,
        description: 'Descripción del nuevo grupo',
        value: 0,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        getGroups();
        navigate('/groups');
      })
      .catch((error) => console.error('Error al crear grupo:', error));
  };

  const getGroups = () => {
    fetch('http://localhost:5000/api/groups')
      .then((response) => response.json())
      .then((data) => {
        const sortedGroups = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setGroups(sortedGroups.reverse());
      })
      .catch((error) => console.error('Error al obtener grupos:', error));
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <main>
      <HeaderView />

      <div className="flex justify-end mt-9">
        <ButtonControl
          text={'Nuevo Grupo'}
          styles={'mr-2'}
          onClickFn={handleModalToggle}
        />
        {isModalOpen && (
          <CreateGroupView
            onClose={handleModalToggle}
            onCreateGroup={createGroup}
          />
        )}
      </div>
      <div className="ml-3 mb-9">aqui va el saldo</div>

      <div className="flex justify-center items-center flex-wrap">
        {groups.map((group) => (
          <CardView
            key={group.id}
            groupName={group.name}
            description={group.description}
            value={group.value}
            selectedColor={group.color}
          />
        ))}
      </div>
      <FooterView />
    </main>
  );
};

export default GroupsPage;
