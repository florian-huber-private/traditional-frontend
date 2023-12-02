import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import TaskList from './components/TaskList';
import Categories from './components/Categories';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
	return (
		<Router>
			<NavigationBar />
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="/user-profile"
					element={<ProtectedRoute element={<UserProfile />} />}
				/>
				<Route
					path="/tasks"
					element={<ProtectedRoute element={<TaskList />} />}
				/>
				<Route
					path="/categories"
					element={<ProtectedRoute element={<Categories />} />}
				/>
				<Route path="*" element={<Navigate to="/login" />} />
			</Routes>
		</Router>
	);
};

export default App;
