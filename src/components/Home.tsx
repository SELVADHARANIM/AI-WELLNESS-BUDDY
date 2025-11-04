import { Button } from './ui/button';
import { Card } from './ui/card';
import { Brain, Moon, Apple, Heart, TrendingUp } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: 'home' | 'tracker' | 'dashboard') => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-12 h-12 text-indigo-600" />
            <h1 className="text-indigo-600">AI Wellness Buddy</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your personal AI-powered companion for tracking daily habits and receiving intelligent wellness advice. 
            Monitor your sleep, nutrition, and mood to build healthier patterns.
          </p>
        </div>

        <Card className="p-8 mb-6">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Moon className="w-8 h-8 text-indigo-600" />
              </div>
              <h3>Track Sleep</h3>
              <p className="text-gray-600">Monitor your sleep hours and improve rest quality</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Apple className="w-8 h-8 text-green-600" />
              </div>
              <h3>Food Quality</h3>
              <p className="text-gray-600">Log your nutrition and eating habits</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-8 h-8 text-pink-600" />
              </div>
              <h3>Mood Tracking</h3>
              <p className="text-gray-600">Record your emotional well-being daily</p>
            </div>
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              onClick={() => onNavigate('tracker')}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Start Tracking
            </Button>
          </div>
        </Card>

        <div className="flex justify-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => onNavigate('dashboard')}
            className="gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            View Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
