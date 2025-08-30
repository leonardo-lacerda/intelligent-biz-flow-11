import { useState, useEffect, useRef, useCallback } from "react";
import { Wifi, Battery, Signal } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: string;
}

const PhoneAnimation = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);
  
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const messageIndexRef = useRef(0);

  const messageSequence: Omit<Message, 'id' | 'timestamp'>[] = [
    { text: "Oi! Gostaria de agendar um horário", isBot: false },
    { text: "Olá! Claro, posso ajudar você a agendar. Para qual serviço você gostaria de marcar?", isBot: true },
    { text: "Corte de cabelo", isBot: false },
    { text: "Perfeito! Temos disponibilidade hoje às 15h ou amanhã às 10h. Qual prefere?", isBot: true },
    { text: "Hoje às 15h está ótimo!", isBot: false },
    { text: "✅ Agendamento confirmado para hoje às 15h! Te envio um lembrete 1h antes. Precisa de mais alguma coisa?", isBot: true },
    { text: "Não, obrigado!", isBot: false },
    { text: "😊 Até logo! Nos vemos hoje às 15h.", isBot: true }
  ];

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current = [];
  }, []);

  const addTimeout = useCallback((callback: () => void, delay: number) => {
    const timeout = setTimeout(() => {
      callback();
      timeoutsRef.current = timeoutsRef.current.filter(t => t !== timeout);
    }, delay);
    timeoutsRef.current.push(timeout);
    return timeout;
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    };
    
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);
    
    return () => clearInterval(timeInterval);
  }, []);

  const addMessage = useCallback(() => {
    if (!isAnimating || messageIndexRef.current >= messageSequence.length) return;
    
    const currentIndex = messageIndexRef.current;
    const message = messageSequence[currentIndex];
    
    // Show typing indicator
    setIsTyping(true);
    
    addTimeout(() => {
      if (!isAnimating) return;
      
      const newMessage: Message = {
        ...message,
        id: Date.now() + currentIndex,
        timestamp: new Date().toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
      messageIndexRef.current++;
      
      // Schedule next message
      if (messageIndexRef.current < messageSequence.length) {
        const nextMessage = messageSequence[messageIndexRef.current];
        addTimeout(addMessage, nextMessage.isBot ? 2500 : 1500);
      } else {
        // Reset animation after completion
        addTimeout(() => {
          if (!isAnimating) return;
          setMessages([]);
          setIsTyping(false);
          messageIndexRef.current = 0;
          addTimeout(addMessage, 1000);
        }, 4000);
      }
    }, message.isBot ? 1800 : 800);
  }, [addTimeout, isAnimating, messageSequence]);

  useEffect(() => {
    if (!isAnimating) return;
    
    // Start the animation
    addTimeout(addMessage, 1000);
    
    return () => {
      clearAllTimeouts();
    };
  }, [addMessage, addTimeout, clearAllTimeouts, isAnimating]);

  useEffect(() => {
    return () => {
      setIsAnimating(false);
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  const TypingIndicator = () => (
    <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-2xl rounded-bl-md max-w-20 animate-fade-in">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '75ms'}}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
      </div>
    </div>
  );

  return (
    <>
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 20px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.3);
          }
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgba(0,0,0,0.2) transparent;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-3px) rotate(0.2deg); }
          }
          
          .animate-float {
            animation: float 8s ease-in-out infinite;
          }
          
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
          }
          
          .transition-smooth {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .shadow-hero {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1);
          }
          
          .shadow-glow {
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.4), 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }
          
          .whatsapp-bg {
            background-color: #e5ddd5;
            background-image: 
              radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(0, 0, 0, 0.05) 0%, transparent 50%);
          }
        `}
      </style>
      
      <div className="relative mx-auto animate-float" style={{ width: '300px', height: '600px' }}>
        {/* iPhone Frame */}
        <div className="relative w-full h-full bg-black rounded-[3rem] p-2 shadow-hero transition-smooth hover:shadow-glow">
          {/* Screen */}
          <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative flex flex-col">
            
            {/* Status Bar */}
            <div className="flex justify-between items-center px-6 py-3 bg-gray-50">
              <div className="flex items-center gap-1">
                <Signal className="w-4 h-4 animate-pulse" />
                <Wifi className="w-4 h-4" />
              </div>
              <div className="font-semibold text-sm">
                {currentTime}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold">100%</span>
                <Battery className="w-4 h-4 text-green-600" />
              </div>
            </div>

            {/* WhatsApp Header */}
            <div className="bg-[#075E54] px-4 py-3 flex items-center justify-between text-white shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-sm">
                  pAI
                </div>
                <div>
                  <div className="font-medium text-base">promptAI</div>
                  <div className="text-xs text-green-200 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                    online
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 text-white cursor-pointer hover:scale-110 transition-transform">📞</div>
                <div className="w-6 h-6 text-white cursor-pointer hover:scale-110 transition-transform">📹</div>
                <div className="w-6 h-6 text-white cursor-pointer hover:scale-110 transition-transform">⋮</div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto custom-scrollbar whatsapp-bg" style={{ height: 'calc(100% - 120px)' }}>
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-2xl transition-smooth hover:scale-105 ${
                      message.isBot
                        ? 'bg-white text-gray-800 rounded-bl-md shadow-sm hover:shadow-md border border-gray-100'
                        : 'bg-[#dcf8c6] text-gray-800 rounded-br-md shadow-sm border border-green-100'
                    }`}
                  >
                    <div className="text-sm leading-relaxed">
                      {message.text}
                    </div>
                    <div
                      className={`text-xs mt-1 flex items-center gap-1 ${
                        message.isBot ? 'text-gray-500' : 'text-gray-600 justify-end'
                      }`}
                    >
                      {message.timestamp}
                      {!message.isBot && <span className="text-blue-500">✓✓</span>}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <TypingIndicator />
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="px-4 py-3 bg-[#f0f0f0] border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white rounded-full px-4 py-2 border border-gray-200 shadow-sm">
                  <span className="text-gray-500 text-sm">Digite uma mensagem</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#075E54] flex items-center justify-center cursor-pointer shadow-md hover:bg-[#064e46] transition-colors">
                  <div className="w-5 h-5 text-white">🎤</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Home Indicator */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full opacity-60"></div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute -top-6 -right-6 w-8 h-8 bg-green-500 rounded-full animate-bounce flex items-center justify-center shadow-glow">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
        
        <div className="absolute -bottom-6 -left-6 w-10 h-10 bg-blue-500/20 rounded-full animate-pulse" style={{animationDelay: '500ms'}}></div>
        
        <div className="absolute top-1/2 -right-8 w-6 h-6 bg-purple-500/30 rounded-full animate-ping" style={{animationDelay: '1000ms'}}></div>
      </div>
    </>
  );
};

export default PhoneAnimation;