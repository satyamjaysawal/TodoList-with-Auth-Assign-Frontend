import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';

const TodoEdit = () => {
    const { id } = useParams();
    const [todo, setTodo] = useState({ title: '', completed: false });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchTodo = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const response = await axios.get(`/todos/${id}`, {
                headers: { Authorization: token }
            });
            setTodo(response.data);
        } catch (error) {
            console.error("Error fetching todo:", error);
        } finally {
            setLoading(false);
        }
    }, [id, navigate]);

    useEffect(() => {
        fetchTodo();
    }, [fetchTodo]);

    const handleEdit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            await axios.put(`/todos/${id}`, todo, {
                headers: { Authorization: token }
            });
            navigate('/todos');
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    if (loading) {
        return <p className="text-center text-gray-600">Loading...</p>;
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Edit Todo</h1>
           
            <form onSubmit={handleEdit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Todo Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={todo.title}
                        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        placeholder="Enter todo title"
                    />
                </div>
                <div className="flex items-center">
                    <input
                        id="completed"
                        type="checkbox"
                        checked={todo.completed}
                        onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="completed" className="ml-2 block text-sm text-gray-900">
                        Mark as Completed
                    </label>
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-200 focus:outline-none shadow-md"
                    >
                        Update Todo
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/todos')}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition duration-200 focus:outline-none shadow-md"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>

    );
};

export default TodoEdit;
