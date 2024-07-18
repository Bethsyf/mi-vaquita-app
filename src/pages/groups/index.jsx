import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import HeaderView from '../../components/views/HeaderView';
import FooterView from '../../components/views/FooterView';
import CardGroupView from '../../components/views/CardGroupView';
import ButtonControl from '../../components/controls/ButtonControl';
import FormGroupView from '../../components/views/FormGroupView';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);    
  const [isModalOpen, setIsModalOpen] = useState(false);
  const name = sessionStorage.getItem('name');
  const [totalAmountDue, setTotalAmountDue] = useState({
    difference: 0,
    message: 'Balanceado',
  });
  const navigate = useNavigate();
  
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

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/groups`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGroups(response.data.groups);
    } catch (error) {
      console.error('Error al obtener grupos:', error);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Error al obtener grupos',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  const createGroup = async (groupName, groupColor) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        navigate('/auth/login');
        return;
      }

      const upperCaseGroupName = groupName.toUpperCase();

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/groups`,
        {
          name: upperCaseGroupName,
          color: groupColor,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Grupo creado exitosamente',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        getGroups();
      } else {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Error al crear grupo',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 500 &&
        error.response.data.error.includes('Group with the same name already exists')
      ) {
        Swal.fire({
          icon: 'error',
          title: 'El nombre de grupo ya existe, intenta con otro nombre',
          showConfirmButton: true,
          confirmButtonColor: '#4c84a4',
        });
      } else {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Error al crear grupo',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    }
  };

  const viewGroup = (groupId) => {
    navigate(`/groups/${groupId}`);
  };

  const exitGroup = (groupId) => {
    console.log('Lógica para salir de grupo aquí', groupId);
  };

  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    const calculateTotalAmountDue = () => {
      let totalMeDeben = 0;
      let totalDebo = 0;

      groups.forEach((group) => {
        if (group.totalAmountMessage === 'Me deben') {
          totalMeDeben += group.totalAmountDue;
        } else if (group.totalAmountMessage === 'Debo') {
          totalDebo += group.totalAmountDue;
        }
      });

      const difference = totalMeDeben - totalDebo;
      const message = difference > 0 ? 'Me deben' : difference < 0 ? 'Debo' : 'Balanceado';

      setTotalAmountDue({
        difference: Math.abs(difference),
        message: message,
      });
    };

    calculateTotalAmountDue();
  }, [groups]);

  const getMessageColorClass = (message) => {
    switch (message) {
      case 'Debo':
        return 'text-red-500';
      case 'Me deben':
        return 'text-blue-500';
      case 'Balanceado':
        return 'text-gray-500';
      default:
        return 'text-black';
    }
  };

  const getBalanceLabel = (message) => {
    switch (message) {
      case 'Debo':
        return 'Debo: ';
      case 'Me deben':
        return 'Me deben: ';
      case 'Balanceado':
        return 'Balanceado: ';
      default:
        return 'Balanceado: ';
    }
  };

  const balanceLabel = getBalanceLabel(totalAmountDue.message);
  const totalBalanceText = `$${totalAmountDue.difference.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
  const totalBalanceColor = getMessageColorClass(totalAmountDue.message);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="sticky top-0 z-40 bg-white">
          <HeaderView name={name} />
          <div className="flex justify-end mt-9 md:mr-20">
            <ButtonControl
              type="button"
              text={'Nuevo Grupo'}
              styles={'mr-2'}
              onClickFn={handleModalToggle}
            />
            {isModalOpen && (
              <FormGroupView
                onClose={handleModalToggle}
                onCreateGroup={createGroup}
              />
            )}
          </div>
          <div className="ml-3 md:ml-20">
            <p className="hidden font-bold text-[#36190D] md:flex md:text-3xl">
              GRUPOS
            </p>
            <p className={`font-bold text-xl md:text-lg md:mt-4 ${totalBalanceColor}`}>
              {balanceLabel}
            </p>
            <p className={`font-bold text-xl md:text-2xl ${totalBalanceColor}`}>
              {totalBalanceText}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center flex-wrap">
          {groups.map((group) => (
            <CardGroupView
              key={group.id}
              groupName={group.name}
              participants={group.participant_count}
              message={group.totalAmountMessage}
              amountDue={group.totalAmountDue}
              selectedColor={group.color}
              onView={() => viewGroup(group.id)}
              onExit={() => exitGroup(group.id)}
              styles={'shadow-lg'}
            />
          ))}
        </div>
      </main>
      <FooterView />
    </div>
  );
};

export default GroupsPage;
