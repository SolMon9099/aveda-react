import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// config
import { HEADER, NAVBAR } from '../../config';
//
import DashboardHeader from './header';
import NavbarVertical from './navbar/NavbarVertical';
import useResponsive from 'src/hooks/useResponsive';

// ----------------------------------------------------------------------

type MainStyleProps = {
  collapseClick: boolean;
};

const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})<MainStyleProps>(({ theme }) => ({
  flexGrow: 1,
  paddingTop: HEADER.MOBILE_HEIGHT + 24,
  paddingBottom: HEADER.MOBILE_HEIGHT + 24,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    paddingBottom: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
    transition: theme.transitions.create('margin-left', {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

// ----------------------------------------------------------------------

export default function LiveLayout() {
  const { pathname } = useLocation()
  const { collapseClick, isCollapse } = useCollapseDrawer();

  const { themeLayout } = useSettings();

  const [open, setOpen] = useState(false);

  const verticalLayout = themeLayout === 'vertical';

  const isDesktop = useResponsive('up', 'lg')

  if (verticalLayout) {
    return (
      <>
        <DashboardHeader isCollapse={isCollapse} onOpenSidebar={() => setOpen(true)} verticalLayout={verticalLayout} />

        {!pathname.includes('novo-post') &&
          <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        }

        <Box
          component="main"
          sx={{
            px: { lg: 2 },
            pt: {
              xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
              lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 80}px`,
            },
            pb: {
              xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
              lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 24}px`,
            },
          }}
        >
          <Outlet />
        </Box>
      </>
    );
  }

  return (
    <Box>
      <DashboardHeader isCollapse={isCollapse} onOpenSidebar={() => setOpen(true)}/>

      {!(pathname.includes('novo-post') && isDesktop) &&
        <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      }

      <MainStyle collapseClick={collapseClick}>
        <Outlet />
      </MainStyle>
    </Box>
  );
}
