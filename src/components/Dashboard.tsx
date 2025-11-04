import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, TrendingUp, Moon, Apple, Heart, Calendar } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { WellnessEntry } from '../App';

interface DashboardProps {
  onNavigate: (page: 'home' | 'tracker' | 'dashboard') => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [entries, setEntries] = useState<WellnessEntry[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('wellnessEntries') || '[]');
    setEntries(stored);
  }, []);

  const chartData = entries.slice(-14).map((entry) => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    sleep: entry.sleep,
    mood: entry.mood,
    foodScore: entry.food === 'Good' ? 10 : entry.food === 'Average' ? 5 : 2,
  }));

  const averageSleep = entries.length > 0 
    ? (entries.reduce((sum, e) => sum + e.sleep, 0) / entries.length).toFixed(1)
    : '0';

  const averageMood = entries.length > 0
    ? (entries.reduce((sum, e) => sum + e.mood, 0) / entries.length).toFixed(1)
    : '0';

  const goodFoodCount = entries.filter(e => e.food === 'Good').length;
  const foodPercentage = entries.length > 0
    ? Math.round((goodFoodCount / entries.length) * 100)
    : 0;

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-6xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('home')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-8 h-8 text-indigo-600" />
          <h2>Progress Dashboard</h2>
        </div>

        {entries.length === 0 ? (
          <Card className="p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-600 mb-2">No Data Yet</h3>
            <p className="text-gray-500 mb-6">Start tracking your daily habits to see your progress here.</p>
            <Button onClick={() => onNavigate('tracker')} className="bg-indigo-600 hover:bg-indigo-700">
              Start Tracking
            </Button>
          </Card>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Moon className="w-5 h-5 text-indigo-600" />
                  <h3>Avg Sleep</h3>
                </div>
                <p className="text-gray-600">{averageSleep} hours/night</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="w-5 h-5 text-pink-600" />
                  <h3>Avg Mood</h3>
                </div>
                <p className="text-gray-600">{averageMood}/10</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Apple className="w-5 h-5 text-green-600" />
                  <h3>Good Food Days</h3>
                </div>
                <p className="text-gray-600">{foodPercentage}% of days</p>
              </Card>
            </div>

            <Card className="p-6 mb-6">
              <h3 className="mb-4">Sleep & Mood Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="sleep" 
                    stroke="#6366f1" 
                    strokeWidth={2}
                    name="Sleep (hours)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="#ec4899" 
                    strokeWidth={2}
                    name="Mood (1-10)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 mb-6">
              <h3 className="mb-4">Food Quality Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="foodScore" 
                    fill="#10b981" 
                    name="Food Quality Score"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Recent Entries</h3>
              <div className="space-y-3">
                {entries.slice(-5).reverse().map((entry) => (
                  <div key={entry.id} className="border-b pb-3 last:border-b-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-gray-600">
                        {new Date(entry.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                      <div className="flex gap-3">
                        <span className="text-indigo-600">💤 {entry.sleep}h</span>
                        <span className="text-green-600">🍎 {entry.food}</span>
                        <span className="text-pink-600">😊 {entry.mood}/10</span>
                      </div>
                    </div>
                    <p className="text-gray-700">{entry.advice}</p>
                  </div>
                ))}
              </div>
            </Card>

            <div className="mt-6 text-center">
              <Button 
                onClick={() => onNavigate('tracker')}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Add New Entry
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
