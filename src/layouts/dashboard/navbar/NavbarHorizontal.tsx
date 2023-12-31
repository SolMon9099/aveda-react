import { memo } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container, AppBar } from '@mui/material';
// config
import { HEADER } from '../../../config';
// components
import { NavSectionHorizontal } from '../../../components/nav-section';
//
import { navConfigERP, navConfigForum } from './NavConfig';
import { useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar)(({ theme }) => ({
  transition: theme.transitions.create('top', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  width: '100%',
  position: 'fixed',
  zIndex: theme.zIndex.appBar,
  padding: theme.spacing(1, 0),
  boxShadow: theme.customShadows.z8,
  top: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

function NavbarHorizontal() {
  const { pathname } = useLocation()
  return (
    <RootStyle>
      <Container maxWidth={false}>
        <NavSectionHorizontal navConfig={pathname.includes('/erp/') ? navConfigERP : navConfigForum} />
      </Container>
    </RootStyle>
  );
}

export default memo(NavbarHorizontal);
