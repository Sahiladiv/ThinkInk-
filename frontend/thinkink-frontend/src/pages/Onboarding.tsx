import React, { useState } from 'react';
import axios from 'axios';

const storyOptions = [
  'adventure',
  'romance',
  'sci-fi',
  'horror',
  'mystery',
  'fantasy',
];

const Onboarding: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const handleToggle = (genre: string) => {
    setSelected((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        '/api/onboarding/',
        {
          preferences: selected,
          completed: true,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        }
      );
      setMessage('Preferences saved successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to save preferences.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2">Onboarding</h2>
      <p className="mb-4">Welcome! What type of stories do you like?</p>

      <div className="mb-4 space-y-2">
        {storyOptions.map((genre) => (
          <label key={genre} className="block">
            <input
              type="checkbox"
              checked={selected.includes(genre)}
              onChange={() => handleToggle(genre)}
              className="mr-2"
            />
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </label>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>

      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
};

export default Onboarding;
