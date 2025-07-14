import './App.css'
import './api/mock'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import Layout from './components/Layout/Layout';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <div className="App">
          <Routes>
            {routes.map((route) => {
              const PageComponent = route.page;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout
                      showHeader={route.isShowHeader}
                      showFooter={route.isShowFooter}
                    >
                      <PageComponent />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App
