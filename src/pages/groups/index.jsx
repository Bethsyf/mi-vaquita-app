import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import HeaderView from '../../components/views/HeaderView';
import FooterView from '../../components/views/FooterView';
import CardView from '../../components/views/CardView';
import ButtonControl from '../../components/controls/ButtonControl';
import FormGroupView from '../../components/views/FormGroupView';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = sessionStorage.getItem('userId');
  const name = sessionStorage.getItem('name')

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

      const response = await axios.get(`http://localhost:5000/api/v1/groups`, {
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
        'http://localhost:5000/api/v1/groups',
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
        })
        getGroups()
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
        error.response.data.error.includes(
          'Group with the same name already exists'
        )
      ) {
        Swal.fire({        
          icon: 'error',               
          title: 'El nombre de grupo ya existe, intenta con otro nombre',    
          showConfirmButton: true,  
          confirmButtonColor: '#4c84a4'  
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

  const exitGroup = ({id}) => {console.log('aqui logica para salir de grupo', id)};

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
      <div className="sticky top-0 z-40 bg-white ">
        <HeaderView name={name}/>
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
          <p className="font-bold text-sm md:text-lg md:mt-4">{balanceLabel}</p>
          <p className={`font-bold text-xl md:text-2xl ${totalBalanceColor}`}>
            {totalBalanceText}
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center flex-wrap">
        {groups.map((group) => (
          <CardView
            key={group.id}
            groupName={group.name}
            description={group.description}
            value={group.value}
            selectedColor={group.color}
            onView={() => viewGroup(group.id)}           
            onExit={() => exitGroup(group.id)}
            styles={'shadow-lg'}
          />
        ))}
      </div>
      <FooterView />
    </main>
  );
};

export default GroupsPage;
