import MovieCard from './MovieCard';

export default function MovieGrid({ movies, onDelete, loading, isTVShow }) {
  if (loading) {
    return (
      <div className="loading" style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '300px',
        gap: '20px'
      }}>
        <div className="spinner"></div>
        <p style={{
          color: '#FFD700',
          fontSize: '18px',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: '500'
        }}>✨ Memuat koleksi...</p>
      </div>
    );
  }

  // Filter hanya data yang benar-benar valid (ada id dan title/name)
  const validMovies = (movies || []).filter(
    m => m && m.id && (m.title || m.name)
  );

  if (!validMovies.length) {
    return (
      <div className="fade-in glass-effect" style={{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '50vh', 
        textAlign: 'center',
        margin: '40px auto',
        maxWidth: '600px',
        padding: '60px 40px',
        borderRadius: '25px',
        border: '1px solid rgba(255, 215, 0, 0.3)'
      }}>
        <div className="glow" style={{ 
          fontSize: 100, 
          marginBottom: 24,
          filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))'
        }}>🎬</div>
        <h2 className="text-gradient" style={{ 
          fontWeight: '800', 
          fontSize: 36, 
          marginBottom: 16,
          fontFamily: 'Poppins, sans-serif',
          letterSpacing: '-0.5px'
        }}>
          {isTVShow ? 'Belum ada TV Show' : 'Belum ada film'}
        </h2>
        <p style={{ 
          color: '#FFD700', 
          fontSize: 20, 
          marginBottom: 12,
          fontFamily: 'Poppins, sans-serif',
          fontWeight: '400',
          lineHeight: '1.5'
        }}>
          {isTVShow
            ? 'Tidak ada data tv show, mau liat apa?? klik tambah tv show nya yuk!'
            : 'Tidak ada data film nih, klik tambah movie yuk!!'}
        </p>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '32px',
      padding: '32px 0 40px 0'
    }}>
      {validMovies.map((movie, index) => (
        <div 
          key={movie.id}
          className="fade-in"
          style={{
            animationDelay: `${index * 0.1}s`
          }}
        >
          <MovieCard
            movie={movie}
            onDelete={onDelete}
            isTVShow={isTVShow}
          />
        </div>
      ))}
    </div>
  );
}