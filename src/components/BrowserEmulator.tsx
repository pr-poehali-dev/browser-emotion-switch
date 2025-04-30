
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, RotateCcw, Home, Plus, X, Search } from "lucide-react";

interface BrowserEmulatorProps {
  initialUrl?: string;
  browserType?: string;
}

interface Tab {
  id: number;
  url: string;
  title: string;
  history: string[];
  historyIndex: number;
}

interface BrowserTheme {
  toolbar: string;
  tabsBar: string;
  activeTab: string;
  inactiveTab: string;
  urlBar: string;
  statusBar: string;
  borderColor: string;
  logo: string;
  name: string;
}

const BrowserEmulator = ({ 
  initialUrl = "https://www.example.com", 
  browserType = "custom" 
}: BrowserEmulatorProps) => {
  // Определение тем браузеров
  const browserThemes: Record<string, BrowserTheme> = {
    custom: {
      toolbar: "bg-gray-200",
      tabsBar: "bg-gray-100",
      activeTab: "bg-white",
      inactiveTab: "bg-gray-100 hover:bg-gray-200",
      urlBar: "bg-white",
      statusBar: "bg-gray-100",
      borderColor: "border-gray-300",
      logo: "https://images.unsplash.com/photo-1510511336377-1a9caa095849?auto=format&fit=crop&w=100&h=100&q=80",
      name: "Мой Браузер"
    },
    firefox: {
      toolbar: "bg-slate-700",
      tabsBar: "bg-slate-800",
      activeTab: "bg-slate-700",
      inactiveTab: "bg-slate-800 hover:bg-slate-700",
      urlBar: "bg-slate-600 text-white",
      statusBar: "bg-slate-800 text-gray-300",
      borderColor: "border-slate-600",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Firefox_logo%2C_2019.svg/100px-Firefox_logo%2C_2019.svg.png",
      name: "Firefox"
    },
    yandex: {
      toolbar: "bg-blue-50",
      tabsBar: "bg-white",
      activeTab: "bg-white",
      inactiveTab: "bg-gray-100 hover:bg-gray-50",
      urlBar: "bg-white",
      statusBar: "bg-gray-100",
      borderColor: "border-gray-200",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Yandex_Browser_logo.svg/100px-Yandex_Browser_logo.svg.png",
      name: "Яндекс Браузер"
    },
    opera: {
      toolbar: "bg-red-100",
      tabsBar: "bg-red-50",
      activeTab: "bg-white",
      inactiveTab: "bg-red-50 hover:bg-red-100",
      urlBar: "bg-white",
      statusBar: "bg-red-100 text-red-900",
      borderColor: "border-red-200",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Opera_2015_icon.svg/100px-Opera_2015_icon.svg.png",
      name: "Opera"
    }
  };

  // Выбираем текущую тему браузера
  const theme = browserThemes[browserType] || browserThemes.custom;

  // Безопасно обрабатываем URL
  const safeInitialUrl = (url: string) => {
    try {
      // Пробуем добавить протокол, если его нет
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }
      new URL(url); // Проверяем, что URL валидный
      return url;
    } catch (e) {
      return "https://www.example.com";
    }
  };
  
  const validInitialUrl = safeInitialUrl(initialUrl);

  const [tabs, setTabs] = useState<Tab[]>([
    { 
      id: 1, 
      url: validInitialUrl, 
      title: "Новая вкладка", 
      history: [validInitialUrl],
      historyIndex: 0
    }
  ]);
  const [activeTab, setActiveTab] = useState<string>("1");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Находим текущую активную вкладку
  const currentTab = tabs.find(tab => tab.id.toString() === activeTab);

  const handleNavigate = (url: string) => {
    try {
      let processedUrl = url;
      
      // Добавляем протокол, если его нет
      if (!processedUrl.startsWith("http://") && !processedUrl.startsWith("https://")) {
        processedUrl = "https://" + processedUrl;
      }
      
      // Проверяем, валидный ли URL
      try {
        new URL(processedUrl);
      } catch (e) {
        // Если URL не валидный, обрабатываем как поисковый запрос
        processedUrl = "https://www.google.com/search?q=" + encodeURIComponent(url);
      }
      
      setIsLoading(true);
      
      // Обновляем историю для текущей вкладки
      setTabs(prev => prev.map(tab => {
        if (tab.id.toString() === activeTab) {
          // Удаляем историю вперед, если мы были в середине истории
          const newHistory = tab.history.slice(0, tab.historyIndex + 1);
          return {
            ...tab,
            url: processedUrl,
            title: "Загрузка...",
            history: [...newHistory, processedUrl],
            historyIndex: newHistory.length
          };
        }
        return tab;
      }));
      
      // Имитируем загрузку
      setTimeout(() => {
        setIsLoading(false);
        
        // Обновляем заголовок после "загрузки"
        setTabs(prev => prev.map(tab => {
          if (tab.id.toString() === activeTab) {
            let pageTitle;
            try {
              const urlObj = new URL(processedUrl);
              pageTitle = urlObj.hostname;
            } catch (e) {
              pageTitle = "Неизвестный сайт";
            }
            
            return {
              ...tab,
              title: pageTitle
            };
          }
          return tab;
        }));
      }, 800);
    } catch (error) {
      // В случае ошибки URL показываем ошибку в браузере
      setTabs(prev => prev.map(tab => {
        if (tab.id.toString() === activeTab) {
          return {
            ...tab,
            title: "Ошибка URL",
            url: "about:invalid"
          };
        }
        return tab;
      }));
    }
  };

  const addNewTab = () => {
    const newTabId = tabs.length + 1;
    const newTab = {
      id: newTabId,
      url: "https://www.example.com",
      title: "Новая вкладка",
      history: ["https://www.example.com"],
      historyIndex: 0
    };
    
    setTabs([...tabs, newTab]);
    setActiveTab(newTabId.toString());
  };

  const closeTab = (tabId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (tabs.length === 1) {
      // Если это последняя вкладка, создаем новую
      setTabs([{
        id: 1,
        url: "https://www.example.com",
        title: "Новая вкладка",
        history: ["https://www.example.com"],
        historyIndex: 0
      }]);
      setActiveTab("1");
      return;
    }
    
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    
    // Если закрыли активную вкладку, переключаемся на первую из оставшихся
    if (tabId.toString() === activeTab) {
      setActiveTab(newTabs[0].id.toString());
    }
  };

  const goBack = () => {
    if (!currentTab || currentTab.historyIndex <= 0) return;
    
    setTabs(prev => prev.map(tab => {
      if (tab.id.toString() === activeTab) {
        const newIndex = tab.historyIndex - 1;
        return {
          ...tab,
          url: tab.history[newIndex],
          historyIndex: newIndex
        };
      }
      return tab;
    }));
    
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const goForward = () => {
    if (!currentTab || currentTab.historyIndex >= currentTab.history.length - 1) return;
    
    setTabs(prev => prev.map(tab => {
      if (tab.id.toString() === activeTab) {
        const newIndex = tab.historyIndex + 1;
        return {
          ...tab,
          url: tab.history[newIndex],
          historyIndex: newIndex
        };
      }
      return tab;
    }));
    
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const refresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const goHome = () => {
    const homePage = browserType === "firefox" ? "https://www.mozilla.org" :
                    browserType === "yandex" ? "https://ya.ru" :
                    browserType === "opera" ? "https://www.opera.com" :
                    "https://www.example.com";
    handleNavigate(homePage);
  };

  const [inputUrl, setInputUrl] = useState<string>(validInitialUrl);

  useEffect(() => {
    if (currentTab) {
      setInputUrl(currentTab.url);
    }
  }, [currentTab?.url]);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNavigate(inputUrl);
  };

  const getPageContent = (url: string) => {
    if (isLoading) {
      return (
        <div className="text-center">
          <div className={`animate-spin w-8 h-8 border-4 border-t-transparent rounded-full mx-auto mb-2 
            ${browserType === 'firefox' ? 'border-orange-500' : 
             browserType === 'yandex' ? 'border-blue-500' : 
             browserType === 'opera' ? 'border-red-500' : 
             'border-indigo-500'}`}>
          </div>
          <p>Загрузка...</p>
        </div>
      );
    }
    
    try {
      // Проверяем особые URL
      if (url === "about:invalid") {
        return (
          <div className="text-center max-w-2xl p-6 text-red-600">
            <h2 className="text-xl mb-4">Ошибка: неверный URL</h2>
            <p className="mb-4">Не удалось загрузить страницу. Проверьте, правильно ли введен адрес.</p>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p>Пример правильного формата: example.com или www.example.com</p>
            </div>
          </div>
        );
      }

      // Пытаемся разобрать URL
      const urlObj = new URL(url);
      
      if (urlObj.hostname === "www.example.com") {
        return (
          <div className="text-center max-w-2xl p-6">
            <h2 className="text-xl mb-4">Добро пожаловать в {theme.name}</h2>
            <p className="mb-2">Вы сейчас на стартовой странице</p>
            <div className="bg-gray-100 p-4 rounded-lg my-4">
              <p className="text-sm text-gray-500">
                Введите адрес сайта в адресную строку выше, чтобы перейти на другую страницу.
                Вы также можете открыть несколько вкладок и переключаться между ними.
              </p>
            </div>
            <img 
              src={theme.logo} 
              alt={`${theme.name} logo`} 
              className="w-24 h-24 mx-auto mb-6"
            />
            <img 
              src="https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&w=800&h=400&q=80" 
              alt="Website preview" 
              className="mx-auto rounded-lg shadow-md"
            />
          </div>
        );
      } else if (urlObj.hostname === "www.mozilla.org" && browserType === "firefox") {
        return (
          <div className="text-center max-w-2xl p-6">
            <h2 className="text-xl mb-4 text-orange-600">Firefox</h2>
            <p className="mb-2">Домашняя страница Firefox</p>
            <div className="bg-slate-100 p-4 rounded-lg my-4">
              <p className="text-sm text-slate-700">
                Firefox — свободный браузер на движке Gecko, разработкой и распространением которого занимается Mozilla Corporation.
              </p>
            </div>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Firefox_logo%2C_2019.svg/200px-Firefox_logo%2C_2019.svg.png" 
              alt="Firefox logo" 
              className="mx-auto mb-6"
            />
            <img 
              src="https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&h=400&q=80" 
              alt="Firefox preview" 
              className="mx-auto rounded-lg shadow-md"
            />
          </div>
        );
      } else if (urlObj.hostname === "ya.ru" && browserType === "yandex") {
        return (
          <div className="text-center max-w-2xl p-6">
            <h2 className="text-xl mb-4 text-blue-600">Яндекс</h2>
            <p className="mb-2">Поиск Яндекс</p>
            <div className="bg-blue-50 p-4 rounded-lg my-4">
              <p className="text-sm text-blue-600">
                Яндекс — крупнейшая российская IT-компания, владеющая одноимённой системой поиска в интернете.
              </p>
            </div>
            <div className="mb-6 relative">
              <Input
                className="h-10 pr-10 rounded-full text-center"
                placeholder="Найдётся всё"
                disabled
              />
              <Search className="absolute top-2 right-3 h-6 w-6 text-red-500" />
            </div>
            <img 
              src="https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&w=800&h=400&q=80" 
              alt="Yandex preview" 
              className="mx-auto rounded-lg shadow-md"
            />
          </div>
        );
      } else if (urlObj.hostname === "www.opera.com" && browserType === "opera") {
        return (
          <div className="text-center max-w-2xl p-6">
            <h2 className="text-xl mb-4 text-red-600">Opera</h2>
            <p className="mb-2">Добро пожаловать в Opera</p>
            <div className="bg-red-50 p-4 rounded-lg my-4">
              <p className="text-sm text-red-800">
                Opera — быстрый и безопасный браузер со встроенными функциями VPN, блокировщика рекламы и менеджера сообщений.
              </p>
            </div>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Opera_2015_icon.svg/200px-Opera_2015_icon.svg.png" 
              alt="Opera logo" 
              className="mx-auto mb-6"
            />
            <img 
              src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=800&h=400&q=80" 
              alt="Opera preview" 
              className="mx-auto rounded-lg shadow-md"
            />
          </div>
        );
      } else {
        return (
          <div className="text-center max-w-2xl p-6">
            <h2 className="text-xl mb-4">Страница для {urlObj.hostname}</h2>
            <p className="mb-2">Текущий URL: <strong>{url}</strong></p>
            <div className="bg-gray-100 p-4 rounded-lg my-4">
              <p className="text-sm text-gray-500">
                Это имитация страницы для {urlObj.hostname}.
                В реальном браузере здесь отображалось бы содержимое сайта.
              </p>
            </div>
            <img 
              src={`https://source.unsplash.com/random/800x400?website`}
              alt="Website preview" 
              className="mx-auto rounded-lg shadow-md mt-4"
            />
          </div>
        );
      }
    } catch (e) {
      return (
        <div className="text-center max-w-2xl p-6 text-red-600">
          <h2 className="text-xl mb-4">Ошибка загрузки страницы</h2>
          <p className="mb-4">Не удалось обработать URL: {url}</p>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p>Попробуйте другой адрес или вернитесь на <button 
              className="text-blue-500 underline" 
              onClick={goHome}
            >домашнюю страницу</button></p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={`w-full border ${theme.borderColor} rounded-lg overflow-hidden shadow-xl bg-white`}>
      {/* Toolbar */}
      <div className={`${theme.toolbar} p-2 border-b ${theme.borderColor}`}>
        <div className="flex items-center mb-2 space-x-2">
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={goBack}
            disabled={!currentTab || currentTab.historyIndex <= 0}
            className={browserType === 'firefox' ? 'text-white' : ''}
          >
            <ArrowLeft size={16} />
          </Button>
          
          <Button 
            size="icon" 
            variant="ghost"
            onClick={goForward}
            disabled={!currentTab || currentTab.historyIndex >= currentTab.history.length - 1}
            className={browserType === 'firefox' ? 'text-white' : ''}
          >
            <ArrowRight size={16} />
          </Button>
          
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={refresh}
            className={browserType === 'firefox' ? 'text-white' : ''}
          >
            <RotateCcw size={16} />
          </Button>
          
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={goHome}
            className={browserType === 'firefox' ? 'text-white' : ''}
          >
            <Home size={16} />
          </Button>
          
          <form onSubmit={handleUrlSubmit} className="flex-1">
            <Input
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className={`h-9 ${theme.urlBar}`}
              placeholder="Введите URL"
            />
          </form>
        </div>
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`${theme.tabsBar} w-full h-auto p-1 justify-start`}>
            {tabs.map(tab => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id.toString()} 
                className={`h-8 flex items-center justify-between pr-1 ${tab.id.toString() === activeTab ? theme.activeTab : theme.inactiveTab}`}
              >
                <span className="truncate max-w-32">{tab.title}</span>
                <X 
                  size={14} 
                  className="ml-2 opacity-60 hover:opacity-100 cursor-pointer" 
                  onClick={(e) => closeTab(tab.id, e)}
                />
              </TabsTrigger>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2" 
              onClick={addNewTab}
            >
              <Plus size={16} />
            </Button>
          </TabsList>
          
          {tabs.map(tab => (
            <TabsContent key={tab.id} value={tab.id.toString()} className="m-0">
              <div className="bg-white h-[60vh] flex items-center justify-center overflow-auto p-4">
                {tab.id.toString() === activeTab && getPageContent(tab.url)}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      {/* Status bar */}
      <div className={`${theme.statusBar} text-xs p-1 border-t ${theme.borderColor} flex justify-between`}>
        <span>{currentTab?.url || ""}</span>
        <span>Эмулятор {theme.name} v1.0</span>
      </div>
    </div>
  );
};

export default BrowserEmulator;
