import { useState, useEffect } from 'react';
import HeaderView from '../../components/views/HeaderView';
import FooterView from '../../components/views/FooterView';
import ButtonControl from '../../components/controls/ButtonControl';
import CardGroupView from '../../components/views/CardGroupView';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import ModalAddMember from '../../components/views/ModalAddMember';
import FormGroupView from '../../components/views/FormGroupView';
import CardExpenseView from '../../components/views/CardExpenseView';
import ModalAddExpense from '../../components/views/ModalAddExpense';

const GroupDetailsPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [group, setGroup] = useState(null);
  const [participants, setParticipants] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalExpensesOpen, setIsModalExpensesOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [totalAmountDue, setTotalAmountDue] = useState({
    difference: 0,  
    message: 'Balanceado',
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const name = sessionStorage.getItem('name');
  const userId = sessionStorage.getItem('userId');
  

  const getGroup = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(
       `${import.meta.env.VITE_API_URL}/groups/${id}`,
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
      
      
  const handleOpenModalAddMember = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        navigate('/auth/login');
        return;
      }

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          groupId: group.id,
        },
      });

      if (Array.isArray(response.data) && response.data.length > 0) {
        setUsers(response.data);
        setLoading(false);
        setIsModalOpen(true);
      } else {
        console.warn('No hay usuarios disponibles para agregar');
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: 'No hay más amigos para agregar a este grupo',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
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

  const handleCloseModalMember = () => {
    setIsModalOpen(false);
  };

  const handleCloseModalExpense = () => {
    setIsModalExpensesOpen(false);
  };

 
  const handleOpenModalEdit = async () => {
    try {
      await getGroup(id);
      setIsEditModalOpen(true);
    } catch (error) {
      console.error('Error al abrir el modal de edición:', error);
    }
  };

  const handleCloseModalEdit = () => {
    setIsEditModalOpen(false);
  };

  const getParticipants = async (groupId) => {
   
    try {
      const token = sessionStorage.getItem('token');     
      if (!token) {
        navigate('/auth/login');
        return;
      }     
      const response = await axios.get(
       `${import.meta.env.VITE_API_URL}/groups/participants/${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    
      if (response.status === 200) {
        setParticipants(response.data.participants);   
      } else {
        console.error('Error al listar los participantes');
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Error al listar los gastos',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error('Error al listar los participantes:', error);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Error al listar los gastos',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  const handleOpenModalAddExpense = async () => {
    getParticipants()
    getExpenses()
    setIsModalExpensesOpen(!isModalExpensesOpen);    
  };

  

  const handleAddMember = async (emails) => {  
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        navigate('/auth/login');
        return;
      }

      const response = await axios.post(
       `${import.meta.env.VITE_API_URL}/groups/add`,
        {
          groupId: id,
          userEmails: emails,
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

        getGroup(id);
        handleCloseModalMember();
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
  

  const handleEditGroup = async (groupId, groupName, groupColor) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        navigate('/auth/login');
        return;
      }

      const upperCaseGroupName = groupName.toUpperCase();

      const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/groups/${groupId}`,
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
        getGroup(id);
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
           `${import.meta.env.VITE_API_URL}/groups/${id}`,
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

  const getExpenses = async (groupId) => {   
    try {
      const token = sessionStorage.getItem('token');     
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/groups/expenses/${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setExpenses(response.data.expenses);
      let totalMeDeben = 0;
      let totalDebo = 0;
  
      response.data.expenses.forEach(expense => {
        if (expense.amountDue.message === 'Me deben') {
          totalMeDeben += expense.amountDue.value;
        } else if (expense.amountDue.message === 'Debo') {
          totalDebo += expense.amountDue.value;
        }
      });
  
     
      const difference = totalMeDeben - totalDebo;
      const message = difference > 0 ? 'Me deben' : difference < 0 ? 'Debo' : 'Balanceado';
  
 
      setTotalAmountDue({
        difference: Math.abs(difference),       
        message: message,
      });

    } catch (error) {
      console.error('Error al obtener los gastos del grupo:', error);
    }
  };

  const handleAddExpense = async (values) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        navigate('/auth/login');
        return;
      }

      const email = values.paidByUserId;

      if (!email) {
        console.error('Email is required');
        return;
      }

      const userResponse = await axios.get(
       `${import.meta.env.VITE_API_URL}/users/email/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userIdPaid = userResponse.data.id;

      const selectedEmails = values.participants;
      const participantObjects = selectedEmails.map((email) => {       
        const participantId = participants.ids[participants.emails.indexOf(email)]; 
        return {
          
          userId: participantId,
        };
      });
      const upperCaseExpenseName = values.expenseName.toUpperCase(); 
      
      const response = await axios.post(
       `${import.meta.env.VITE_API_URL}/expenses`,
        {
          groupId: group.id,
          expenseName: upperCaseExpenseName,
          amount: values.amount,
          paidByUserId: userIdPaid,
          participants: participantObjects, 
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
          title: 'Gasto creado exitosamente',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
        getExpenses()
        handleCloseModalExpense()
      } else {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Error al crear gasto',
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
          'Expense with the same name already exists in this group'
        )
      ) {
        Swal.fire({        
          icon: 'error',               
          title: 'El nombre del gasto ya existe en este grupo, intenta con otro nombre',    
          showConfirmButton: true,  
          confirmButtonColor: '#4c84a4'  
        });
      } else {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Error al crear gasto',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    }
  };
  

  const deleteExpense = async (expenseId) => {
    Swal.fire({
      title: 'Eliminar gasto',
      text: '¿Está seguro de que desea borrar el gasto? Toda la información se perderá',
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
           `${import.meta.env.VITE_API_URL}/expenses/${expenseId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          if (response.status === 200) {           
            setExpenses(expenses.filter(expense => expense.id !== expenseId));
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'Gasto eliminado exitosamente',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
            getExpenses()
          } else {
            console.error('Error al eliminar el gasto');
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: 'Error al eliminar el gasto',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
          }
        } catch (error) {
          console.error('Error al eliminar el gasto:', error);
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'Error al eliminar el gasto',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      }
    });
  };
  

  const viewExpense = (expenseId) => {
    console.log('click para ver detalle de gastos ', expenseId);
  };
 
  useEffect(() => {   
    const fetchData = () => {    
      getGroup(id)
      if (id) {
     getExpenses(id)
      getParticipants(id)
      }
    };

    fetchData();
  },[id]);

  
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <HeaderView name={name} />
          <div className="font-fredoka ">
            <div className="mx-auto my-4 flex justify-center">
              <ButtonControl
                type="button"
                text={'Nuevo Gasto'}
                styles={'text-xs font-bold px-2 mx-1 md:text-lg md:mx-10 md:px-8'}
                onClickFn={() => handleOpenModalAddExpense()}
              />
              <ButtonControl
                type="button"
                text={'Nuevo Amigo'}
                styles={'text-xs font-bold px-2 mx-1 md:text-lg md:mx-10 md:px-8'}
                onClickFn={() => handleOpenModalAddMember()}
              />
              <ButtonControl
                type="button"
                text={'Editar Grupo'}
                styles={'text-xs font-bold px-2 mx-1 md:text-lg md:mx-10 md:px-8'}
                onClickFn={() => handleOpenModalEdit(true)}
              />
            </div>
            {group && participants && (
              <CardGroupView
                groupName={group.name}
                participants={participants.count}
                message={totalAmountDue.message}
                amountDue={totalAmountDue.difference}
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
                onClose={handleCloseModalMember}
              />
            )}
            {isModalExpensesOpen && (
              <ModalAddExpense
                userId={userId}
                groupName={group.name}
                loading={loading}
                onSubmit={handleAddExpense}
                onClose={handleCloseModalExpense}
                participants={participants.emails}
              />
            )}
  
            {isEditModalOpen && (
              <FormGroupView
                onClose={() => setIsEditModalOpen(false)}
                onEditGroup={handleEditGroup}
                groupToEdit={group}
              />
            )}
  
            <div className="flex justify-center items-center flex-wrap">
              {expenses.map((expense) => (
                <CardExpenseView
                  key={expense.id}
                  userId={userId}
                  expenseName={expense.expenseName}
                  paidBy={expense.paidBy}
                  amount={expense.amount}
                  message={expense.amountDue.message}
                  amountDue={expense.amountDue.value}
                  participants={expense.participantsCount}
                  onView={() => viewExpense(expense.id)}
                  onDelete={() => deleteExpense(expense.id)}
                  styles={'shadow-lg'}
                />
              ))}
            </div>
          </div>
        </main>
        <FooterView />
      </div>
    );
  };


export default GroupDetailsPage;
