import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import FriendsPage from './pages/friends';
import ExpensesPage from './pages/expenses';
import GroupsPage from './pages/groups';

const routes = [
  { path: '/', element: <FriendsPage /> },
  { path: '/friends', element: <FriendsPage /> },
  { path: '/expenses', element: <ExpensesPage /> },
  { path: '/groups', element: <GroupsPage /> },
];
const router = createBrowserRouter(routes);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
