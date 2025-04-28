
import { useState } from "react";
import BrowserEmulator from "@/components/BrowserEmulator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [url, setUrl] = useState<string>("https://www.example.com");
  const [showEmulator, setShowEmulator] = useState<boolean>(false);

  const handleStart = () => {
    setShowEmulator(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-indigo-100 p-6">
      {!showEmulator ? (
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 mt-20 text-center">
          <h1 className="text-3xl font-bold mb-6 text-indigo-700">Эмулятор Браузера</h1>
          <p className="text-gray-600 mb-8">
            Это приложение позволяет эмулировать работу другого браузера прямо в вашем текущем браузере.
          </p>
          <div className="mb-6">
            <label className="block text-left text-sm font-medium text-gray-700 mb-2">
              Начальный URL:
            </label>
            <Input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Введите URL"
              className="mb-4"
            />
          </div>
          <Button 
            onClick={handleStart} 
            className="w-full bg-indigo-600 hover:bg-indigo-700"
          >
            Запустить эмулятор
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-6xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-indigo-700">Эмулятор Браузера</h1>
            <Button 
              variant="outline" 
              onClick={() => setShowEmulator(false)}
            >
              Вернуться назад
            </Button>
          </div>
          <BrowserEmulator initialUrl={url} />
        </div>
      )}
    </div>
  );
};

export default Index;
