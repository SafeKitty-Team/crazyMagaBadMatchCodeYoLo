import { useState } from 'react'
import './Feed.css'

function Feed() {
  const [posts] = useState([
    {
      id: 1,
      username: 'ТролльИнтернета69',
      avatar: 'https://via.placeholder.com/50',
      content: 'Всем привет! Это моя первая публикация в этой ужасной соцсети! Надеюсь, вам НЕ понравится!',
      likes: -15,
      dislikes: 203,
      comments: 42,
      date: '01.04.2025'
    },
    {
      id: 2,
      username: 'АнТи_СоЦиАл2000',
      avatar: 'https://via.placeholder.com/50',
      content: 'НЕ делитесь этим постом!!! Нажмите дизлайк и удалите свой аккаунт!',
      likes: -42,
      dislikes: 567,
      comments: 13,
      date: '31.03.2025'
    },
    {
      id: 3,
      username: 'КиберАнархист',
      avatar: 'https://via.placeholder.com/50',
      content: 'Вот моя фотография идеального дня в антисоциальной сети! НИКОМУ НЕ ПОКАЗЫВАЙТЕ!!!',
      image: 'https://via.placeholder.com/400x300',
      likes: -7,
      dislikes: 89,
      comments: 23,
      date: '30.03.2025'
    }
  ])

  return (
    <div className="feed-container">
      <h2 className="feed-title tilted">ЛЕНТА НЕЖЕЛАТЕЛЬНОГО КОНТЕНТА</h2>
      
      <div className="new-post">
        <textarea 
          placeholder="НАПИШИТЕ ЧТО-ТО БЕССМЫСЛЕННОЕ..." 
          className="post-input"
        ></textarea>
        <div className="post-actions">
          <button className="post-button blink">ОПУБЛИКОВАТЬ!</button>
          <button className="cancel-button">ОТМЕНА</button>
        </div>
      </div>
      
      <div className="sorting-options">
        <button className="sort-button active">ХУДШИЕ</button>
        <button className="sort-button">СТАРЫЕ</button>
        <button className="sort-button">РАЗДРАЖАЮЩИЕ</button>
      </div>
      
      <div className="posts-container">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <div className="post-avatar">
                <img src={post.avatar} alt="Аватар" />
              </div>
              <div className="post-info">
                <h3 className="post-username">{post.username}</h3>
                <span className="post-date">{post.date}</span>
              </div>
              <button className="post-menu">⋮</button>
            </div>
            
            <div className="post-content">
              <p>{post.content}</p>
              {post.image && <img src={post.image} alt="Контент поста" className="post-image" />}
            </div>
            
            <div className="post-footer">
              <div className="post-stats">
                <div className="likes">
                  <button className="like-button">👎</button>
                  <span className="like-count">{post.likes}</span>
                </div>
                <div className="dislikes">
                  <button className="dislike-button">💀</button>
                  <span className="dislike-count">{post.dislikes}</span>
                </div>
                <div className="comments">
                  <button className="comment-button">💬</button>
                  <span className="comment-count">{post.comments}</span>
                </div>
              </div>
              <div className="post-share">
                <button className="share-button">НЕ ДЕЛИТЬСЯ</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="load-more">
        <button className="load-more-button wobble">ЗАГРУЗИТЬ БОЛЬШЕ РАЗДРАЖЕНИЯ</button>
      </div>
    </div>
  )
}

export default Feed