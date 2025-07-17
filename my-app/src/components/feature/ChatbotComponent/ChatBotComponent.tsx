import React, { useState, useRef, useEffect } from 'react';
import { mockCourses } from '../../../mockData/courses';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faPaperPlane, faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styles from './Chatbot.module.scss';
import type { CourseDetail } from '../../feature/ModalDetailCourse/ModalDetailCourse';
import ModalDetailCourse from '../../feature/ModalDetailCourse/ModalDetailCourse';

function getSuggestionsFromMessage(message: string) {
  const stopWords = [
    'có', 'không', 'nào', 'của', 'khóa', 'học', 'gì', 'trong', 'đây', 'trang', 'bạn', 'là', 'về', 'cho', 'tôi', 'xin', 'vui', 'lòng'
  ];
  const keywords = message
    .toLowerCase()
    .replace(/[.,?!]/g, '')
    .split(' ')
    .filter(word => word && !stopWords.includes(word));

  if (keywords.length === 0) {
    // Nếu không có từ khóa cụ thể, trả về tất cả khóa học
    return mockCourses;
  }

  const suggestions = mockCourses.filter(course => {
    const haystack = (
      course.title + ' ' +
      (course.shortDesc || '') + ' ' +
      (course.fullDesc || '') + ' ' +
      (course.tags ? course.tags.join(' ') : '')
    ).toLowerCase();
    return keywords.some(keyword => haystack.includes(keyword));
  });

  return suggestions;
}

type ChatMessage = {
  from: 'user' | 'bot';
  text: string;
  suggestions?: typeof mockCourses;
};

const ChatBotComponent: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([{
    from: 'bot',
    text: 'Xin chào! Mình là Trợ lý AI. Bạn muốn tìm khóa học gì? Hãy nhập từ khóa hoặc mô tả nhu cầu của bạn.'
  }]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // State cho modal chi tiết khóa học
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseDetail | null>(null);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { from: 'user', text: input };
    setMessages(msgs => [...msgs, userMsg]);
    setTimeout(() => {
      const suggestions = getSuggestionsFromMessage(input);
      if (suggestions.length > 0) {
        setMessages(msgs => [
          ...msgs,
          {
            from: 'bot',
            text:
              suggestions.length === mockCourses.length && input.trim().length > 0 &&
              getSuggestionsFromMessage(input).length === mockCourses.length
                ? `Hiện tại chúng tôi có ${mockCourses.length} khóa học. Bạn muốn tìm về chủ đề nào?`
                : `Tôi gợi ý cho bạn ${suggestions.length} khóa học phù hợp:`,
            suggestions
          } as ChatMessage
        ]);
      } else {
        setMessages(msgs => [
          ...msgs,
          {
            from: 'bot',
            text: 'Xin lỗi, tôi chưa tìm thấy khóa học phù hợp. Bạn hãy thử từ khóa khác nhé!'
          } as ChatMessage
        ]);
      }
    }, 700);
    setInput('');
  };

  // Giao diện
  return (
    <>
      {/* Icon robot nổi */}
      {!open && (
        <button
          className={styles.chatbot_fab}
          onClick={() => setOpen(true)}
          title="Trợ lý AI"
        >
          <FontAwesomeIcon icon={faRobot} size='2x' />
        </button>
      )}
      {/* Panel chat  */}
      {open && (
        <div className={styles.tiki_panel_wrapper}>
          <div className={styles.tiki_panel}>
            <div className={styles.tiki_header}>
              <div className={styles.tiki_avatar}>
                <FontAwesomeIcon icon={faRobot} size='2x' />
              </div>
              <div className={styles.tiki_title}>Trợ lý AI</div>
              <button className={styles.tiki_minimize} onClick={() => setMinimized(!minimized)}>
                <FontAwesomeIcon icon={faChevronDown} />
              </button>
              <button className={styles.tiki_close} onClick={() => setOpen(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            {!minimized && (
              <>
                <div className={styles.tiki_body}>
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={msg.from === 'user' ? styles.tiki_msg_user : styles.tiki_msg_bot}
                    >
                      <div>{msg.text}</div>
                      {msg.suggestions && (
                        <div className={styles.tiki_suggestions}>
                          {msg.suggestions.map(course => (
                            <div
                              key={course.id}
                              className={styles.tiki_course_card}
                              onClick={() => {
                                setSelectedCourse(course);
                                setModalVisible(true);
                              }}
                              style={{ cursor: 'pointer' }}
                            >
                              <img src={course.image} alt={course.title} />
                              <div className={styles.tiki_course_info}>
                                <div className={styles.tiki_course_title}>{course.title}</div>
                                <div className={styles.tiki_course_price}>{course.price.toLocaleString('vi-VN')} VNĐ</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                <div className={styles.tiki_footer}>
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Nhập nội dung chat"
                    className={styles.tiki_input}
                  />
                  <button className={styles.tiki_send} onClick={handleSend}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {/* Modal chi tiết khóa học đặt sau cùng để luôn nổi trên chatbot */}
      <ModalDetailCourse
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        courseData={selectedCourse || undefined}
        loading={false}
        // Nếu ModalDetailCourse hỗ trợ style hoặc zIndex, có thể thêm:
        // style={{ zIndex: 2000 }}
      />
    </>
  );
};

export default ChatBotComponent;
