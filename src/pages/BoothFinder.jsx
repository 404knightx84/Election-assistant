import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Search, MapPin, Loader2, Navigation, Users, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Fix for default Leaflet icon in React
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const generateDummyBooths = (lat, lng) => {
  const names = ["Govt Primary School", "Community Center", "Municipal Hall", "Kendriya Vidyalaya", "Panchayat Bhavan"];
  const booths = [];
  for (let i = 0; i < 5; i++) {
    booths.push({
      id: Date.now() + i,
      name: `${names[i % names.length]}, Booth ${Math.floor(Math.random() * 100) + 1}`,
      lat: lat + (Math.random() - 0.5) * 0.05,
      lng: lng + (Math.random() - 0.5) * 0.05,
      voters: Math.floor(Math.random() * 1000) + 500
    });
  }
  return booths;
};

export default function BoothFinder() {
  const [center, setCenter] = useState([28.6139, 77.2090]); // Default to Delhi
  const [booths, setBooths] = useState(generateDummyBooths(28.6139, 77.2090));
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedBooth, setSelectedBooth] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}&countrycodes=in`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        const newLat = parseFloat(data[0].lat);
        const newLng = parseFloat(data[0].lon);
        setCenter([newLat, newLng]);
        setBooths(generateDummyBooths(newLat, newLng));
        setSelectedBooth(null);
      } else {
        setError('Location not found. Please try a different Indian city or pincode.');
      }
    } catch {
      setError('Failed to fetch location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with Image */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>Find Your Polling Booth</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>Search any city, locality or pincode in India to locate nearby voting centers on the interactive map.</p>
        </div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          style={{ flex: '0 0 auto' }}
        >
          <img src="/assets/map-hero.png" alt="Map" style={{ maxHeight: '140px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.08))' }} />
        </motion.div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Left Panel - Search & Booth List */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <input 
                  type="text" 
                  placeholder="City, Locality, or PIN..." 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="input"
                  style={{ paddingLeft: '2.75rem', fontSize: '1rem' }}
                />
                <Search style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '0 1.25rem' }}>
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
              </button>
            </form>
            {error && <div style={{ color: '#ef4444', fontSize: '0.85rem', padding: '0.5rem', background: '#fee2e2', borderRadius: '6px', marginTop: '0.75rem' }}>{error}</div>}
          </div>

          {/* Booth List */}
          <div className="glass-card" style={{ padding: '1.25rem', flex: 1 }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--navy)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Building2 size={18} /> Nearby Booths ({booths.length})
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '400px', overflowY: 'auto' }}>
              {booths.map((booth, idx) => (
                <motion.div
                  key={booth.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedBooth(booth)}
                  style={{ 
                    padding: '1rem', 
                    borderRadius: 'var(--radius-md)', 
                    background: selectedBooth?.id === booth.id ? 'rgba(249, 115, 22, 0.08)' : 'var(--bg-color)',
                    border: selectedBooth?.id === booth.id ? '1.5px solid var(--saffron)' : '1.5px solid var(--border-solid)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <MapPin size={14} color="var(--saffron)" />
                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--navy)' }}>{booth.name}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Users size={12} /> {booth.voters} voters
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Navigation size={12} /> Directions
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Panel - Map */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card" 
          style={{ flex: '2 1 500px', overflow: 'hidden' }}
        >
          <div style={{ height: '580px', width: '100%' }}>
            <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
              <ChangeView center={center} zoom={13} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
              {booths.map(booth => (
                <Marker key={booth.id} position={[booth.lat, booth.lng]}>
                  <Popup>
                    <div style={{ padding: '0.5rem 0', minWidth: '200px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <MapPin size={18} color="var(--saffron)" />
                        <h4 style={{ margin: 0, color: 'var(--navy)', fontSize: '1.05rem' }}>{booth.name}</h4>
                      </div>
                      <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <strong>Estimated Voters:</strong> {booth.voters}
                      </p>
                      <button style={{ width: '100%', padding: '0.5rem', background: 'var(--green)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, transition: 'background 0.2s' }} onMouseOver={e=>e.target.style.background='var(--green-light)'} onMouseOut={e=>e.target.style.background='var(--green)'}>
                        Get Directions
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          <div style={{ padding: '0.75rem 1.5rem', background: 'var(--bg-color)', borderTop: '1px solid var(--border-solid)', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            * Map markers are generated for demonstration based on the searched location.
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
