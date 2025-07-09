import './App.css'
import { Button as AntdButton } from 'antd';
import 'antd/dist/reset.css';

function App() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">React + Ant Design + TailwindCSS</h1>
      <AntdButton type="primary" className="!bg-blue-500 !border-blue-500 !hover:bg-blue-700 !hover:border-blue-700 mb-4">
        Ant Design Button
      </AntdButton>
      <button className="px-6 py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-700 transition">
        Tailwind Button
      </button>
    </div>
  );
}

export default App
