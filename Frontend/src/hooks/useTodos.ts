import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API from '../services/api';
import type { Todo } from '../types/todo';
import toast from 'react-hot-toast';

// Get all todos for current user
export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await API.get('/todos');
      return res.data.data as Todo[];
    },
  });
};

// Create todo
export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      priority: string;
      dueDate: string;
    }) => {
      const res = await API.post('/todos/createTodo', data);
      return res.data.data;
    },
    onSuccess: () => {
      toast.success('Todo created!');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create todo');
    },
  });
};

// Delete todo
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await API.delete(`/todos/deleteTodo/${id}`);
    },
    onSuccess: () => {
      toast.success('Todo deleted!');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete todo');
    },
  });
};

// Toggle todo
export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      const res = await API.put(`/todos/updateTodo/${id}`, { completed: !completed });
      return res.data.data;
    },
    onSuccess: (data: Todo) => {
      toast.success(data.completed ? 'Marked as completed' : 'Marked as pending');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update todo');
    },
  });
};

// Update todo
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      title,
      description,
      priority,
      dueDate,
    }: {
      id: string;
      title: string;
      description: string;
      priority: string;
      dueDate: string;
    }) => {
      const res = await API.put(`/todos/updateTodo/${id}`, {
        title,
        description,
        priority,
        dueDate,
      });
      return res.data.data;
    },
    onSuccess: () => {
      toast.success('Todo updated!');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update todo');
    },
  });
};
