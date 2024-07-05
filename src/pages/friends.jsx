import  { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderView from '../components/views/HeaderView';
import FooterView from '../components/views/FooterView';
import logo from '../assets/logo.svg';

const FriendsPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try { 
      const token = sessionStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/v1/users/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen">
      <HeaderView />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-center mb-8">Lista de Amigos</h1>
        <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {users.map((user) => (
            <div key={user.id} className="bg-white shadow-md rounded-lg p-4 flex items-center">
              <div className="flex-shrink-0 h-20 w-20 p-2">
                <img
                  className="h-full w-full object-cover rounded-full"
                  src={logo}
                  alt="Avatar"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
                <p className="text-gray-600 mb-4">Email: {user.email}</p>
                {/* Agrega más detalles según tus necesidades */}
              </div>
            </div>
          ))}
        </div>
      </div>
      <FooterView />
    </main>
  );
};

export default FriendsPage;
