import React, { useState, useRef, useEffect } from 'react';
import './AIAssistant.css';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: 'مرحباً! أنا مساعدك الذكي في DarDzair 🤖\nكيف يمكنني مساعدتك اليوم؟',
      time: new Date().toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const aiResponses = {
    'مستغانم': '🏖️ مستغانم رائعة! لديها شواطئ خلابة. أنصحك بزيارتها في الصيف. أريد أن أريك أفضل العقارات هناك! 🏠',
    'سعر': '💰 الأسعار في الجزائر تتراوح بين 3,000 و 25,000 دج في الليلة حسب الموقع والنوع.',
    'حجز': '📅 الحجز سهل جداً! اختر العقار، حدد التواريخ، واختر طريقة الدفع. هل تريد المساعدة؟',
    'دفع': '💳 نقبل: BaridiMob، CCP، والدفع عند الوصول. جميع المعاملات آمنة 100% 🔒',
    'default': '🤔 سؤال جيد! يمكنني مساعدتك في البحث عن عقارات، الحجز، الأسعار، أو أي شيء آخر عن DarDzair.'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      type: 'user',
      text,
      time: new Date().toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 1200));

    const responseKey = Object.keys(aiResponses).find(key =>
      text.includes(key)
    ) || 'default';

    const aiMsg = {
      id: Date.now() + 1,
      type: 'ai',
      text: aiResponses[responseKey],
      time: new Date().toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' }),
    };

    setIsTyping(false);
    setMessages(prev => [...prev, aiMsg]);
  };

  const quickReplies = [
    '🏖️ عقارات ساحلية',
    '💰 أرخص الأسعار',
    '🌟 أفضل التقييمات',
    '📅 متاح هذا الأسبوع',
  ];

  return (
    <>
      {/* AI Button */}
      <button
        className={`ai-button animate-glowPulse ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="ai-icon">{isOpen ? '✕' : '🤖'}</span>
        {!isOpen && <span className="ai-badge">ذكاء اصطناعي</span>}
      </button>

      {/* AI Chat Panel */}
      {isOpen && (
        <div className="ai-panel glass-card animate-slideInBottom">
          {/* Header */}
          <div className="ai-header">
            <div className="ai-avatar">
              <span>🤖</span>
              <div className="ai-status-dot" />
            </div>
            <div>
              <strong>مساعد DarDzair</strong>
              <p>متصل الآن · يرد فوراً</p>
            </div>
            <button className="ai-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          {/* Messages */}
          <div className="ai-messages">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`ai-message ${msg.type === 'ai' ? 'ai-msg' : 'user-msg'}`}
              >
                {msg.type === 'ai' && (
                  <div className="msg-avatar">🤖</div>
                )}
                <div className="msg-bubble">
                  <p>{msg.text}</p>
                  <span className="msg-time">{msg.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="ai-message ai-msg">
                <div className="msg-avatar">🤖</div>
                <div className="msg-bubble typing">
                  <div className="typing-dots">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="quick-replies">
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                className="quick-reply-btn"
                onClick={() => sendMessage(reply)}
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="ai-input">
            <input
              type="text"
              placeholder="اكتب رسالتك..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
            />
            <button
              className="ai-send-btn"
              onClick={() => sendMessage(input)}
            >
              ←
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
