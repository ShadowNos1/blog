import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ArticlePage() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [commentName, setCommentName] = useState('');
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/articles/${id}`)
            .then(res => setArticle(res.data));
    }, [id]);

    const handleComment = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/api/articles/${id}/comments`, {
            author_name: commentName,
            content: commentText
        }).then(() => {
            window.location.reload(); // Простой способ обновить список
        });
    };

    if (!article) return <div>Загрузка...</div>;

    return (
        <div>
            <h1>{article.title}</h1>
            <p>{article.content}</p>
            <hr />
            <h3>Комментарии</h3>
            {article.comments?.map(c => (
                <div key={c.id} style={{border: '1px solid #eee', margin: '5px', padding: '5px'}}>
                    <strong>{c.author_name}:</strong> {c.content}
                </div>
            ))}
            <form onSubmit={handleComment} style={{marginTop: '20px'}}>
                <input placeholder="Имя" onChange={e => setCommentName(e.target.value)} /><br/>
                <textarea placeholder="Комментарий" onChange={e => setCommentText(e.target.value)} /><br/>
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
}

export default ArticlePage;