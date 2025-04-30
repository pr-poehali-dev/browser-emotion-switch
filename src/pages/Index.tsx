
import { useState } from "react";
import BrowserEmulator from "@/components/BrowserEmulator";
import { Button } from "@/components/ui/button";

export default function Index() {
  const [showBrowser, setShowBrowser] = useState(false);
  
  if (!showBrowser) {
    return (
      <div className="container mx-auto p-4 max-w-6xl min-h-screen flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Веб-браузер в браузере</h1>
          <p className="text-gray-600 text-xl mb-8">
            Испытайте работу с веб-браузером внутри вашего текущего браузера
          </p>
          
          <div className="mb-10">
            <img 
              src="https://images.unsplash.com/photo-1510511336377-1a9caa095849?auto=format&fit=crop&w=800&h=400&q=80" 
              alt="Браузер в браузере" 
              className="mx-auto rounded-lg shadow-lg mb-8"
            />
          </div>
          
          <Button 
            size="lg" 
            className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowBrowser(true)}
          >
            Запустить браузер
          </Button>
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
        <h1 className="text-3xl font-bold mb-2">Эмулятор браузера</h1>
        <p className="text-gray-600 mb-4">
          Испытайте работу с веб-браузером внутри вашего браузера
        </p>
        <Button 
          variant="outline" 
          className="mb-4"
          onClick={() => setShowBrowser(false)}
        >
          ← Вернуться на главную
        </Button>
      </div>
      
      <BrowserEmulator initialUrl="https://www.example.com" />
      
      <div className="mt-8 bg-gray-50 p-4 rounded-lg text-sm">
        <h2 className="font-medium mb-2">Возможности:</h2>
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
