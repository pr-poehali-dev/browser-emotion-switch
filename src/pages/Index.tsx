
import { useState } from "react";
import BrowserEmulator from "@/components/BrowserEmulator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface BrowserOption {
  id: string;
  name: string;
  logo: string;
  description: string;
  color: string;
  initialUrl?: string;
}

export default function Index() {
  const [selectedBrowser, setSelectedBrowser] = useState<string | null>(null);
  
  const browsers: BrowserOption[] = [
    {
      id: "custom",
      name: "Мой Браузер",
      logo: "https://images.unsplash.com/photo-1510511336377-1a9caa095849?auto=format&fit=crop&w=100&h=100&q=80",
      description: "Базовый эмулятор веб-браузера с основным функционалом",
      color: "bg-blue-600 hover:bg-blue-700",
      initialUrl: "https://www.example.com"
    },
    {
      id: "firefox",
      name: "Firefox",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Firefox_logo%2C_2019.svg/100px-Firefox_logo%2C_2019.svg.png",
      description: "Быстрый, безопасный и открытый браузер",
      color: "bg-orange-500 hover:bg-orange-600",
      initialUrl: "https://www.mozilla.org"
    },
    {
      id: "yandex",
      name: "Яндекс Браузер",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Yandex_Browser_logo.svg/100px-Yandex_Browser_logo.svg.png",
      description: "Быстрый и безопасный браузер от Яндекса",
      color: "bg-red-500 hover:bg-red-600",
      initialUrl: "https://ya.ru"
    },
    {
      id: "opera",
      name: "Opera",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Opera_2015_icon.svg/100px-Opera_2015_icon.svg.png",
      description: "Инновационный и функциональный браузер",
      color: "bg-red-600 hover:bg-red-700",
      initialUrl: "https://www.opera.com"
    }
  ];
  
  // Найти выбранный браузер
  const currentBrowser = browsers.find(browser => browser.id === selectedBrowser);
  
  if (!selectedBrowser) {
    return (
      <div className="container mx-auto p-4 max-w-6xl min-h-screen flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Веб-браузер в браузере</h1>
          <p className="text-gray-600 text-xl mb-8">
            Выберите один из браузеров для эмуляции
          </p>
          
          <div className="mb-10">
            <img 
              src="https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&w=800&h=400&q=80" 
              alt="Коллекция браузеров" 
              className="mx-auto rounded-lg shadow-lg mb-8"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
          {browsers.map((browser) => (
            <Card key={browser.id} className="overflow-hidden transition-transform hover:transform hover:scale-105">
              <CardContent className="p-0">
                <div 
                  className={`p-4 ${browser.color} text-white text-center`}
                >
                  <img 
                    src={browser.logo} 
                    alt={browser.name} 
                    className="w-16 h-16 mx-auto mb-2 rounded-full bg-white p-1"
                  />
                  <h3 className="font-bold text-lg">{browser.name}</h3>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-4">{browser.description}</p>
                  <Button 
                    className={`w-full ${browser.color} text-white`}
                    onClick={() => setSelectedBrowser(browser.id)}
                  >
                    Запустить
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 bg-gray-50 p-6 rounded-lg text-sm max-w-2xl">
          <h2 className="font-medium mb-3 text-lg">Возможности эмулятора браузера:</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Навигация по сайтам (вводите URL в адресную строку)</li>
            <li>Открытие нескольких вкладок и переключение между ними</li>
            <li>Перемещение по истории браузера (кнопки назад/вперед)</li>
            <li>Обновление страницы</li>
            <li>Переход на домашнюю страницу</li>
            <li>Имитация загрузки страниц</li>
          </ul>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="text-center mb-6 mt-4">
        <h1 className="text-3xl font-bold mb-2">Эмулятор браузера: {currentBrowser?.name}</h1>
        <p className="text-gray-600 mb-4">
          Испытайте работу с веб-браузером внутри вашего браузера
        </p>
        <Button 
          variant="outline" 
          className="mb-4"
          onClick={() => setSelectedBrowser(null)}
        >
          ← Вернуться к выбору браузера
        </Button>
      </div>
      
      <BrowserEmulator 
        initialUrl={currentBrowser?.initialUrl} 
        browserType={currentBrowser?.id}
      />
      
      <div className="mt-8 bg-gray-50 p-4 rounded-lg text-sm">
        <h2 className="font-medium mb-2">Возможности {currentBrowser?.name}:</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Навигация по сайтам (вводите URL в адресную строку)</li>
          <li>Открытие нескольких вкладок</li>
          <li>Перемещение по истории браузера (кнопки назад/вперед)</li>
          <li>Обновление страницы</li>
          <li>Переход на домашнюю страницу</li>
        </ul>
      </div>
    </div>
  );
}
