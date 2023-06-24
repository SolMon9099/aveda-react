import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';

// ----------------------------------------------------------------------



const RootStyle = styled('div')(({ theme }) => ({
  borderBottom: '1px solid #DEDFFF',
  paddingBottom: theme.spacing(2),
  paddingTop: theme.spacing(2),
  paddingLeft: theme.spacing(8),
  paddingRight: theme.spacing(8),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}));

const TitleHeaderStyle = styled('div')(({theme}) => ({
  display: 'flex',
  gap: theme.spacing(4),
}));

const PaddingPage = styled(Box)(({theme}) => ({
  paddingBottom: theme.spacing(2),
  paddingTop: theme.spacing(2),
  paddingLeft: theme.spacing(8),
  paddingRight: theme.spacing(8)
}));



// ----------------------------------------------------------------------

export default function CenteredHeaderLayout() {
  // const { themeLayout } = useSettings();

  return <Box>
    <RootStyle>
      <img style={{width: '140px'}} src={process.env.PUBLIC_URL+"/logo/logo_roxo.png"}/>
      <TitleHeaderStyle>
        <Typography sx={{cursor: 'pointer'}}>Sobre nós</Typography>
        <Typography sx={{cursor: 'pointer'}}>Como funciona</Typography>
        <Typography sx={{cursor: 'pointer'}}>Suporte</Typography>
      </TitleHeaderStyle>
      <div></div>
    </RootStyle>
    <PaddingPage pt={4}>
        <Outlet />
    </PaddingPage>
  </Box>
}
