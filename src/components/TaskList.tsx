import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTasks } from '../store/tasks/tasksThunks';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { Container, Spinner, Button, Row, Col } from 'react-bootstrap';
import { RootState, AppDispatch } from '../store/store';
import { fetchCategories } from '../store/categories/categoriesThunks';

const TaskList: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { tasks, isLoading } = useSelector((state: RootState) => state.tasks);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		dispatch(fetchAllTasks());
		dispatch(fetchCategories());
	}, [dispatch]);

	return (
		<Container>
			<Row className="mb-3">
				<Col className="text-center">
					<Button
						variant="primary"
						onClick={() => setShowModal(true)}>
						Add New Task
					</Button>
				</Col>
			</Row>

			{showModal && <TaskForm setShowModal={setShowModal} />}

			<Row>
				<Col>
					{isLoading ? (
						<Spinner animation="border" role="status" />
					) : (
						tasks.map((task) => (
							<TaskItem key={task.id} task={task} />
						))
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default TaskList;
