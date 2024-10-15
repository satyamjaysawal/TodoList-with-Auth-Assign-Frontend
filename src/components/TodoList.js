import React, { useEffect, useState, useCallback } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchTodos = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            setLoading(true); // Start loading
            const response = await axios.get('/todos', {
                headers: { Authorization: token }
            });
            setTodos(response.data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        } finally {
            setLoading(false); // End loading
        }
    }, [navigate]);

    const addTodo = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            await axios.post('/todos', { title }, {
                headers: { Authorization: token }
            });
            setTitle(''); // Clear the input field
            fetchTodos();
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const toggleTodo = async (id, completed) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            await axios.put(`/todos/${id}`, { completed: !completed }, {
                headers: { Authorization: token }
            });
            fetchTodos();
        } catch (error) {
            console.error("Error toggling todo:", error);
        }
    };

    const deleteTodo = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            await axios.delete(`/todos/${id}`, {
                headers: { Authorization: token }
            });
            fetchTodos();
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    if (loading) {
        return <p className="text-center text-gray-600">Loading todos...</p>;
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-9">Todo List</h1>
        <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out shadow-md"
        >
            Logout
        </button>
    </div>
    <form onSubmit={addTodo} className="mb-6">
        <div className="flex space-x-2 border border-gray-300 rounded-lg p-2 bg-gray-50">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add a new task..."
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out shadow-md"
                disabled={!title.trim()}
            >
                Add Todo
            </button>
        </div>
    </form>
    <ul className="space-y-4">
        {todos.map(todo => (
            <li key={todo._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm transition-transform transform hover:scale-105">
                <span className={`flex-grow text-gray-700 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                    {todo.title}
                </span>
                <div className="space-x-2">
                    <button 
                        onClick={() => toggleTodo(todo._id, todo.completed)} 
                        className={`px-3 py-1 rounded-lg text-white transition duration-300 ease-in-out 
                            ${todo.completed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                        {todo.completed ? 'Unmark' : 'Mark'}
                    </button>
                    <button 
                        onClick={() => navigate(`/edit/${todo._id}`)} 
                        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
                    >
                        Edit
                    </button>
                    <button 
                        onClick={() => deleteTodo(todo._id)} 
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
                    >
                        Delete
                    </button>
                </div>
            </li>
        ))}
    </ul>
</div>

    );
};

export default TodoList;
