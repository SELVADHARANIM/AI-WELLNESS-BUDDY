import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Alert, AlertDescription } from './ui/alert';
import { ArrowLeft, Lightbulb, Sparkles } from 'lucide-react';
import type { FoodQuality, WellnessEntry } from '../App';

interface TrackerProps {
  onNavigate: (page: 'home' | 'tracker' | 'dashboard') => void;
}

const generateAdvice = (sleep: number, food: FoodQuality, mood: number): string => {
  const advice: string[] = [];

  if (sleep < 6) {
    advice.push("Try to get at least 7-8 hours of sleep tonight. Quality rest is essential for your well-being.");
  } else if (sleep >= 8) {
    advice.push("Great job on getting enough sleep! Your body will thank you.");
  }

  if (food === 'Poor') {
    advice.push("Avoid junk food and stay hydrated today. Try incorporating more whole foods into your diet.");
  } else if (food === 'Good') {
    advice.push("Excellent food choices! Keep maintaining these healthy eating habits.");
  }

  if (mood <= 4) {
    advice.push("Your mood seems low. Take a short walk, meditate, or call a friend to lift your spirits.");
  } else if (mood <= 6) {
    advice.push("Consider doing something you enjoy today to boost your mood further.");
  } else if (mood >= 8) {
    advice.push("You're feeling great! Keep up the positive energy and spread it to others.");
  }

  if (advice.length === 0) {
    advice.push("You're doing well! Keep maintaining your healthy habits and stay consistent.");
  }

  return advice.join(' ');
};

export default function Tracker({ onNavigate }: TrackerProps) {
  const [sleep, setSleep] = useState<number>(7);
  const [food, setFood] = useState<FoodQuality>('Average');
  const [mood, setMood] = useState<number[]>([7]);
  const [advice, setAdvice] = useState<string>('');
  const [showAdvice, setShowAdvice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const generatedAdvice = generateAdvice(sleep, food, mood[0]);
    setAdvice(generatedAdvice);
    setShowAdvice(true);

    // Save to localStorage
    const entry: WellnessEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      sleep,
      food,
      mood: mood[0],
      advice: generatedAdvice,
    };

    const existingEntries = JSON.parse(localStorage.getItem('wellnessEntries') || '[]');
    localStorage.setItem('wellnessEntries', JSON.stringify([...existingEntries, entry]));

    // Scroll to advice
    setTimeout(() => {
      document.getElementById('advice-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('home')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-indigo-600" />
            <h2>Daily Habit Tracker</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="sleep">Sleep Hours</Label>
              <div className="flex items-center gap-4 mt-2">
                <Input
                  id="sleep"
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  value={sleep}
                  onChange={(e) => setSleep(parseFloat(e.target.value))}
                  className="max-w-32"
                  required
                />
                <span className="text-gray-600">{sleep} hours</span>
              </div>
            </div>

            <div>
              <Label htmlFor="food">Food Quality</Label>
              <Select value={food} onValueChange={(value) => setFood(value as FoodQuality)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select food quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Poor">Poor</SelectItem>
                  <SelectItem value="Average">Average</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="mood">Mood Score: {mood[0]}/10</Label>
              <div className="mt-4">
                <Slider
                  id="mood"
                  min={1}
                  max={10}
                  step={1}
                  value={mood}
                  onValueChange={setMood}
                  className="w-full"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">😢 Low</span>
                  <span className="text-gray-500">😊 High</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                Get AI Advice
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => onNavigate('dashboard')}
              >
                View Progress
              </Button>
            </div>
          </form>
        </Card>

        {showAdvice && (
          <div id="advice-section" className="mt-6">
            <Alert className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
              <Lightbulb className="w-5 h-5 text-indigo-600" />
              <AlertDescription className="ml-2">
                <strong className="text-indigo-900">AI Wellness Advice:</strong>
                <p className="mt-2 text-gray-700">{advice}</p>
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
}
