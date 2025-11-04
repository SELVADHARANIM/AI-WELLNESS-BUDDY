import { useState } from 'react';
import Home from './components/Home';
import Tracker from './components/Tracker';
import Dashboard from './components/Dashboard';

export type FoodQuality = 'Poor' | 'Average' | 'Good';

export interface WellnessEntry {
  id: string;
  date: string;
  sleep: number;
  food: FoodQuality;
  mood: number;
  advice: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'tracker' | 'dashboard'>('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
      {currentPage === 'tracker' && <Tracker onNavigate={setCurrentPage} />}
      {currentPage === 'dashboard' && <Dashboard onNavigate={setCurrentPage} />}
    </div>
  );
}
