import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import GroupsPage from './pages/groups';
import FriendsPage from './pages/friends';
import ExpensesPage from './pages/expenses';
import GroupDetailsPage from './pages/groups/groupDetails';

const routes = [
  { path: '/', element: <GroupsPage /> },
  { path: '/friends', element: <FriendsPage /> },
  { path: '/expenses', element: <ExpensesPage /> },
  { path: '/groups', element: <GroupsPage /> },
  { path: '/groups/:id', element: <GroupDetailsPage /> },
];
const router = createBrowserRouter(routes);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
