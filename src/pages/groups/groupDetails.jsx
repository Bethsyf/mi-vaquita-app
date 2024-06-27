import { useState, useEffect } from 'react';
import HeaderView from '../../components/views/HeaderView';
import FooterView from '../../components/views/FooterView';
import ButtonControl from '../../components/controls/ButtonControl';
import CardView from '../../components/views/CardView';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import ModalAddMember from '../../components/views/ModalAddMember';
import CreateGroupView from '../../components/views/CreateGroupView';

const GroupDetailsPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [group, setGroup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const navigate = useNavigate();
  const { id } = useParams();
  const name = sessionStorage.getItem('name')

  const getGroup = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:5000/api/v1/groups/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGroup(response.data);
    } catch (error) {
      console.error('Error al obtener los detalles del grupo:', error);
    }
  };

  const handleOpenModalAdd = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        navigate('/auth/login');
        return;
      }
      const response = await axios.get('http://localhost:5000/api/v1/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        console.error(
          'La respuesta de la API no contiene usuarios válidos:',
          response.data
        );
        setUsers([]);
      }
      setLoading(false);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
      setLoading(false);
      setUsers([]);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Error al obtener usuarios',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenModalEdit = async () => {
    try {
      await getGroup(); 
      setIsEditModalOpen(true); 
    } catch (error) {
      console.error('Error al abrir el modal de edición:', error);
    
    }
  };

  const handleCloseModalEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleAddMember = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        navigate('/auth/login');
        return;
      }
  
      const response = await axios.post(
        `http://localhost:5000/api/v1/groups/add`, 
        {
          groupId: id, 
          userIdToAdd: users[0].id
        }, 

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Miembros agregados exitosamente',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });

        getGroup();
        handleCloseModal();
      } else {
        console.error('Error al agregar miembros');
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Error al agregar miembros',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error('Error al agregar miembros:', error);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Error al agregar miembros',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };
  console.log(users[1])
  const handleEditGroup = async (groupId, groupName, groupColor) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        navigate('/auth/login');
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/api/v1/groups/${groupId}`,
        {
          name: groupName,
          color: groupColor,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Grupo editado exitosamente',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        getGroup();
        handleCloseModalEdit();
      } else {
        console.error('Error al editar el grupo');
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Error al editar el grupo',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error('Error al editar el grupo:', error);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Error al editar el grupo',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  const deleteGroup = async (id) => {
    Swal.fire({
      title: 'Eliminar grupo',
      text: '¿Está seguro de que desea borrar el grupo? Toda la información se perderá',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      confirmButtonColor: '#36190D',
      cancelButtonColor: '#36190D',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = sessionStorage.getItem('token');
          if (!token) {
            navigate('/auth/login');
            return;
          }

          const response = await axios.delete(
            `http://localhost:5000/api/v1/groups/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            navigate('/groups');
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'Grupo eliminado exitosamente',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
          } else {
            console.error('Error al eliminar el grupo');
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: 'Error al eliminar el grupo',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
          }
        } catch (error) {
          console.error('Error al eliminar el grupo:', error);
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'Error al eliminar el grupo',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      }
    });
  };

  const handleExitGroup = () => {
  
  };

  const deleteExpense = (expenseId) => {

  };

  const editExpense = (expenseId) => {

  };

  useEffect(() => {
    getGroup();
  }, [id]);

  return (
    <main>
     <HeaderView name={name} />
      <div className="font-fredoka">
        <div className="mx-auto my-4 flex justify-center">
          <ButtonControl
            type="button"
            text={'Nuevo Gasto'}
            styles={'text-xs font-bold px-2 mx-1 md:text-lg md:mx-10 md:px-8'}
            onClickFn={() => handleOpenModalEdit()} 
          />
          <ButtonControl
            type="button"
            text={'Nuevo Amigo'}
            styles={'text-xs font-bold px-2 mx-1 md:text-lg md:mx-10 md:px-8'}
            onClickFn={() => handleOpenModalAdd()} 
          />
          <ButtonControl
            type="button"
            text={'Editar Grupo'}
            styles={'text-xs font-bold px-2 mx-1 md:text-lg md:mx-10 md:px-8'}
            onClickFn={() => handleOpenModalEdit(true)} 
          />
        </div>
        {group && (
          <CardView
            groupName={group.name}
            selectedColor={group.color}
            onDelete={() => deleteGroup(group.id)}
          />
        )}

        <h2 className="font-bold text-[#FFA72F] border-b border-gray-300 pb-2 mb-2 mt-8 mx-3 md:text-2xl">
          GASTOS
        </h2>

        {isModalOpen && (
          <ModalAddMember
            groupName={group.name}
            users={users}
            loading={loading}
            onSubmit={handleAddMember}
            onClose={handleCloseModal}
          />
        )}

        {isEditModalOpen && (
       
          <CreateGroupView
            onClose={() => setIsEditModalOpen(false)}
            onEditGroup={handleEditGroup}
            groupToEdit={group}
          />
        )}

        <div className="flex justify-center items-center flex-wrap">
          {expenses.map((expense) => (
            <CardView
              key={expense.id}
              groupName={expense.name}
              description={expense.description}
              value={expense.value}
              selectedColor={expense.color}
              onView={() => editExpense(expense.id)}
              onDelete={() => deleteExpense(expense.id)}
              onExit={false}
              styles={'shadow-lg'}
            />
          ))}
        </div>
      </div>
      <FooterView />
    </main>
  );
};

export default GroupDetailsPage;