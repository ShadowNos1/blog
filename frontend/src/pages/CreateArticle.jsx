import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateArticle() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/articles', { title, content })
            .then(() => navigate('/'));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Новая статья</h1>
            <input placeholder="Заголовок" onChange={e => setTitle(e.target.value)} /><br/>
            <textarea placeholder="Текст" onChange={e => setContent(e.target.value)} /><br/>
            <button type="submit">Опубликовать</button>
        </form>
    );
}

export default CreateArticle;