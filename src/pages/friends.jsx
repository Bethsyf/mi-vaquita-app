import { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderView from '../components/views/HeaderView';
import FooterView from '../components/views/FooterView';
import { BiSolidUserCircle } from 'react-icons/bi';


const FriendsPage = () => {
  const [users, setUsers] = useState([]);
  const name = sessionStorage.getItem('name');

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get( `${import.meta.env.VITE_API_URL}/users/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="sticky top-0 z-40">
          <HeaderView name={name} />
        </div>
        <div className="container mx-auto px-2 py-8 md:px-auto">
          <h1 className="text-3xl font-semibold text-center mb-8">
            Lista de Usuarios
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className={`bg-white shadow-md rounded-lg p-4 flex items-center`}
              >
                <div className="flex-shrink-0 h-20 w-20 p-2">
                  <BiSolidUserCircle className="h-full w-full object-cover rounded-full text-white bg-[#36190D]" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
                  <p className="text-gray-600 mb-4">{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <FooterView />
    </div>
  );
};

export default FriendsPage;
