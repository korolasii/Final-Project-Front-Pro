import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './pages/Main';
import Profile from './pages/Profile';
import NotFoundPage from './pages/NotFoundPage'
import { Provider } from 'react-redux';
import store from './services/store';
import AdminPanel from './pages/AdminPanel';
import Shop from './pages/Shop';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      </Provider>
  );
}

export default App;
