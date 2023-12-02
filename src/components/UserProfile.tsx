import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchUserProfile,
	updateUserProfile,
	updateUserPassword,
	deleteUserProfile,
} from '../store/user/userThunks';
import {
	Container,
	Form,
	Button,
	FormGroup,
	FormControl,
	FormLabel,
	Row,
	Col,
	Spinner,
} from 'react-bootstrap';
import { AppDispatch, RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserProfile = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const user = useSelector((state: RootState) => state.user.user);
	const isLoading = useSelector((state: RootState) => state.user.isLoading);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');

	const editForm = useRef<HTMLFormElement | null>(null);
	const passwordForm = useRef<HTMLFormElement | null>(null);

	useEffect(() => {
		dispatch(fetchUserProfile());
	}, [dispatch]);

	useEffect(() => {
		if (user) {
			setUsername(user.username || '');
			setEmail(user.email || '');
		}
	}, [user]);

	const handleUpdateProfile = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(updateUserProfile({ username, email }));
	};

	const handleUpdatePassword = async (e: React.FormEvent) => {
		e.preventDefault();
		const result = await dispatch(
			updateUserPassword({
				old_password: oldPassword,
				new_password: newPassword,
			})
		);
		if (updateUserPassword.fulfilled.match(result)) {
			setOldPassword('');
			setNewPassword('');
		}
	};

	const handleDeleteProfile = async () => {
		if (window.confirm('Are you sure you want to delete your profile?')) {
			const result = await dispatch(deleteUserProfile());
			if (deleteUserProfile.fulfilled.match(result)) {
				navigate('/login');
			}
		}
	};

	if (isLoading) {
		return (
			<Container className="text-center py-5">
				<Spinner animation="border" />
			</Container>
		);
	}

	if (!user) {
		toast.warn('No User found...');
		return (
			<Container className="text-center py-5">
				<Button
					type="button"
					variant="primary"
					onClick={() => navigate('/login')}>
					Log in
				</Button>
			</Container>
		);
	}

	return (
		<Container>
			<h2>User Profile</h2>
			<Row>
				<Col md={6}>
					<Form
						onSubmit={handleUpdateProfile}
						className="mb-3"
						ref={editForm}>
						<FormGroup className="mb-3">
							<FormLabel>Username</FormLabel>
							<FormControl
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</FormGroup>
						<FormGroup className="mb-3">
							<FormLabel>Email</FormLabel>
							<FormControl
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</FormGroup>
						<Button variant="primary" type="submit">
							Update Profile
						</Button>
					</Form>
				</Col>
				<Col md={6}>
					<h3>Change Password</h3>
					<Form
						onSubmit={handleUpdatePassword}
						className="mb-3"
						ref={passwordForm}>
						<FormGroup className="mb-3">
							<FormLabel>Old Password</FormLabel>
							<FormControl
								type="password"
								value={oldPassword}
								onChange={(e) => setOldPassword(e.target.value)}
							/>
						</FormGroup>
						<FormGroup className="mb-3">
							<FormLabel>New Password</FormLabel>
							<FormControl
								type="password"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
							/>
						</FormGroup>
						<Button variant="primary" type="submit">
							Update Password
						</Button>
					</Form>

					<Button
						variant="danger"
						onClick={handleDeleteProfile}
						className="mt-3">
						Delete Profile
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default UserProfile;
