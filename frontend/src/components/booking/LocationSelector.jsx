// frontend/src/components/booking/LocationSelector.jsx
import React, { useState, useEffect } from 'react';
import { MapPin, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LocationSelector = ({ onLocationSelect, placeholder, label, value }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const myanmarLocations = [
    { id: 1, name: 'Yangon City Center', nameMy: 'ရန်ကုန်မြို့လယ်', coordinates: [16.8661, 96.1951] },
    { id: 2, name: 'Sule Pagoda', nameMy: 'ဆူးလေဘုရား', coordinates: [16.7794, 96.1297] },
    { id: 3, name: 'Shwedagon Pagoda', nameMy: 'ရွှေတိဂုံဘုရား', coordinates: [16.7982, 96.1492] },
    { id: 4, name: 'Bogyoke Market', nameMy: 'ဗိုလ်ချုပ်ဈေး', coordinates: [16.7803, 96.1297] },
    { id: 5, name: 'Inya Lake', nameMy: 'အင်းယားကန်', coordinates: [16.8171, 96.1297] },
    { id: 6, name: 'Yangon Airport', nameMy: 'ရန်ကုန်လေဆိပ်', coordinates: [16.9073, 96.1297] }
  ];

  useEffect(() => {
    setLocations(myanmarLocations);
    setFilteredLocations(myanmarLocations);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = locations.filter(location =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.nameMy.includes(searchTerm)
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations(locations);
    }
  }, [searchTerm, locations]);

  const handleLocationSelect = (location) => {
    setSearchTerm(`${location.name} - ${location.nameMy}`);
    setIsOpen(false);
    onLocationSelect(location);
  };

  return (
    <div className="relative mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        />
      </div>
      
      {isOpen && filteredLocations.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredLocations.map((location) => (
            <div
              key={location.id}
              onClick={() => handleLocationSelect(location)}
              className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{location.name}</p>
                  <p className="text-sm text-gray-600">{location.nameMy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
