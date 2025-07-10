import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import MovieGrid from '../components/MovieGrid';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('movie');
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    setItems([]);
    setFilteredItems([]);
    setError('');
    fetchItems();
  }, [activeTab]);

  useEffect(() => {
    sortItems();
  }, [items, sortBy]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const url = activeTab === 'movie' ? '/api/movies' : '/api/tvshows';
      const res = await fetch(url);
      if (!res.ok) throw new Error('Gagal mengambil data');
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Data tidak valid');
      setItems(data);
      setFilteredItems(data);
    } catch (err) {
      setError('Gagal memuat data, coba lagi.');
      setItems([]);
      setFilteredItems([]);
      console.error('FETCH ERROR:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredItems(items);
      return;
    }
    const filtered = items.filter(item =>
      (item.title || item.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const sortItems = () => {
    const sorted = [...filteredItems].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date((b.release_date || b.first_air_date)) - new Date((a.release_date || a.first_air_date));
        case 'oldest':
          return new Date((a.release_date || a.first_air_date)) - new Date((b.release_date || b.first_air_date));
        case 'rating':
          return parseFloat(b.rating || b.vote_average || 0) - parseFloat(a.rating || a.vote_average || 0);
        case 'title':
          return (a.title || a.name).localeCompare(b.title || b.name);
        default:
          return 0;
      }
    });
    setFilteredItems(sorted);
  };

  // Navigasi ke halaman tambah
  const handleAdd = () => {
    if (activeTab === 'movie') {
      router.push('/add');
    } else {
      router.push('/add-tvshow');
    }
  };

  // Navigasi ke halaman edit
  const handleEdit = (id) => {
    if (activeTab === 'movie') {
      router.push(`/edit/${id}`);
    } else {
      router.push(`/edit/tvshow/${id}`);
    }
  };

  // Hapus data dengan konfirmasi
  // Sekarang hanya update state, tidak fetch ke API lagi
  const handleDelete = (itemId) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
    setFilteredItems(updatedItems);
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <div className="glass-effect" style={{ width: '100%', position: 'relative', zIndex: 10 }}>
        <Header onSearch={handleSearch} />
      </div>
      
      {/* Hero Section */}
      <div className="bg-sky slide-up" style={{
        width: '100%',
        minHeight: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <h1 className="glow text-gradient" style={{ 
          fontSize: '32px', 
          fontWeight: 800, 
          margin: 0, 
          letterSpacing: '-0.5px',
          fontFamily: 'Poppins, sans-serif',
          textShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
        }}>
          🎥 Koleksi {activeTab === 'movie' ? 'Film' : 'TV Show'} 
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <label style={{ 
            color: '#FFD700', 
            fontWeight: 600, 
            fontSize: '16px',
            fontFamily: 'Poppins, sans-serif'
          }}>✨ Urutkan:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="glass-effect"
            style={{
              padding: '10px 16px',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              borderRadius: '20px',
              background: 'rgba(13, 27, 62, 0.8)',
              color: '#FFD700',
              fontSize: '15px',
              fontWeight: 600,
              fontFamily: 'Poppins, sans-serif',
              cursor: 'pointer',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="rating">Rating Tertinggi</option>
            <option value="title">Judul A-Z</option>
          </select>
        </div>
      </div>
      
      {/* Tab Movie/TV Show */}
      <div className="fade-in" style={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '20px', 
        padding: '32px 0 0 0',
        position: 'relative'
      }}>
        <button
          className={`btn ${activeTab === 'movie' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ 
            minWidth: 140, 
            fontWeight: 700, 
            fontSize: 18,
            borderRadius: 25,
            padding: '16px 32px',
            fontFamily: 'Poppins, sans-serif',
            background: activeTab === 'movie' 
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : 'rgba(255, 255, 255, 0.1)',
            color: activeTab === 'movie' ? '#fff' : '#FFD700',
            border: activeTab === 'movie' 
              ? '2px solid rgba(102, 126, 234, 0.5)'
              : '2px solid rgba(255, 215, 0, 0.3)',
            boxShadow: activeTab === 'movie' 
              ? '0 8px 25px rgba(102, 126, 234, 0.4)'
              : 'none'
          }}
          onClick={() => setActiveTab('movie')}
        >
          🎥 Movies
        </button>
        <button
          className={`btn ${activeTab === 'tvshow' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ 
            minWidth: 140, 
            fontWeight: 700, 
            fontSize: 18,
            borderRadius: 25,
            padding: '16px 32px',
            fontFamily: 'Poppins, sans-serif',
            background: activeTab === 'tvshow' 
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : 'rgba(255, 255, 255, 0.1)',
            color: activeTab === 'tvshow' ? '#fff' : '#FFD700',
            border: activeTab === 'tvshow' 
              ? '2px solid rgba(102, 126, 234, 0.5)'
              : '2px solid rgba(255, 215, 0, 0.3)',
            boxShadow: activeTab === 'tvshow' 
              ? '0 8px 25px rgba(102, 126, 234, 0.4)'
              : 'none'
          }}
          onClick={() => setActiveTab('tvshow')}
        >
          📺 TV Shows
        </button>
      </div>
      
      {/* Error Message */}
      {error && (
        <div style={{ color: '#ff6b6b', textAlign: 'center', margin: '16px 0', fontWeight: 'bold' }}>
          {error}
        </div>
      )}
      
      {/* Grid */}
      <div style={{ 
        width: '100%', 
        minHeight: '60vh', 
        padding: '40px 0 60px 0',
        position: 'relative'
      }}>
        <main className="container fade-in">
          <MovieGrid
            movies={filteredItems}
            onDelete={handleDelete}
            onEdit={handleEdit}
            loading={loading}
            isTVShow={activeTab === 'tvshow'}
          />
        </main>
      </div>
    </div>
  );
}