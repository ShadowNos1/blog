import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function ArticleList() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8080/api/articles')
      .then(res => setArticles(res.data))
      .catch(err => console.error("Ошибка API:", err))
  }, [])

  return (
    <div>
      <h1>Список статей</h1>
      {articles.map(article => (
        <div key={article.id} className="article-card">
          <h2>
            <Link to={`/articles/${article.id}`}>{article.title}</Link>
          </h2>
          <p>{article.content.substring(0, 100)}...</p>
          <small>{new Date(article.created_at).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  )
}

export default ArticleList