import React, { useState, useRef, useEffect } from 'react';
import './MessagesPage.css';

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);

  const conversations = [
    {
      id: 1,
      user: 'سارة محمدي',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      lastMessage: 'شكراً جزيلاً! الفيلا رائعة 😍',
      time: '10:30',
      unread: 2,
      online: true,
      property: 'فيلا مستغانم',
    },
    {
      id: 2,
      user: 'كريم بوعلام',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karim',
      lastMessage: 'هل المكان متاح في يناير؟',
      time: 'أمس',
      unread: 0,
      online: false,
      property: 'شقة الجزائر',
    },
    {
      id: 3,
      user: 'أمينة دريسي',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amina',
      lastMessage: 'سأصل الساعة 3 عصراً',
      time: 'السبت',
      unread: 1,
      online: true,
      property: 'شاليه تيزي وزو',
    },
  ];

  const [chatMessages, setChatMessages] = useState({
    1: [
      {
        id: 1, sender: 'other', text: 'السلام عليكم! هل الفيلا متاحة؟',
        time: '09:00', read: true,
      },
      {
        id: 2, sender: 'me', text: 'وعليكم السلام! نعم متاحة. ما هي التواريخ؟',
        time: '09:05', read: true,
      },
      {
        id: 3, sender: 'other', text: 'من 25 ديسمبر لـ 1 يناير، 4 أشخاص',
        time: '09:10', read: true,
      },
      {
        id: 4, sender: 'me', text: 'ممتاز! السعر 15,000 دج/ليلة. المجموع 105,000 دج',
        time: '09:15', read: true,
      },
      {
        id: 5, sender: 'other', text: 'شكراً جزيلاً! الفيلا رائعة 😍',
        time: '10:30', read: false,
      },
    ],
    2: [
      {
        id: 1, sender: 'other', text: 'هل المكان متاح في يناير؟',
        time: 'أمس 14:00', read: true,
      },
    ],
    3: [
      {
        id: 1, sender: 'other', text: 'سأصل الساعة 3 عصراً',
        time: 'السبت', read: false,
      },
    ],
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [selectedChat, chatMessages]);

  const sendMessage = () => {
    if (!message.trim() || !selectedChat) return;

    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: message,
      time: new Date().toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };

    setChatMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMsg],
    }));
    setMessage('');
  };

  const currentMessages = selectedChat
    ? chatMessages[selectedChat.id] || []
    : [];

  return (
    <div className="messages-page" dir="rtl">
      {/* Conversations List */}
      <div className="conversations-panel">
        <div className="conv-header">
          <h2>الرسائل 💬</h2>
          <button className="new-msg-btn">✏️</button>
        </div>

        <div className="conv-search">
          <span>🔍</span>
          <input type="text" placeholder="البحث في المحادثات..." />
        </div>

        <div className="conversations-list">
          {conversations.map(conv => (
            <div
              key={conv.id}
              className={`conversation-item ${selectedChat?.id === conv.id ? 'active' : ''}`}
              onClick={() => setSelectedChat(conv)}
            >
              <div className="conv-avatar">
                <img src={conv.avatar} alt={conv.user} />
                {conv.online && <div className="online-indicator" />}
              </div>
              <div className="conv-info">
                <div className="conv-top">
                  <strong>{conv.user}</strong>
                  <span className="conv-time">{conv.time}</span>
                </div>
                <div className="conv-bottom">
                  <p>{conv.lastMessage}</p>
                  {conv.unread > 0 && (
                    <span className="unread-badge">{conv.unread}</span>
                  )}
                </div>
                <span className="conv-property">🏠 {conv.property}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedChat ? (
        <div className="chat-area">
          {/* Chat Header */}
          <div className="chat-header">
            <div className="chat-user">
              <div className="chat-avatar">
                <img src={selectedChat.avatar} alt={selectedChat.user} />
                {selectedChat.online && <div className="online-indicator" />}
              </div>
              <div>
                <strong>{selectedChat.user}</strong>
                <p>
                  {selectedChat.online
                    ? '🟢 متصل الآن'
                    : '⚫ آخر ظهور منذ ساعة'}
                </p>
              </div>
            </div>
            <div className="chat-actions">
              <button className="chat-action-btn">📞</button>
              <button className="chat-action-btn">📹</button>
              <button className="chat-action-btn">ℹ️</button>
            </div>
          </div>

          {/* Messages */}
          <div className="messages-area">
            <div className="messages-date">اليوم</div>

            {currentMessages.map(msg => (
              <div
                key={msg.id}
                className={`message ${msg.sender === 'me' ? 'my-msg' : 'other-msg'}`}
              >
                {msg.sender === 'other' && (
                  <img
                    src={selectedChat.avatar}
                    alt=""
                    className="msg-avatar-img"
                  />
                )}
                <div className="msg-content">
                  <div className="msg-text">{msg.text}</div>
                  <div className="msg-meta">
                    <span className="msg-time">{msg.time}</span>
                    {msg.sender === 'me' && (
                      <span className="read-receipt">
                        {msg.read ? '✓✓' : '✓'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            <div className="typing-indicator">
              <img src={selectedChat.avatar} alt="" className="msg-avatar-img" />
              <div className="typing-bubble">
                <div className="typing-dots">
                  <span /><span /><span />
                </div>
              </div>
            </div>

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="message-input-area">
            <button className="attachment-btn">📎</button>
            <button className="emoji-btn">😊</button>
            <input
              type="text"
              placeholder="اكتب رسالتك..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              className={`voice-record-btn ${isRecording ? 'recording' : ''}`}
              onMouseDown={() => setIsRecording(true)}
              onMouseUp={() => setIsRecording(false)}
            >
              🎤
            </button>
            <button
              className="send-msg-btn"
              onClick={sendMessage}
            >
              ←
            </button>
          </div>
        </div>
      ) : (
        <div className="no-chat-selected">
          <div className="no-chat-content">
            <span>💬</span>
            <h3>اختر محادثة</h3>
            <p>اختر محادثة من القائمة للبدء</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
