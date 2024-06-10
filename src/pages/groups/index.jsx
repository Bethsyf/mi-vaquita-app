import React, { useState, useEffect } from 'react';
import HeaderView from '../../components/views/HeaderView';
import FooterView from '../../components/views/FooterView';
import CardView from '../../components/views/CardView';
import ButtonControl from '../../components/controls/ButtonControl';
import { useNavigate, useParams } from 'react-router-dom';
import CreateGroupView from '../../components/views/CreateGroupView';
import axios from 'axios';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getGroups = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {          
        navigate('/auth/login');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/v1/groups', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setGroups(response.data.groups);
    } catch (error) {
      console.error('Error al obtener grupos:', error);
    }
  };

  const createGroup = async (groupName, groupColor) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {          
        navigate('/auth/login');
        return;
      }
  
      const response = await axios.post('http://localhost:5000/api/V1/groups', {
        name: groupName,
        color: groupColor,        
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      getGroups();
      navigate('/groups');
    } catch (error) {
      console.error('Error al crear grupo:', error);
    }
  };
  

  const deleteGroup = async (id) => {
    try {
   
      const confirmDelete = window.confirm(
        '¿Estás seguro de que quieres eliminar este grupo?'
      );
  
      if (confirmDelete) {
        const token = sessionStorage.getItem('token');
        if (!token) {          
          navigate('/auth/login');
          return;
        }
  
        const response = await axios.delete(`http://localhost:5000/api/v1/groups/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        if (response.status === 200) {
          getGroups();
        } else {
          console.error('Error al eliminar el grupo');
        }
      }
    } catch (error) {
      console.error('Error al eliminar el grupo:', error);
    }
  };
  

  const viewGroup = (groupId) => {
    navigate(`/groups/${groupId}`);
  };

  useEffect(() => {
    getGroups();
  }, []);

  let totalBalanceText, totalBalanceColor, balanceLabel;
  if (totalBalance < 0) {
    totalBalanceText = `$${Math.abs(totalBalance)}`;
    totalBalanceColor = 'text-[#66B04C]';
    balanceLabel = 'Me deben: ';
  } else if (totalBalance >= 0) {
    totalBalanceText = `$${totalBalance}`;
    totalBalanceColor = 'text-[#FF2530]';
    balanceLabel = 'Debes: ';
  } else {
    totalBalanceText = '$0';
    totalBalanceColor = 'text-[#FF2530]';
    balanceLabel = 'Debes: ';
  }

  return (
    <main>
      <HeaderView />
      <div className="flex  justify-end mt-9 md:mr-20 ">
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
      <div className="ml-3 mb-8 md:ml-20">
        <p className="hidden font-bold text-[#36190D] md:flex md:text-3xl">
          GRUPOS
        </p>
        <p className="font-bold text-sm md:text-lg md:mt-4">{balanceLabel}</p>
        <p className={`font-bold text-xl md:text-2xl ${totalBalanceColor}`}>
          {totalBalanceText}
        </p>
      </div>
      <div className="flex justify-center items-center flex-wrap ">
        {groups.map((group) => (
          <CardView
            key={group.id}
            groupName={group.name}
            description={group.description}
            value={group.value}
            selectedColor={group.color}
            onView={() => viewGroup(group.id)}
            onDelete={() => deleteGroup(group.id)}
            onExit={false}
            styles={'shadow-lg'}
          />
        ))}
      </div>
      <FooterView />
    </main>
  );
};

export default GroupsPage;
