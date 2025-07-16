import React, { useEffect, useState } from 'react';
import { getCart, removeFromCart, updateCartItemQuantity, clearCart } from '../../utils/storage';
import type { CartItem } from '../../utils/storage';
import { mockCourses } from '../../mockData/courses';
import { formatPrice } from '../../utils/format';
import styles from './MyCart.module.scss';
import toast from 'react-hot-toast';

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

  return (
    <div className={styles.cart_container}>
      <h2 className={styles.cart_title}>Giỏ hàng của bạn</h2>
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
    </div>
  );
};

export default MyCartPage;
