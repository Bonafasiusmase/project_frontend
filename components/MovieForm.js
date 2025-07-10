import { useState, useEffect } from 'react';

export default function MovieForm({ movieData = {}, onSubmit, loading = false }) {
  const [formData, setFormData] = useState({
    title: '',
    poster_path: '',
    release_date: '',
    rating: ''
  });

  const [errors, setErrors] = useState({});

useEffect(() => {
  if (movieData) {
    setFormData({
      title: movieData.title || movieData.name || '', // <-- tambahkan movieData.name
      poster_path: movieData.poster_path || '',
      release_date: movieData.release_date || '',
      rating: movieData.rating || movieData.vote_average || ''
    });
  }
}, [movieData]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Judul harus diisi';
    if (!formData.release_date) newErrors.release_date = 'Tanggal rilis harus diisi';
    if (formData.rating && (isNaN(formData.rating) || formData.rating < 0 || formData.rating > 10)) {
      newErrors.rating = 'Rating harus berupa angka antara 0-10';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="glass-effect fade-in" style={{
      background: 'rgba(255, 255, 255, 0.08)',
      borderRadius: '25px',
      padding: '40px',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      maxWidth: '650px',
      margin: '0 auto',
      backdropFilter: 'blur(20px)'
    }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '12px', 
            fontWeight: '600',  
            color: 'white',
            fontSize: '16px',
            fontFamily: 'Poppins, sans-serif'
          }}>
            Judul Film *
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="🎬 Masukkan judul film"
            className="glass-effect"
            style={{
              width: '100%',
              padding: '16px 20px',
              border: `1px solid ${errors.title ? '#ff6b6b' : 'rgba(255, 255, 255, 0.3)'}`,
              borderRadius: '15px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '16px',
              fontFamily: 'Poppins, sans-serif',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = errors.title ? '#ff6b6b' : 'rgba(102, 126, 234, 0.5)';
              e.target.style.boxShadow = `0 0 20px ${errors.title ? 'rgba(255, 107, 107, 0.3)' : 'rgba(102, 126, 234, 0.3)'}`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = errors.title ? '#ff6b6b' : 'rgba(255, 255, 255, 0.3)';
              e.target.style.boxShadow = 'none';
            }}
          />
          {errors.title && <p style={{ 
            color: '#ff6b6b', 
            fontSize: '14px', 
            marginTop: '8px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '500'
          }}>{errors.title}</p>}
        </div>

        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '12px', 
            fontWeight: '600',  
            color: 'white',
            fontSize: '16px',
            fontFamily: 'Poppins, sans-serif'
          }}>
            Poster Path
          </label>
          <input
            name="poster_path"
            value={formData.poster_path}
            onChange={handleChange}
            placeholder="🖼️ /path/to/poster.jpg"
            className="glass-effect"
            style={{
              width: '100%',
              padding: '16px 20px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '15px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
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
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '12px', 
            fontWeight: '600',  
            color: 'white',
            fontSize: '16px',
            fontFamily: 'Poppins, sans-serif'
          }}>
            Tanggal Rilis *
          </label>
          <input
            name="release_date"
            type="date"
            value={formData.release_date}
            onChange={handleChange}
            className="glass-effect"
            style={{
              width: '100%',
              padding: '16px 20px',
              border: `1px solid ${errors.release_date ? '#ff6b6b' : 'rgba(255, 255, 255, 0.3)'}`,
              borderRadius: '15px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '16px',
              fontFamily: 'Poppins, sans-serif',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = errors.release_date ? '#ff6b6b' : 'rgba(102, 126, 234, 0.5)';
              e.target.style.boxShadow = `0 0 20px ${errors.release_date ? 'rgba(255, 107, 107, 0.3)' : 'rgba(102, 126, 234, 0.3)'}`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = errors.release_date ? '#ff6b6b' : 'rgba(255, 255, 255, 0.3)';
              e.target.style.boxShadow = 'none';
            }}
          />
          {errors.release_date && <p style={{ 
            color: '#ff6b6b', 
            fontSize: '14px', 
            marginTop: '8px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '500'
          }}>{errors.release_date}</p>}
        </div>

        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '12px', 
            fontWeight: '600',  
            color: 'white',
            fontSize: '16px',
            fontFamily: 'Poppins, sans-serif'
          }}>
            Rating (0-10)
          </label>
          <input
            name="rating"
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={formData.rating}
            onChange={handleChange}
            placeholder="⭐ 8.5"
            className="glass-effect"
            style={{
              width: '100%',
              padding: '16px 20px',
              border: `1px solid ${errors.rating ? '#ff6b6b' : 'rgba(255, 255, 255, 0.3)'}`,
              borderRadius: '15px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '16px',
              fontFamily: 'Poppins, sans-serif',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = errors.rating ? '#ff6b6b' : 'rgba(102, 126, 234, 0.5)';
              e.target.style.boxShadow = `0 0 20px ${errors.rating ? 'rgba(255, 107, 107, 0.3)' : 'rgba(102, 126, 234, 0.3)'}`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = errors.rating ? '#ff6b6b' : 'rgba(255, 255, 255, 0.3)';
              e.target.style.boxShadow = 'none';
            }}
          />
          {errors.rating && <p style={{ 
            color: '#ff6b6b', 
            fontSize: '14px', 
            marginTop: '8px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '500'
          }}>{errors.rating}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
          style={{
            padding: '18px 32px',
            fontSize: '18px',
            fontWeight: '700',
            justifyContent: 'center',
            borderRadius: '20px',
            fontFamily: 'Poppins, sans-serif',
            marginTop: '8px'
          }}
        >
          {loading ? '⏳ Menyimpan...' : '✨ Update Film'}
        </button>
      </form>
    </div>
  );
}