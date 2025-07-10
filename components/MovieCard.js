import Link from 'next/link';
import { useState } from 'react';

export default function MovieCard({ movie, onDelete, isTVShow }) {
  console.log('movie:', movie); 
  const [imageError, setImageError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Yakin ingin menghapus ${isTVShow ? 'TV Show' : 'film'} ini?`)) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/${isTVShow ? 'tvshows' : 'movies'}/${movie.id}`, { method: 'DELETE' });
      if (res.ok) {
        onDelete(movie.id);
      } else {
        alert(`Gagal menghapus ${isTVShow ? 'TV Show' : 'film'}`);
      }
    } catch (error) {
      alert('Terjadi kesalahan');
    }
    setIsDeleting(false);
  };

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-movie.jpg';

  return (
    <div className="fade-in glass-effect" style={{
      background: 'rgba(243, 243, 243, 0.9)',
      borderRadius: '20px',
      overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      border: '1px solid rgba(255, 215, 0, 0.3)',
      cursor: 'pointer',
      position: 'relative',
      backdropFilter: 'blur(20px)'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
      e.currentTarget.style.boxShadow = '0 25px 50px rgba(255, 215, 0, 0.4), 0 0 30px rgba(255, 165, 0, 0.3)';
      e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.6)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
      e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.3)';
    }}>
      <div style={{ position: 'relative', paddingBottom: '150%' }}>
        {!imageError ? (
          movie.tmdb_id ? (
            <a
              href={`https://www.themoviedb.org/${isTVShow ? 'tv' : 'movie'}/${movie.tmdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Lihat di TMDB"
              style={{ display: 'block' }}
            >
              <img
                src={posterUrl}
                alt={isTVShow ? movie.name : movie.title}
                onError={() => setImageError(true)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </a>
          ) : (
            <img
              src={posterUrl}
              alt={isTVShow ? movie.name : movie.title}
              onError={() => setImageError(true)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.5,
                cursor: 'not-allowed'
              }}
              title="TMDB ID tidak tersedia"
            />
          )
        ) : (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px'
          }}>
            {isTVShow ? '📺' : '🎬'}
          </div>
        )}
        
        <div className="glass-effect" style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(10px)',
          padding: '8px 14px',
          borderRadius: '25px',
          fontSize: '13px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: '#FFD700',
          border: '1px solid rgba(255, 215, 0, 0.3)',
          fontFamily: 'Poppins, sans-serif'
        }}>
          ⭐ {isTVShow ? (movie.rating || movie.vote_average ? parseFloat(movie.rating || movie.vote_average).toFixed(1) : 'N/A') : (movie.rating ? parseFloat(movie.rating).toFixed(1) : 'N/A')}
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        <h3 className="text-gradient" style={{
          fontSize: '20px',
          fontWeight: '700',
          marginBottom: '12px',
          lineHeight: '1.3',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          fontFamily: 'Poppins, sans-serif',
          letterSpacing: '-0.3px'
        }}>
          {isTVShow ? movie.name : movie.title}
        </h3>

        <p style={{
          color: '#1a1a1a',
          fontSize: '15px',
          marginBottom: '20px',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: '500'
        }}>
          📅 {isTVShow ? (movie.first_air_date ? new Date(movie.first_air_date).getFullYear() : 'Unknown') : (movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown')}
        </p>

        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <Link href={`/${isTVShow ? 'edit/tvshow' : 'edit'}/${movie.id}`} className="btn btn-secondary" style={{ 
            flex: '1', 
            minWidth: '90px', 
            justifyContent: 'center',
            borderRadius: '15px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: '600',
            fontFamily: 'Poppins, sans-serif',
            color: '#1a1a1a'
          }}>
            ✨ Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="btn btn-danger"
            style={{ 
              flex: '1', 
              minWidth: '90px', 
              justifyContent: 'center',
              borderRadius: '15px',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: '600',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            {isDeleting ? '⏳' : '🗑️'} Hapus
          </button>
        </div>
      </div>
    </div>
  );
}