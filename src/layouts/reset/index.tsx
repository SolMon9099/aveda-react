import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// config
import { HEADER, NAVBAR } from '../../config';
//

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

export default function ResetLayout() {
  const { collapseClick } = useCollapseDrawer();

  const { themeLayout } = useSettings();

  const verticalLayout = themeLayout === 'vertical';

  if (verticalLayout) {
    return (
      <>
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
    <Box
      sx={{
        display: { lg: 'flex' },
        minHeight: { lg: 1 },
      }}
    >
      
      <MainStyle collapseClick={collapseClick}>
        <Outlet />
      </MainStyle>
    </Box>
  );
}
