import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('https://todolist-final-9vyx.onrender.com/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleEdit = (id) => {
        axios.put(`https://todolist-final-9vyx.onrender.com/update/${id}`)
            .then(() => window.location.reload())
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`https://todolist-final-9vyx.onrender.com/delete/${id}`)
            .then(() => window.location.reload())
            .catch(err => console.log(err));
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        window.location.reload();
    };

    return (
        <div className='home'>
            <h1>TO-DO LIST</h1>

            <div className="logout_container">
                <button className="logout_button" onClick={handleLogout}>Logout</button>
            </div>

            <Create />
            <br />
            {
                todos.length === 0
                    ? <div><h2>No Record</h2></div>
                    : todos.map(todo => (
                        <div className='task' key={todo._id}>
                            <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                                {todo.done ?
                                    <BsFillCheckCircleFill className='icon' /> :
                                    <BsCircleFill className='icon' />
                                }
                                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                            </div>
                            <div>
                                <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} /></span>
                            </div>
                        </div>
                    ))
            }
        </div>
    );
}

export default Home;
