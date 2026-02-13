import { Routes, Route, Link } from 'react-router-dom'
import ArticleList from './pages/ArticleList'
import ArticlePage from './pages/ArticlePage'
import CreateArticle from './pages/CreateArticle'
import './App.css'

function App() {
  return (
    <div className="container">
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/">Главная</Link> | <Link to="/create"> Создать статью</Link>
      </nav>

      <Routes>
        {/* Список всех статей */}
        <Route path="/" element={<ArticleList />} />
        
        {/* Страница одной статьи */}
        <Route path="/articles/:id" element={<ArticlePage />} />
        
        {/* Форма создания статьи */}
        <Route path="/create" element={<CreateArticle />} />
      </Routes>
    </div>
  )
}

export default App