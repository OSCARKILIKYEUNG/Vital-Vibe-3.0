'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Camera, Plus, Minus } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/context';

interface FoodItem {
  id: string;
  name: string;
  nameZh?: string;
  caloriesPer100g: number;
  grams: number;
  calories: number;
  confidence?: number;
}

interface MealAddSheetProps {
  open: boolean;
  onClose: () => void;
}

const MOCK_FOOD_CATALOG = [
  { id: 'rice', name: 'White Rice', nameZh: '米饭', caloriesPer100g: 130 },
  { id: 'chicken', name: 'Chicken Breast', nameZh: '鸡胸肉', caloriesPer100g: 165 },
  { id: 'broccoli', name: 'Broccoli', nameZh: '西兰花', caloriesPer100g: 34 },
  { id: 'salmon', name: 'Salmon', nameZh: '三文鱼', caloriesPer100g: 208 },
  { id: 'apple', name: 'Apple', nameZh: '苹果', caloriesPer100g: 52 },
];

export function MealAddSheet({ open, onClose }: MealAddSheetProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('manual');
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [aiStep, setAiStep] = useState(1);

  const handleAddFood = (food: typeof MOCK_FOOD_CATALOG[0]) => {
    const newItem: FoodItem = {
      id: `${food.id}-${Date.now()}`,
      name: food.name,
      nameZh: food.nameZh,
      caloriesPer100g: food.caloriesPer100g,
      grams: 100,
      calories: food.caloriesPer100g,
    };
    setFoodItems([...foodItems, newItem]);
  };

  const updateFoodItem = (id: string, grams: number) => {
    setFoodItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, grams, calories: Math.round((item.caloriesPer100g * grams) / 100) }
          : item
      )
    );
  };

  const removeFood = (id: string) => {
    setFoodItems(items => items.filter(item => item.id !== id));
  };

  const totalCalories = foodItems.reduce((sum, item) => sum + item.calories, 0);

  const filteredCatalog = MOCK_FOOD_CATALOG.filter(food =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (food.nameZh && food.nameZh.includes(searchQuery))
  );

  const generateAIItems = () => {
    const mockAIItems: FoodItem[] = [
      {
        id: 'ai-rice',
        name: 'Rice Bowl',
        nameZh: '米饭',
        caloriesPer100g: 130,
        grams: 150,
        calories: 195,
        confidence: 0.85,
      },
      {
        id: 'ai-chicken',
        name: 'Grilled Chicken',
        nameZh: '烤鸡肉',
        caloriesPer100g: 165,
        grams: 120,
        calories: 198,
        confidence: 0.45,
      },
    ];
    setFoodItems(mockAIItems);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl">
        <SheetHeader>
          <SheetTitle>{t('meals.add_meal')}</SheetTitle>
        </SheetHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="manual">{t('meals.manual')}</TabsTrigger>
            <TabsTrigger value="ai-auto">{t('meals.ai_auto')}</TabsTrigger>
            <TabsTrigger value="ai-quantity">{t('meals.ai_quantity')}</TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t('meals.search_food')}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto">
              {filteredCatalog.map(food => (
                <div key={food.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{food.name}</div>
                    {food.nameZh && <div className="text-sm text-gray-500">{food.nameZh}</div>}
                    <div className="text-xs text-gray-400">{food.caloriesPer100g} kcal/100g</div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleAddFood(food)}
                    className="bg-brand-blue hover:bg-brand-blue/90"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ai-auto" className="space-y-4">
            {!photoUploaded ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">{t('meals.photo_upload')}</p>
                <Button
                  onClick={() => setPhotoUploaded(true)}
                  className="bg-brand-blue hover:bg-brand-blue/90"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600">Photo uploaded</div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant={aiStep >= 1 ? "default" : "outline"}
                    onClick={() => {setAiStep(1); generateAIItems();}}
                    className={aiStep >= 1 ? "bg-brand-blue hover:bg-brand-blue/90" : ""}
                  >
                    1. {t('meals.identify_foods')}
                  </Button>
                  <Button
                    variant={aiStep >= 2 ? "default" : "outline"}
                    onClick={() => setAiStep(2)}
                    disabled={aiStep < 1}
                    className={aiStep >= 2 ? "bg-brand-blue hover:bg-brand-blue/90" : ""}
                  >
                    2. {t('meals.estimate_quantity')}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="ai-quantity" className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600">{t('meals.photo_upload')}</p>
            </div>
          </TabsContent>
        </Tabs>

        {foodItems.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="text-lg font-semibold">Added Items</div>
            {foodItems.map(item => (
              <div 
                key={item.id} 
                className={`p-4 border rounded-lg ${item.confidence && item.confidence < 0.6 ? 'bg-amber-50 border-amber-200' : 'bg-gray-50'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    {item.nameZh && <div className="text-sm text-gray-500">{item.nameZh}</div>}
                    {item.confidence && (
                      <Badge variant={item.confidence >= 0.6 ? "default" : "secondary"} className="text-xs">
                        {item.confidence >= 0.6 ? "Confident" : t('meals.needs_confirmation')}
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFood(item.id)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={item.grams}
                    onChange={(e) => updateFoodItem(item.id, parseInt(e.target.value) || 0)}
                    className="w-20"
                  />
                  <span className="text-sm">g</span>
                  <span className="text-sm text-gray-500">=</span>
                  <span className="text-sm font-medium">{item.calories} kcal</span>
                </div>
              </div>
            ))}
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">{t('meals.subtotal')}</span>
                <span className="text-xl font-bold text-brand-blue">{totalCalories} kcal</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-4 mt-6">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            {t('meals.cancel')}
          </Button>
          <Button 
            className="flex-1 bg-brand-blue hover:bg-brand-blue/90"
            disabled={foodItems.length === 0}
            onClick={onClose}
          >
            {t('meals.save')}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}