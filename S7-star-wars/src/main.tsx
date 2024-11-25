import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Импортируем Provider
import store from './redux/store.tsx'; // Импортируем хранилище
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}> {/* Подключаем хранилище */}
      <App />
    </Provider>
  </StrictMode>,
);
