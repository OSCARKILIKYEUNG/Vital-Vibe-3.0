'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Search, ExternalLink, Grid, List, Clock, Star } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/context';

interface WorkoutLink {
  id: string;
  title: string;
  url: string;
  source: string;
  duration?: number;
  difficulty: 'low' | 'mid' | 'high';
  tags: string[];
  thumbnail?: string;
}

interface Recipe {
  id: string;
  name: string;
  cuisine: string;
  totalTime: number;
  servings: number;
  caloriesPerServing: number;
  tags: string[];
  thumbnail?: string;
}

export default function LibraryPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('workout-links');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const workoutLinks: WorkoutLink[] = [
    {
      id: '1',
      title: '20-Minute HIIT Workout for Beginners',
      url: 'https://youtube.com/watch?v=example1',
      source: 'youtube.com',
      duration: 20,
      difficulty: 'low',
      tags: ['HIIT', 'beginner', 'cardio'],
      thumbnail: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg',
    },
    {
      id: '2',
      title: 'Full Body Strength Training',
      url: 'https://youtube.com/watch?v=example2',
      source: 'youtube.com',
      duration: 45,
      difficulty: 'mid',
      tags: ['strength', 'full-body', 'weights'],
      thumbnail: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
    },
  ];

  const recipes: Recipe[] = [
    {
      id: '1',
      name: 'Quinoa Buddha Bowl',
      cuisine: 'healthy',
      totalTime: 30,
      servings: 2,
      caloriesPerServing: 420,
      tags: ['vegetarian', 'high-protein', 'meal-prep'],
      thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    },
    {
      id: '2',
      name: 'Grilled Chicken & Vegetables',
      cuisine: 'mediterranean',
      totalTime: 25,
      servings: 4,
      caloriesPerServing: 380,
      tags: ['high-protein', 'low-carb', 'dinner'],
      thumbnail: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg',
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      mid: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800',
    };
    return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const filteredWorkoutLinks = workoutLinks.filter(link =>
    link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('library.title')}</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="workout-links">{t('library.workout_links')}</TabsTrigger>
          <TabsTrigger value="recipes">{t('library.recipes')}</TabsTrigger>
        </TabsList>

        {/* Search and View Controls */}
        <div className="flex items-center space-x-4 mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder={t('library.search')}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-brand-blue hover:bg-brand-blue/90' : ''}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-brand-blue hover:bg-brand-blue/90' : ''}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="workout-links" className="space-y-4">
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
            {filteredWorkoutLinks.map((link) => (
              <Card key={link.id} className="rounded-2xl shadow-sm bg-white border-gray-200 overflow-hidden">
                {viewMode === 'grid' && link.thumbnail && (
                  <div className="aspect-video bg-gray-100">
                    <img
                      src={link.thumbnail}
                      alt={link.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold line-clamp-2">{link.title}</h3>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-gray-500 mb-3">{link.source}</div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{link.duration}min</span>
                    </div>
                    <Badge className={getDifficultyColor(link.difficulty)}>
                      {link.difficulty}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {link.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recipes" className="space-y-4">
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
            {filteredRecipes.map((recipe) => (
              <Card key={recipe.id} className="rounded-2xl shadow-sm bg-white border-gray-200 overflow-hidden">
                {viewMode === 'grid' && recipe.thumbnail && (
                  <div className="aspect-video bg-gray-100">
                    <img
                      src={recipe.thumbnail}
                      alt={recipe.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{recipe.name}</h3>
                    <Button variant="ghost" size="sm">
                      <Star className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-gray-500 mb-3 capitalize">{recipe.cuisine}</div>
                  <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {recipe.totalTime}m
                    </div>
                    <div>{recipe.servings} servings</div>
                    <div>{recipe.caloriesPerServing} kcal</div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {recipe.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Button */}
      <div className="fixed bottom-24 right-4 md:bottom-8">
        <Button
          className="bg-brand-blue hover:bg-brand-blue/90 rounded-full h-14 w-14 shadow-lg"
          size="icon"
          aria-label={activeTab === 'workout-links' ? t('library.add_link') : t('library.add_recipe')}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}