import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchCategories,
	createCategory,
	updateCategory,
	deleteCategory,
} from '../store/categories/categoriesThunks';
import { Category } from '../types';
import { RootState, AppDispatch } from '../store/store';
import {
	Button,
	ListGroup,
	Modal,
	Form,
	Spinner,
	Container,
	Row,
	Col,
} from 'react-bootstrap';

const Categories: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { categories, isLoading } = useSelector(
		(state: RootState) => state.categories
	);
	const [showModal, setShowModal] = useState(false);
	const [categoryName, setCategoryName] = useState('');
	const [editingCategory, setEditingCategory] = useState<Category | null>(
		null
	);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	const handleCreateOrUpdateCategory = () => {
		if (editingCategory) {
			dispatch(
				updateCategory({
					categoryId: editingCategory.id,
					name: categoryName,
				})
			);
		} else {
			dispatch(createCategory({ name: categoryName }));
		}
		setShowModal(false);
		setCategoryName('');
		setEditingCategory(null);
	};

	const handleDeleteCategory = (categoryId: number) => {
		dispatch(deleteCategory(categoryId));
	};

	const handleEditCategory = (category: Category) => {
		setEditingCategory(category);
		setCategoryName(category.name);
		setShowModal(true);
	};

	return (
		<Container>
			<Row className="mb-3">
				<Col className="text-right">
					<Button onClick={() => setShowModal(true)}>
						Add Category
					</Button>
				</Col>
			</Row>
			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>
						{editingCategory ? 'Edit Category' : 'Add Category'}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group>
							<Form.Label>Category Name</Form.Label>
							<Form.Control
								type="text"
								value={categoryName}
								onChange={(e) =>
									setCategoryName(e.target.value)
								}
							/>
						</Form.Group>
						<Button
							variant="primary"
							onClick={handleCreateOrUpdateCategory}
							className="mt-2">
							{editingCategory ? 'Update' : 'Create'}
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
			{isLoading ? (
				<Spinner animation="border" />
			) : (
				<ListGroup>
					{categories.map((category) => (
						<ListGroup.Item
							key={category.id}
							className="d-flex justify-content-between align-items-center">
							{category.name}
							<div>
								<Button
									variant="primary"
									size="sm"
									onClick={() =>
										handleEditCategory(category)
									}>
									Edit
								</Button>
								<Button
									variant="danger"
									size="sm"
									onClick={() =>
										handleDeleteCategory(category.id)
									}
									className="ms-2">
									Delete
								</Button>
							</div>
						</ListGroup.Item>
					))}
				</ListGroup>
			)}
		</Container>
	);
};

export default Categories;
