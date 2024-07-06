import { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderView from '../components/views/HeaderView';
import FooterView from '../components/views/FooterView';

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const name = sessionStorage.getItem('name');

  useEffect(() => {
    getExpenses();
  }, []);

  const getExpenses = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/v1/expenses/user/2', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  return (
    <div id="root" className="flex flex-col min-h-screen">
       <div className="sticky top-0 z-40">
       <HeaderView name={name} /></div>
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-semibold text-center mb-8 text-[#36190D]">Mis Gastos</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {expenses.map((expense) => (
              <div key={expense.id} className="bg-white shadow-md rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{expense.expensename}</h3>
                  <span className="text-gray-500 font-bold">Creado: {new Date(expense.createdat).toLocaleDateString()}</span>
                </div>
                <div className="mt-2">
                  <p className="text-gray-600">Grupo: {expense.groupname}</p>
                  <p className="text-gray-600">Monto total del gasto: ${expense.amount}</p>              
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

export default ExpensesPage;
