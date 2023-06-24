// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import NotistackProvider from './components/NotistackProvider';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
import Auth from './pages/auth/Auth';
import Profile from './pages/profile/Profile';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <NotistackProvider>
          <ProgressBarStyle />
          <ScrollToTop />
          <Router />
          <Auth />
          <Profile />
        </NotistackProvider>
      </ThemeProvider>
    </MotionLazyContainer>
  );
}
