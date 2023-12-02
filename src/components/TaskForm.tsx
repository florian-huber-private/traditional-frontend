import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Task, TaskPriority, TaskStatus } from '../types';
import { createTask, updateTask } from '../store/tasks/tasksThunks';
import {
	Form,
	Button,
	Modal,
	ListGroup,
	ListGroupItem,
	Row,
	Col,
} from 'react-bootstrap';
import { AppDispatch, RootState } from '../store/store';
import {
	CategoryResponse,
	createCategory,
	fetchCategories,
} from '../store/categories/categoriesThunks';

interface TaskFormProps {
	existingTask?: Task;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskForm: React.FC<TaskFormProps> = ({ existingTask, setShowModal }) => {
	const dispatch = useDispatch<AppDispatch>();
	const categories = useSelector(
		(state: RootState) => state.categories.categories
	);

	const [title, setTitle] = useState(existingTask?.title ?? '');
	const [description, setDescription] = useState(
		existingTask?.description ?? ''
	);
	const [priority, setPriority] = useState<TaskPriority>(
		existingTask?.priority ?? TaskPriority.MEDIUM
	);
	const [selectedCategories, setSelectedCategories] = useState<number[]>(
		existingTask?.categories ?? []
	);
	const [categoryInput, setCategoryInput] = useState('');
	const [dueDate, setDueDate] = useState<string>(
		existingTask?.due_date ?? ''
	);
	const [status, setStatus] = useState<TaskStatus>(
		existingTask?.status ?? TaskStatus.TODO
	);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	const handleCategoryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCategoryInput(e.target.value);
	};

	const handleAddCategory = () => {
		const existingCategory = categories.find(
			(cat) => cat.name === categoryInput
		);
		if (existingCategory) {
			if (!selectedCategories.includes(existingCategory.id)) {
				setSelectedCategories([
					...selectedCategories,
					existingCategory.id,
				]);
			}
		} else {
			dispatch(createCategory({ name: categoryInput }))
				.unwrap()
				.then((response: CategoryResponse) => {
					setSelectedCategories([
						...selectedCategories,
						response.category.id,
					]);
				});
		}
		setCategoryInput('');
	};

	const handleRemoveCategory = (categoryId: number) => {
		setSelectedCategories(
			selectedCategories.filter((id) => id !== categoryId)
		);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const newTask = {
			title,
			description,
			priority,
			categories: selectedCategories,
			due_date: dueDate,
			status,
		};
		let result;
		if (existingTask) {
			result = await dispatch(
				updateTask({ taskId: existingTask.id, updateData: newTask })
			);
		} else {
			result = await dispatch(createTask(newTask));
		}
		if (
			result &&
			(updateTask.fulfilled.match(result) ||
				createTask.fulfilled.match(result))
		) {
			setShowModal(false);
		}
	};

	return (
		<Modal show onHide={() => setShowModal(false)}>
			<Modal.Header closeButton>
				<Modal.Title>
					{existingTask ? 'Edit Task' : 'New Task'}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Row>
						<Col md={12}>
							<Form.Group className="mb-3">
								<Form.Label>Title</Form.Label>
								<Form.Control
									type="text"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Description</Form.Label>
								<Form.Control
									as="textarea"
									value={description}
									onChange={(e) =>
										setDescription(e.target.value)
									}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Priority</Form.Label>
								<Form.Select
									value={priority}
									onChange={(e) =>
										setPriority(
											e.target.value as TaskPriority
										)
									}>
									{(
										Object.keys(
											TaskPriority
										) as (keyof typeof TaskPriority)[]
									).map((value, index) => {
										return (
											<option key={index} value={value}>
												{value}
											</option>
										);
									})}
								</Form.Select>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Categories</Form.Label>
								<Form.Control
									type="text"
									value={categoryInput}
									onChange={handleCategoryInput}
									list="categoryOptions"
									className="mb-3"
								/>
								<datalist id="categoryOptions">
									{categories.map((category) => (
										<option
											key={category.id}
											value={category.name}
										/>
									))}
								</datalist>
								<Button
									type="button"
									variant="secondary"
									onClick={handleAddCategory}>
									Add Category
								</Button>
							</Form.Group>
							{selectedCategories.length > 0 && (
								<Form.Group className="mb-3">
									<Form.Label>Added Categories</Form.Label>
									<ListGroup>
										{selectedCategories.map((catId) => {
											const category = categories.find(
												(cat) => cat.id === catId
											);
											return (
												<ListGroupItem
													key={catId}
													className="d-flex justify-content-between align-items-center">
													{category?.name}
													<Button
														variant="danger"
														size="sm"
														onClick={() =>
															handleRemoveCategory(
																catId
															)
														}
														className="ms-2">
														Remove
													</Button>
												</ListGroupItem>
											);
										})}
									</ListGroup>
								</Form.Group>
							)}

							<Form.Group className="mb-3">
								<Form.Label>Due Date</Form.Label>
								<Form.Control
									type="date"
									value={dueDate}
									onChange={(e) => setDueDate(e.target.value)}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Status</Form.Label>
								<Form.Select
									value={status}
									onChange={(e) =>
										setStatus(e.target.value as TaskStatus)
									}>
									{(
										Object.keys(
											TaskStatus
										) as (keyof typeof TaskStatus)[]
									).map((value, index) => {
										return (
											<option key={index} value={value}>
												{value}
											</option>
										);
									})}
								</Form.Select>
							</Form.Group>

							<Button variant="primary" type="submit">
								{existingTask ? 'Update' : 'Create'}
							</Button>
						</Col>
					</Row>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default TaskForm;
