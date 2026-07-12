import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const AI_CHAT_URL = '/api/chat';
const N8N_WEBHOOK_URL = 'https://igorgomessilva.app.n8n.cloud/webhook/1f83e8ac-d465-454a-8327-cef7f0149cb1/chat';

export type ChatMessage = { role: 'user' | 'bot'; text: string };

function getReplyFromN8nResponse(data: unknown): string {
  if (typeof data === 'string') return data;
  if (data && typeof data === 'object') {
    const o = data as Record<string, unknown>;
    const text = o.output ?? o.reply ?? o.message ?? o.text ?? o.response;
    if (typeof text === 'string') return text;
    if (o.data && typeof o.data === 'object') {
      const d = (o.data as Record<string, unknown>).output ?? (o.data as Record<string, unknown>).reply;
      if (typeof d === 'string') return d;
    }
  }
  return 'Desculpe, não consegui processar a resposta.';
}

async function fetchAiReply(message: string, history: ChatMessage[]): Promise<string> {
  const res = await fetch(AI_CHAT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });
  if (!res.ok) throw new Error(`AI chat respondeu ${res.status}`);
  const data = await res.json();
  if (typeof data?.reply !== 'string') throw new Error('Resposta da IA sem texto');
  return data.reply;
}

async function fetchN8nReply(message: string, history: ChatMessage[]): Promise<string> {
  const res = await fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });
  const data = await res.json().catch(() => ({}));
  return getReplyFromN8nResponse(data);
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        const target = e.target as HTMLElement;
        if (!target.closest('[data-chatbot-toggle]')) setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const history = messages;
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const reply = await fetchAiReply(trimmed, history);
      setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
    } catch (_) {
      try {
        const reply = await fetchN8nReply(trimmed, history);
        setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
      } catch (_) {
        setMessages((prev) => [
          ...prev,
          { role: 'bot', text: 'Não foi possível conectar no momento. Tente novamente ou fale conosco pelo WhatsApp.' },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          ref={panelRef}
          className="fixed bottom-24 right-6 z-[100] w-[320px] md:w-[360px] h-[420px] md:h-[480px] flex flex-col rounded-lg shadow-2xl border border-gray-200 bg-white overflow-hidden"
        >
          <div className="bg-montessori-green text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-sm">Chat</h3>
                <p className="text-white/80 text-xs">Escola Montessoriana</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Fechar chat"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-montessori-cream">
            {messages.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                Olá! Digite sua mensagem abaixo.
              </p>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    msg.role === 'user'
                      ? 'bg-montessori-green text-white'
                      : 'bg-white text-montessori-dark border border-montessori-green/10'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg px-3 py-2 text-sm bg-white border border-montessori-green/10 text-gray-500">
                  ...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-gray-200 bg-white shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-montessori-green focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={isLoading}
                className="p-2 rounded-md bg-montessori-green text-white hover:bg-blue-800 transition-colors disabled:opacity-50"
                aria-label="Enviar"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        data-chatbot-toggle
        onClick={() => setIsOpen((o) => !o)}
        className="chat-window-toggle fixed bottom-6 right-6 z-[99] w-14 h-14 rounded-full bg-montessori-green text-white shadow-lg hover:bg-blue-800 transition-all hover:scale-105 flex items-center justify-center"
        aria-label="Abrir chat"
      >
        <MessageCircle size={28} />
      </button>
    </>
  );
};
