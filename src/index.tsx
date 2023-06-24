// scroll bar
import 'simplebar/src/simplebar.css';

// lightbox
import 'react-image-lightbox/style.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// highlight
import './utils/highlight';

// editor
import 'react-quill/dist/quill.snow.css';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// contexts
import { SettingsProvider } from './contexts/SettingsContext';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';
import { AuthProvider } from './contexts/JWTContext';
import { store, persistor } from './redux/store';
//
import 'dayjs/locale/pt-br'
import App from './App';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HelmetProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LocalizationProvider adapterLocale={'pt-br'} dateAdapter={AdapterDayjs}>
            <AuthProvider>
              <SettingsProvider>
                <CollapseDrawerProvider>
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>
                </CollapseDrawerProvider>
              </SettingsProvider>
            </AuthProvider>
          </LocalizationProvider>
        </PersistGate>
      </ReduxProvider>
    </HelmetProvider>
);
