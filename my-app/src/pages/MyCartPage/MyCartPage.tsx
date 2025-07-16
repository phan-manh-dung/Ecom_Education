import React, { useEffect, useState } from 'react';
import { getCart, removeFromCart, updateCartItemQuantity, clearCart } from '../../utils/storage';
import type { CartItem } from '../../utils/storage';
import { mockCourses } from '../../mockData/courses';
import { formatPrice } from '../../utils/format';
import styles from './MyCart.module.scss';
import toast from 'react-hot-toast';
import CourseComponent from '../../components/feature/CourseComponent/CourseComponent';
import type { CourseDetail } from '../../components/feature/ModalDetailCourse/ModalDetailCourse';

// Custom confirm toast
function toastConfirm(message: string): Promise<boolean> {
  return new Promise((resolve) => {
    toast(
      (t) => (
        <div style={{ minWidth: 220 }}>
          <div style={{ marginBottom: 12 }}>{message}</div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button
              style={{ background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }}
              onClick={() => {
                toast.dismiss(t.id);
                resolve(true);
              }}
            >
              Xác nhận
            </button>
            <button
              style={{ background: '#e6e6e6', color: '#333', border: 'none', borderRadius: 6, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }}
              onClick={() => {
                toast.dismiss(t.id);
                resolve(false);
              }}
            >
              Hủy
            </button>
          </div>
        </div>
      ),
      { duration: 999999 }
    );
  });
}

const MyCartPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [suggestModal, setSuggestModal] = useState(false);
  const [suggestedCourses, setSuggestedCourses] = useState<CourseDetail[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemove = async (id: string) => {
    const ok = await toastConfirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?');
    if (ok) {
      removeFromCart(id);
      setCart(getCart());
      toast.success('Đã xóa sản phẩm khỏi giỏ hàng!');
    }
  };

  const handleChangeQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    updateCartItemQuantity(id, quantity);
    setCart(getCart());
  };

  const handleClearCart = async () => {
    const ok = await toastConfirm('Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?');
    if (ok) {
      clearCart();
      setCart([]);
      toast.success('Đã xóa toàn bộ giỏ hàng!');
    }
  };

  const getCourseInfo = (id: string) => mockCourses.find(c => c.id === id);

  const total = cart.reduce((sum, item) => {
    const course = getCourseInfo(item.id);
    return sum + (course ? course.price * item.quantity : 0);
  }, 0);

  // Gợi ý theo tag trong giỏ hàng
  const handleSuggest = () => {
    // Lấy tất cả tag của các sản phẩm trong giỏ
    const cartIds = cart.map(item => item.id);
    const cartTags = cart
      .map(item => getCourseInfo(item.id)?.tags || [])
      .flat();
    // Lọc ra các khóa học có ít nhất 1 tag trùng, không trùng id với giỏ
    const suggestions = mockCourses.filter(course =>
      course.tags &&
      course.tags.some((tag: string) => cartTags.includes(tag)) &&
      !cartIds.includes(course.id)
    );
    setSuggestedCourses(suggestions);
    setSuggestModal(true);
  };

  return (
    <div className={styles.cart_container}>
      <h2 className={styles.cart_title}>Giỏ hàng của bạn</h2>
      <div style={{textAlign:'right', marginBottom: 16}}>
        <button className={styles.btn_sug} onClick={handleSuggest}>
          Gợi ý theo giỏ hàng
        </button>
      </div>
      {cart.length === 0 ? (
        <p style={{textAlign:'center',color:'#fff'}}>Bạn chưa có khóa học nào!</p>
      ) : (
        <>
          <table className={styles.cart_table}>
            <thead>
              <tr>
                <th>Khóa học</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => {
                const course = getCourseInfo(item.id);
                if (!course) return null;
                return (
                  <tr key={item.id}>
                    <td style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <img src={course.image} alt={course.title} className={styles.cart_course_img} />
                      <span className={styles.cart_course_title}>{course.title}</span>
                    </td>
                    <td>{formatPrice(course.price)}</td>
                    <td >
                      <div className={styles.cart_quantity_box}>
                        <button className={styles.cart_quantity_btn} onClick={() => handleChangeQuantity(item.id, item.quantity - 1)}>-</button>
                        <span className={styles.cart_quantity_value}>{item.quantity}</span>
                        <button className={styles.cart_quantity_btn} onClick={() => handleChangeQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                    </td>
                    <td>{formatPrice(course.price * item.quantity)}</td>
                    <td style={{textAlign: 'center'}}>
                      <button className={styles.cart_remove_btn} onClick={() => handleRemove(item.id)}>Xóa</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={styles.cart_total}>
            Tổng cộng: {formatPrice(total)}
          </div>
          <div style={{ textAlign: 'right' }}>
            <button className={styles.cart_clear_btn} onClick={handleClearCart}>
              Xóa toàn bộ giỏ hàng
            </button>
          </div>
        </>
      )}
      {/* Modal gợi ý */}
      {suggestModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.35)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, minWidth: 400, maxWidth: 700, maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 18 }}>Gợi ý cho bạn</h3>
            {suggestedCourses.length === 0 ? (
              <div style={{ color: '#888', textAlign: 'center', padding: 24 }}>Không tìm thấy khóa học phù hợp.</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                {suggestedCourses.map(course => (
                  <CourseComponent
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    price={course.price}
                    auth={course.auth}
                    image={course.image}
                    time={course.time}
                  />
                ))}
              </div>
            )}
            <div style={{ textAlign: 'right', marginTop: 24 }}>
              <button className={styles.cart_clear_btn} style={{ background: '#888' }} onClick={() => setSuggestModal(false)}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCartPage;
