
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, RotateCcw, Home, Plus, X } from "lucide-react";

interface BrowserEmulatorProps {
  initialUrl: string;
}

interface Tab {
  id: number;
  url: string;
  title: string;
  history: string[];
  historyIndex: number;
}

const BrowserEmulator = ({ initialUrl }: BrowserEmulatorProps) => {
  const [tabs, setTabs] = useState<Tab[]>([
    { 
      id: 1, 
      url: initialUrl, 
      title: "Новая вкладка", 
      history: [initialUrl],
      historyIndex: 0
    }
  ]);
  const [activeTab, setActiveTab] = useState<string>("1");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Находим текущую активную вкладку
  const currentTab = tabs.find(tab => tab.id.toString() === activeTab);

  const handleNavigate = (url: string) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }
    
    setIsLoading(true);
    
    // Обновляем историю для текущей вкладки
    setTabs(prev => prev.map(tab => {
      if (tab.id.toString() === activeTab) {
        // Удаляем историю вперед, если мы были в середине истории
        const newHistory = tab.history.slice(0, tab.historyIndex + 1);
        return {
          ...tab,
          url,
          title: "Загрузка...",
          history: [...newHistory, url],
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
          const domain = new URL(url).hostname;
          return {
            ...tab,
            title: domain
          };
        }
        return tab;
      }));
    }, 800);
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
    handleNavigate("https://www.example.com");
  };

  const [inputUrl, setInputUrl] = useState<string>(initialUrl);

  useEffect(() => {
    if (currentTab) {
      setInputUrl(currentTab.url);
    }
  }, [currentTab?.url]);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNavigate(inputUrl);
  };

  return (
    <div className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-xl bg-white">
      {/* Toolbar */}
      <div className="bg-gray-200 p-2 border-b border-gray-300">
        <div className="flex items-center mb-2 space-x-2">
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={goBack}
            disabled={!currentTab || currentTab.historyIndex <= 0}
          >
            <ArrowLeft size={16} />
          </Button>
          
          <Button 
            size="icon" 
            variant="ghost"
            onClick={goForward}
            disabled={!currentTab || currentTab.historyIndex >= currentTab.history.length - 1}
          >
            <ArrowRight size={16} />
          </Button>
          
          <Button size="icon" variant="ghost" onClick={refresh}>
            <RotateCcw size={16} />
          </Button>
          
          <Button size="icon" variant="ghost" onClick={goHome}>
            <Home size={16} />
          </Button>
          
          <form onSubmit={handleUrlSubmit} className="flex-1">
            <Input
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="h-9 bg-white"
              placeholder="Введите URL"
            />
          </form>
        </div>
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-gray-100 w-full h-auto p-1 justify-start">
            {tabs.map(tab => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id.toString()} 
                className="h-8 flex items-center justify-between pr-1 data-[state=active]:bg-white"
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
              <div className="bg-white h-[60vh] flex items-center justify-center overflow-auto">
                {isLoading && tab.id.toString() === activeTab ? (
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p>Загрузка...</p>
                  </div>
                ) : (
                  <div className="text-center max-w-2xl p-6">
                    <h2 className="text-xl mb-4">Это эмуляция браузера</h2>
                    <p className="mb-2">Текущий URL: <strong>{tab.url}</strong></p>
                    <div className="bg-gray-100 p-4 rounded-lg my-4">
                      <p className="text-sm text-gray-500">
                        Содержимое страницы для {tab.url} будет отображаться здесь.
                        Обратите внимание, что это только эмуляция и не является настоящим браузером.
                      </p>
                    </div>
                    <img 
                      src="https://images.unsplash.com/photo-1481487196290-c152efe083f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80" 
                      alt="Website preview" 
                      className="mx-auto rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      {/* Status bar */}
      <div className="bg-gray-100 text-xs text-gray-500 p-1 border-t border-gray-300 flex justify-between">
        <span>{currentTab?.url || ""}</span>
        <span>Эмулятор браузера v1.0</span>
      </div>
    </div>
  );
};

export default BrowserEmulator;
