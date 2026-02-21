import { Link } from 'react-router-dom'
import './HomePage.css'

function HomePage() {
  return (
    <div className="home-page" dir="rtl">
      <header className="home-header">
        <div className="home-header-content">
          <div className="home-greeting">English4Ella</div>
          <h1 className="home-title">שלום אלה!</h1>
          <p className="home-subtitle">מה נלמד היום?</p>
        </div>
      </header>

      <main className="home-main">
        <div className="home-cards">
          <Link to="/grammar" className="home-card home-card-grammar">
            <span className="home-card-icon">🎓</span>
            <div className="home-card-content">
              <h2>תרגול דקדוק</h2>
              <p>חידון, בניית משפטים, זיכרון והקלדה</p>
            </div>
            <span className="home-card-arrow">←</span>
          </Link>

          <Link to="/hall-of-fame" className="home-card home-card-hof">
            <span className="home-card-icon">🎤</span>
            <div className="home-card-content">
              <h2>Hall of Fame</h2>
              <p>מדריך הגייה לשיר של The Script</p>
            </div>
            <span className="home-card-arrow">←</span>
          </Link>

          <a href="/stigmas.html" className="home-card home-card-stigmas">
            <span className="home-card-icon">🌍</span>
            <div className="home-card-content">
              <h2>שוברים סטיגמות</h2>
              <p>עובדות מפתיעות על עדות, טבע ומדינות</p>
            </div>
            <span className="home-card-arrow">←</span>
          </a>
        </div>
      </main>

      <footer className="home-footer">
        <p>נבנה באהבה עבור אלה</p>
      </footer>
    </div>
  )
}

export default HomePage
