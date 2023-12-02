import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { logoutUser } from '../store/user/userThunks';

const NavigationBar: React.FC = () => {
	const user = useSelector((state: RootState) => state.user.user);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logoutUser());
		navigate('/login');
	};

	return (
		<Navbar bg="light" expand="lg">
			<Container fluid>
				<Navbar.Brand to="/" as={Link}>
					Task Manager
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						{!user ? (
							<>
								<Nav.Link to="/login" as={Link}>
									Login
								</Nav.Link>
								<Nav.Link to="/register" as={Link}>
									Register
								</Nav.Link>
							</>
						) : (
							<>
								<Nav.Link to="/user-profile" as={Link}>
									Profile
								</Nav.Link>
								<Nav.Link to="/tasks" as={Link}>
									Tasks
								</Nav.Link>
								<Nav.Link to="/categories" as={Link}>
									Categories
								</Nav.Link>
								<Nav.Link
									to="/logout"
									as={Link}
									onClick={handleLogout}>
									Logout
								</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavigationBar;
