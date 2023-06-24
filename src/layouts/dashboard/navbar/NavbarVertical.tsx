import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Drawer } from '@mui/material';
// hooks
import useCollapseDrawer from '../../../hooks/useCollapseDrawer';
// config
import { HEADER, NAVBAR } from '../../../config';
// components
import Scrollbar from '../../../components/Scrollbar';
import { NavSectionVertical } from '../../../components/nav-section';
//
import { navConfigERP, navConfigForum } from './NavConfig';
import useResponsive from 'src/hooks/useResponsive';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  isOpenSidebar: boolean;
  onCloseSidebar: VoidFunction;
};

export default function NavbarVertical({ isOpenSidebar, onCloseSidebar }: Props) {
  const { pathname } = useLocation();

  const { onHoverEnter, onHoverLeave } =
    useCollapseDrawer();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <NavSectionVertical navConfig={pathname.includes('/erp/') ? navConfigERP : navConfigForum} />

      <Box sx={{ flexGrow: 1 }} />

    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: NAVBAR.DASHBOARD_WIDTH,
        },
        height: `calc(100% - ${HEADER.DASHBOARD_DESKTOP_HEIGHT}px)`,
        top: HEADER.DASHBOARD_DESKTOP_HEIGHT,
      }}
    >
      {(!isDesktop || pathname.search('/forum/live/') === 0) && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{ sx: { width: NAVBAR.DASHBOARD_WIDTH } }}
        >
          {renderContent}
        </Drawer>
      )}

      {(isDesktop && pathname.search('/forum/live/') !== 0) &&
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              height: `calc(100% - ${HEADER.DASHBOARD_DESKTOP_HEIGHT}px)`,
              width: NAVBAR.DASHBOARD_WIDTH,
              top: HEADER.DASHBOARD_DESKTOP_HEIGHT,
              bgcolor: 'background.default',
            },
          }}
        >
          {renderContent}
        </Drawer>
      }
    </RootStyle>
  );
}
