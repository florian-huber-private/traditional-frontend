import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Task } from '../types';
import { deleteTask } from '../store/tasks/tasksThunks';
import { Button, Card, Badge, ListGroup, Row, Col } from 'react-bootstrap';
import { AppDispatch, RootState } from '../store/store';
import TaskForm from './TaskForm';

interface TaskItemProps {
	task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
	const dispatch = useDispatch<AppDispatch>();
	const [editMode, setEditMode] = useState(false);
	const categories = useSelector(
		(state: RootState) => state.categories.categories
	);

	const handleDelete = () => {
		dispatch(deleteTask(task.id));
	};

	const getCategoryNames = (categoryIds: number[]) => {
		return categories
			.filter((category) => categoryIds.includes(category.id))
			.map((category) => category.name);
	};

	return (
		<Card className="mb-3">
			<Card.Body>
				<Row>
					<Col xs={12} md={8}>
						<Card.Title>{task.title}</Card.Title>
						<Card.Text>{task.description}</Card.Text>
						<Badge bg="primary" className="me-2">
							Priority: {task.priority}
						</Badge>
						<Badge bg="secondary">Status: {task.status}</Badge>
						{task.due_date !== null && (
							<div className="mb-2 mt-2">
								<strong>Due Date:</strong>{' '}
								{new Date(task.due_date).toLocaleDateString()}
							</div>
						)}
						{task.categories.length > 0 && (
							<div className="mb-2">
								<strong>Categories:</strong>
								<ListGroup horizontal className="mt-1">
									{getCategoryNames(task.categories).map(
										(name, index) => (
											<ListGroup.Item key={index}>
												{name}
											</ListGroup.Item>
										)
									)}
								</ListGroup>
							</div>
						)}
					</Col>
					<Col xs={12} md={4} className="mt-3 mt-md-0 text-md-end">
						<Button
							variant="primary"
							onClick={() => setEditMode(true)}>
							Edit
						</Button>
						<Button
							variant="danger"
							onClick={handleDelete}
							className="ms-2">
							Delete
						</Button>
						{editMode && (
							<TaskForm
								existingTask={task}
								setShowModal={setEditMode}
							/>
						)}
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
};

export default TaskItem;
