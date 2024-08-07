import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import GroupsPage from './pages/groups';
import FriendsPage from './pages/friends';
import ExpensesPage from './pages/expenses';
import GroupDetailsPage from './pages/groups/groupDetails';
import Login from './pages/auth/login';
import Register from './pages/auth/signup';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFoundPage from './pages/notFoundPage';
import HomePage from './pages';

const routes = [
  // Rutas protegidas
  { path: '/', element: <ProtectedRoute><HomePage /></ProtectedRoute> },
  { path: '/friends', element: <ProtectedRoute><FriendsPage /></ProtectedRoute> },
  { path: '/expenses', element: <ProtectedRoute><ExpensesPage /></ProtectedRoute> },
  { path: '/groups', element: <ProtectedRoute><GroupsPage /></ProtectedRoute> },
  { path: '/groups/:id', element: <ProtectedRoute><GroupDetailsPage /></ProtectedRoute> },

  // Rutas públicas
  { path: '/auth/login', element: <Login /> },
  { path: '/auth/signup', element: <Register /> },

  // Ruta 404
  { path: '*', element: <NotFoundPage /> },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;