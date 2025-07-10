// components/Header.js

import Link from 'next/link';
import { useState } from 'react';

export default function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className="slide-up main-header"> 
      <div className="container">
        <nav style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <Link href="/" className="glow" style={{
            marginRight: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '32px',
            fontWeight: '800',
            background: 'linear-gradient(135deg,rgb(48, 201, 17) 0%, #764ba2 25%, #f093fb 50%, #ffcc70 75%, #667eea 100%)',
            backgroundSize: '300% 300%',
            animation: 'gradient-shift 4s ease infinite',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textDecoration: 'none',
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '-0.5px',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              position: 'relative',
              height: '45px',
              width: '45px',
              marginRight: '8px'
            }}>
              <img 
                src="https://iili.io/FaVIh4n.png" 
                alt="Logo" 
                style={{ 
                  height: '100%', 
                  width: '100%', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 10px rgba(102, 126, 234, 0.5))',
                  transition: 'all 0.3s ease'
                }} 
              />
            </div>
            <span>Bonafasius Mase</span>
          </Link>

          <form onSubmit={handleSearch} style={{
            display: 'flex',
            gap: '12px',
            flex: '1',
            maxWidth: '450px',
            position: 'relative'
          }}>
            <input
              type="text"
              placeholder="🔍 Cari film atau TV show..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-effect"
              style={{
                flex: '1',
                padding: '14px 20px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '25px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: 'white',
                fontSize: '15px',
                fontFamily: 'Poppins, sans-serif',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(102, 126, 234, 0.5)';
                e.target.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.boxShadow = 'none';
              }}
            />
            <button type="submit" className="btn btn-primary" style={{
              borderRadius: '25px',
              padding: '14px 24px',
              fontWeight: '600',
              fontSize: '15px'
            }}>
              🔍 Cari
            </button>
          </form>

          <Link href="/add" className="btn btn-secondary" style={{
            marginLeft: '32px',
            fontSize: '14px',
            fontWeight: '600',
            borderRadius: '20px',
            padding: '12px 20px',
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 193, 7, 0.2) 100%)',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            color: '#FFD700',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}>
            ✨ Tambah Movie
          </Link>
          <Link href="/add-tvshow" className="btn btn-secondary" style={{
            marginLeft: '12px',
            fontSize: '14px',
            fontWeight: '600',
            borderRadius: '20px',
            padding: '12px 20px',
            background: 'linear-gradient(135deg, rgba(0, 234, 255, 0.2) 0%, rgba(186, 255, 255, 0.2) 100%)',
            border: '1px solid rgba(0, 234, 255, 0.3)',
            color: '#00EAFF',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}>
            📺 Tambah TV Show
          </Link>

        </nav>
      </div>
    </header>
  );
}
