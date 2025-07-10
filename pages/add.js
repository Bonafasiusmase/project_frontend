import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '../components/Header';

export default function AddPage() {
  const router = useRouter();
  const [tmdbId, setTmdbId] = useState('');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');

  const handlePreview = async () => {
    if (!tmdbId.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`/api/tmdb?id=${tmdbId}`);
      const data = await res.json();
      
      if (res.ok) {
        setPreview(data);
      } else {
        setError('Film tidak ditemukan. Pastikan TMDB ID valid.');
        setPreview(null);
      }
    } catch (error) {
      setError('Terjadi kesalahan saat mengambil data film.');
      setPreview(null);
    }
    
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!preview) {
      await handlePreview();
      return;
    }

    setLoading(true);
    
    try {
      const res = await fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tmdb_id: tmdbId }),
      });

      if (res.ok) {
        router.push('/?added=true');
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Gagal menambahkan film');
      }
    } catch (error) {
      setError('Terjadi kesalahan saat menambahkan film');
    }
    
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <Header onSearch={() => {}} />
      <main className="container fade-in" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="slide-up" style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h1 className="glow" style={{ 
              fontSize: '42px', 
              fontWeight: '800', 
              marginBottom: '16px', 
              color: '#fff',
              fontFamily: 'Poppins, sans-serif',
              letterSpacing: '-0.5px'
            }}>
              ✨ Tambah Film Baru
            </h1>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              fontSize: '20px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '400',
              lineHeight: '1.5'
            }}>
              Masukkan TMDB ID untuk menambahkan film ke koleksi Anda
            </p>
          </div>
          <div className="glass-effect" style={{
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '25px',
            padding: '40px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            marginBottom: '40px',
            backdropFilter: 'blur(20px)'
          }}>
            <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '12px', 
                  fontWeight: '600', 
                  color: '#FFD700',
                  fontSize: '16px',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                  TMDB ID
                </label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <input
                    type="text"
                    value={tmdbId}
                    onChange={(e) => setTmdbId(e.target.value)}
                    placeholder="🎬 Contoh: 603 (The Matrix)"
                    className="glass-effect"
                    style={{
                      flex: '1',
                      padding: '16px 20px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '15px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      fontSize: '16px',
                      fontFamily: 'Poppins, sans-serif',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(102, 126, 234, 0.5)';
                      e.target.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.boxShadow = 'none';
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={handlePreview}
                    disabled={loading || !tmdbId.trim()}
                    className="btn btn-secondary"
                    style={{
                      borderRadius: '15px',
                      padding: '16px 24px',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: '600'
                    }}
                  >
                    {loading ? '⏳' : '👁️'} Preview
                  </button>
                </div>
              </div>

              {error && (
                <div className="glass-effect" style={{
                  background: 'rgba(255, 107, 107, 0.15)',
                  border: '1px solid rgba(255, 107, 107, 0.4)',
                  borderRadius: '15px',
                  padding: '16px 20px',
                  color: '#ff6b6b',
                  marginBottom: '24px',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '500'
                }}>
                  {error}
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <Link href="/" className="btn btn-secondary" style={{
                    flex: '1',
                    minWidth: '120px',
                    justifyContent: 'center',
                    color: '#FFD700',
                    borderRadius: '15px',
                    padding: '16px 24px',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '600'
                  }}>
                  ⬅ Kembali
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{
                    borderRadius: '15px',
                    padding: '16px 24px',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '600',
                    fontSize: '16px'
                  }}
                >
                  {loading ? '⏳ Memproses...' : preview ? '✨ Tambahkan Film' : '🔍 Cari Film'}
                </button>
              </div>
            </form>
          </div>

          {preview && (
            <div className="fade-in glass-effect" style={{
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '25px',
              padding: '32px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)'
            }}>
              <h3 style={{ 
                marginBottom: '24px', 
                textAlign: 'center', 
                color: '#fff',
                fontSize: '24px',
                fontWeight: '700',
                fontFamily: 'Poppins, sans-serif'
              }}>🎬 Preview Film</h3>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${preview.poster_path}`}
                  alt={preview.title}
                  style={{
                    width: '220px',
                    borderRadius: '20px',
                    flexShrink: 0,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
                  }}
                />
                <div style={{ flex: '1' }}>
                  <h2 style={{ 
                    marginBottom: '16px', 
                    color: '#fff',
                    fontSize: '28px',
                    fontWeight: '700',
                    fontFamily: 'Poppins, sans-serif',
                    letterSpacing: '-0.3px'
                  }}>{preview.title}</h2>
                  <p style={{ 
                    color: 'rgba(255,255,255,0.8)', 
                    marginBottom: '12px',
                    fontSize: '16px',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '500'
                  }}>
                    📅 {new Date(preview.release_date).getFullYear()}
                  </p>
                  <p style={{ 
                    color: 'rgba(255,255,255,0.8)', 
                    marginBottom: '16px',
                    fontSize: '16px',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '500'
                  }}>
                    ⭐ {preview.vote_average}/10
                  </p>
                  <p style={{ 
                    lineHeight: '1.6', 
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '15px',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '400'
                  }}>
                    {preview.overview}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}