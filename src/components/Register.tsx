import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../store/user/userThunks';
import {
	Container,
	Form,
	FormGroup,
	FormLabel,
	FormControl,
	Button,
	Row,
	Col,
	Card,
} from 'react-bootstrap';
import { RegisterCredentials } from '../types';

const Register: React.FC = () => {
	const [email, setEmail] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const form = useRef<HTMLFormElement | null>(null);

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		const result = await dispatch(
			registerUser({ email, username, password } as RegisterCredentials)
		);
		if (registerUser.fulfilled.match(result)) {
			form.current?.reset();
			navigate('/login');
		}
	};

	return (
		<Container>
			<Row className="justify-content-center">
				<Col md={6} lg={4}>
					<Card className="mt-5">
						<Card.Body>
							<h2 className="text-center">Register</h2>
							<Form onSubmit={handleRegister} ref={form}>
								<FormGroup className="mb-3">
									<FormLabel htmlFor="email">Email</FormLabel>
									<FormControl
										type="email"
										id="email"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
									/>
								</FormGroup>
								<FormGroup className="mb-3">
									<FormLabel htmlFor="username">
										Username
									</FormLabel>
									<FormControl
										type="text"
										id="username"
										value={username}
										onChange={(e) =>
											setUsername(e.target.value)
										}
									/>
								</FormGroup>
								<FormGroup className="mb-3">
									<FormLabel htmlFor="password">
										Password
									</FormLabel>
									<FormControl
										type="password"
										id="password"
										value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
									/>
								</FormGroup>
								<Button
									type="submit"
									variant="primary"
									className="w-100">
									Register
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Register;
