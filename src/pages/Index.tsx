
import BrowserEmulator from "@/components/BrowserEmulator";

export default function Index() {
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="text-center mb-8 mt-8">
        <h1 className="text-3xl font-bold mb-2">Эмулятор браузера</h1>
        <p className="text-gray-600">
          Испытайте работу с веб-браузером внутри вашего браузера
        </p>
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
