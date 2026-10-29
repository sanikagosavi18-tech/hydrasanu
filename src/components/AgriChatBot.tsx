import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  RefreshCw,
  Sprout,
  HelpCircle,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { Language } from '../types';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface AgriChatBotProps {
  language?: Language;
  currentCrop?: string;
}

export const AgriChatBot: React.FC<AgriChatBotProps> = ({
  language = 'en',
  currentCrop = 'All Crops'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initial welcome message per language
  const initialMessages: Record<Language, string> = {
    en: 'Namaste! I am HydraMind AgriBot, your smart AI farming assistant. Ask me anything about crop diseases, 16L knapsack sprayer dosages, fertilizer planning, or weather impacts.',
    hi: 'नमस्ते! मैं हाइड्रामाइंड एग्रीबॉट हूँ, आपका एआई कृषि सहायक। फसलों के रोगों, 16 लीटर स्प्रेयर दवा माप, खाद व मौसम के बारे में कुछ भी पूछें।',
    mr: 'नमस्कार! मी हायड्रामाइंड ॲग्रीबॉट आहे, आपला स्मार्ट शेती सहाय्यक. पिकांवरील रोग, १६ लिटर पंपाचे औषध प्रमाण, खत नियोजन किंवा हवामानाबद्दल विचारा.'
  };

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-1',
      role: 'model',
      text: initialMessages[language] || initialMessages.en,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Quick suggestion prompts
  const suggestions: Record<Language, string[]> = {
    en: [
      'Early Blight dose for 16L sprayer?',
      'Best organic pesticide for aphids?',
      'Optimal NPK schedule for tomato?',
      'Can I spray pesticide before rain?'
    ],
    hi: [
      '16L स्प्रे पंप में मैनकोजेब का सही माप?',
      'टमाटर में ब्लाइट रोग का जैविक उपचार?',
      'बारिश के मौसम में छिड़काव के नियम?',
      'फसलों के लिए यूरिया व डीएपी का अनुपात?'
    ],
    mr: [
      '१६ लिटर पंपासाठी बुरशीनाशकाचे प्रमाण?',
      'टोमॅटोवरील करपा रोगावर सेंद्रिय उपाय?',
      'पावसाळ्यात औषध फवारणी कशी करावी?',
      'पिकांना विद्राव्य खते देण्याचे नियोजन?'
    ]
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Prepare conversation history (exclude welcome greeting)
      const history = messages
        .filter((m) => m.id !== 'welcome-1')
        .map((m) => ({
          role: m.role,
          text: m.text
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history,
          language
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to get AI response');
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: data.reply || 'I am ready to help you further.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text:
          language === 'hi'
            ? 'क्षमा करें, प्रतिक्रिया प्राप्त करने में समस्या आई। कृपया पुनः प्रयास करें।'
            : 'Sorry, I encountered an issue. Please try again or rephrase your question.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        text: initialMessages[language] || initialMessages.en,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating Chat Trigger Launcher Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-[#0c5a3e] to-[#10b981] hover:from-[#094731] hover:to-[#059669] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl shadow-emerald-950/30 flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 cursor-pointer group border-2 border-emerald-300/40"
          aria-label="Open AI AgriBot Chat"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full ring-2 ring-[#0c5a3e] animate-ping" />
          </div>
          <span className="hidden sm:inline font-bold text-xs tracking-wide">
            HydraMind AgriBot
          </span>
          <span className="hidden md:inline px-1.5 py-0.5 rounded text-[9px] font-black bg-white/20 text-emerald-100 uppercase">
            AI
          </span>
        </button>
      )}

      {/* Chat Interface Drawer / Modal */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 flex flex-col bg-white shadow-2xl rounded-2xl border border-emerald-200 overflow-hidden ${
            isExpanded
              ? 'bottom-4 right-4 left-4 top-4 sm:left-auto sm:top-auto sm:w-[580px] sm:h-[720px]'
              : 'bottom-4 right-4 w-[92vw] sm:w-[410px] h-[560px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0c5a3e] to-[#0f766e] text-white p-3.5 sm:px-4 flex items-center justify-between shrink-0 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center border border-white/20">
                <Sprout className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm leading-tight">HydraMind AgriBot</h3>
                  <span className="text-[10px] bg-emerald-400/20 text-emerald-200 px-1.5 py-0.2 rounded font-semibold border border-emerald-400/30">
                    Gemini AI
                  </span>
                </div>
                <p className="text-[10px] text-emerald-100/90 font-medium">
                  {language === 'hi'
                    ? '24/7 फसल व स्प्रे परामर्श'
                    : '24/7 Crop Health & Spray Advisor'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-white/80">
              <button
                type="button"
                onClick={handleResetChat}
                title="Restart conversation"
                className="p-1.5 hover:bg-white/15 rounded-lg transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Minimize' : 'Expand'}
                className="p-1.5 hover:bg-white/15 rounded-lg transition-colors cursor-pointer hidden sm:block"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 hover:bg-white/15 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Scrollable Thread */}
          <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 bg-[#f8faf8]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#0c5a3e] flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-3 text-xs sm:text-[13px] leading-relaxed shadow-2xs ${
                    msg.role === 'user'
                      ? 'bg-[#0c5a3e] text-white rounded-tr-xs'
                      : 'bg-white text-slate-800 rounded-tl-xs border border-slate-200/90'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      msg.role === 'user' ? 'text-emerald-200/80' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-emerald-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#0c5a3e] flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 animate-bounce" />
                </div>
                <div className="bg-white border border-emerald-100 p-3 rounded-2xl rounded-tl-xs text-xs text-slate-500 flex items-center gap-2 shadow-2xs">
                  <div className="w-3.5 h-3.5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                  <span>AgriBot is analyzing crop telemetry...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {(suggestions[language] || suggestions.en).map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(chip)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-[#0c5a3e] text-[11px] font-medium border border-emerald-200 transition-colors cursor-pointer shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'अपनी फसल या स्प्रे का सवाल पूछें...'
                  : 'Ask about crops, symptoms, sprayer dosage...'
              }
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-[#0c5a3e] focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-2.5 bg-[#0c5a3e] hover:bg-[#094731] active:bg-[#073625] text-white rounded-xl disabled:opacity-50 transition-all cursor-pointer shadow-xs"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
