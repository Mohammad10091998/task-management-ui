import axios from 'axios';
import Task from '../types/Task';

const API_BASE_URL = 'https://localhost:7143/api/Task';
const AUTH_HEADERS = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

/**
 * Fetch all tasks with pagination and sorting.
 * Example: ?page=1&pageSize=5&sortBy=duedate&sortOrder=asc
 */
export const getAllTasks = async (
  page = 1,
  pageSize = 5,
  sortBy = 'duedate',
  sortOrder: 'asc' | 'desc' = 'asc'
): Promise<Task[]> => {
  const response = await axios.get(
    `${API_BASE_URL}?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
    AUTH_HEADERS()
  );
  return response.data;
};

/**
 * Get a task by ID
 */
export const getTaskById = async (id: number): Promise<Task> => {
  const response = await axios.get(`${API_BASE_URL}/${id}`, AUTH_HEADERS());
  return response.data;
};

/**
 * Create a new task
 */
export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await axios.post(API_BASE_URL, task, AUTH_HEADERS());
  return response.data;
};

/**
 * Update a task (Note: update endpoint is /api/Tasks/{id})
 */
export const updateTask = async (id: number, task: Partial<Task>): Promise<Task> => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, task, AUTH_HEADERS());
  return response.data;
};

/**
 * Delete a task (Note: delete endpoint is /api/Tasks/{id})
 */
export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`, AUTH_HEADERS());
};
