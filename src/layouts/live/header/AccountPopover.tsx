import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';
// components
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import useAuth from 'src/hooks/useAuth';
import MyAvatar from 'src/components/MyAvatar';
import { Link } from 'react-router-dom';
import { useDispatch } from 'src/redux/store';
import { setIsOpen, setSelected } from 'src/redux/slices/auth';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Feed',
    linkTo: '/forum/feed',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const { user, isAuthenticated, logout } = useAuth()

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <MyAvatar />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        {isAuthenticated ?
          <>
            <Box sx={{ my: 1.5, px: 2.5 }}>
              <Typography variant="subtitle2" noWrap>
                {user?.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {user?.email}
              </Typography>
            </Box>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Stack sx={{ p: 1 }}>
              {MENU_OPTIONS.map((option) => (
                <MenuItem component={Link} to={option.linkTo} key={option.label} onClick={handleClose}>
                  {option.label}
                </MenuItem>
              ))}
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <MenuItem sx={{ m: 1 }} onClick={() => {setOpen(null); logout()}}>Logout</MenuItem>
          </>
          :
          <MenuItem sx={{ m: 1 }} onClick={() => {setOpen(null); dispatch(setSelected(1)); dispatch(setIsOpen(true))}}>Login</MenuItem>
        }
      </MenuPopover>
    </>
  );
}
