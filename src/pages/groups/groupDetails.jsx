import { useEffect, useState } from 'react';
import HeaderView from '../../components/views/HeaderView';
import FooterView from '../../components/views/FooterView';
import ButtonControl from '../../components/controls/ButtonControl';
import CardView from '../../components/views/CardView';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const GroupDetailsPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [group, setGroup] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getGroup = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/v1/groups/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setGroup(response.data);
    } catch (error) {
      console.error('Error al obtener los detalles del grupo:', error);
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
      cancelButtonColor: '#36190D'
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
  

  useEffect(() => {
    getGroup();
  }, [id]);

  const handleExitGroup = () => {};
  const deleteExpense = () => {};
  const editExpense = () => {};

  return (
    <main>
      <HeaderView />
      <div className="font-fredoka">
        <div className="mx-auto my-4 flex justify-center">
          <ButtonControl
            type="button"
            text={'Nuevo Gasto'}
            styles={'text-xs font-bold px-2 mx-1 md:text-lg md:mx-10 md:px-8'}
          />
          <ButtonControl
            type="button"
            text={'Nuevo Amigo'}
            styles={'text-xs font-bold px-2 mx-1 md:text-lg md:mx-10 md:px-8'}
          />
          <ButtonControl
            type="button"
            text={'Editar Grupo'}
            styles={'text-xs font-bold px-2 mx-1 md:text-lg md:mx-10 md:px-8'}
          />
        </div>
        {group && (
          <CardView
            groupName={group.name}
            selectedColor={group.color}
            onExit={() => deleteGroup(group.id)}
          />
        )}
        <h2 className="font-bold text-[#FFA72F] border-b border-gray-300 pb-2 mb-2 mt-8 mx-3 md:text-2xl">
          GASTOS
        </h2>
        <div className="flex justify-center items-center flex-wrap">
          {expenses.map((expense) => (
            <CardView
              key={expense.id}
              groupName={expense.name}
              description={expense.description}
              value={expense.value}
              selectedColor={expense.color}
              onView={() => editExpense(group.id)}
              onDelete={() => deleteExpense(group.id)}
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
