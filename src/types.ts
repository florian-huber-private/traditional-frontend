export type User = {
    id: number;
    username: string;
    email: string
}

export type LoginCredentials = {
    email: string;
    password: string;
}

export type RegisterCredentials = {
    username: string; 
    email: string; 
    password: string; 
}

export enum TaskPriority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}

export enum TaskStatus {
    TODO = "TO_DO",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}

export type Task = {
    id: number;
    user_id: number;
    title: string;
    description: string;
    priority: TaskPriority;
    categories: number[],
    creation_date: string,
    due_date: string,
    status: TaskStatus,
}

export type Category = {
    id: number;
    name: string;
    user_id: string;
}

export type MessageResponse = {
    message: string;
    id?: number;
}

export type TaskResponse = {
    message: string;
    task: Task;
}

export type UserResponse = {
  message: string;
  user: User;
};