import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/user/userThunks';
import { AppDispatch } from '../store/store';
import { useNavigate } from 'react-router-dom';
import {
	Container,
	Form,
	Button,
	FormGroup,
	FormControl,
	FormLabel,
	Row,
	Col,
	Card,
} from 'react-bootstrap';

const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const form = useRef<HTMLFormElement | null>(null);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		const result = await dispatch(loginUser({ email, password }));
		if (loginUser.fulfilled.match(result)) {
			form.current?.reset();
			navigate('/tasks');
		}
	};

	return (
		<Container>
			<Row className="justify-content-center">
				<Col md={6} lg={4}>
					<Card className="mt-5">
						<Card.Body>
							<h2 className="text-center">Login</h2>
							<Form onSubmit={handleLogin} ref={form}>
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
									Login
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Login;
