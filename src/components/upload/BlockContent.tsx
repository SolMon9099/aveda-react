// @mui
import { Box, Typography, Stack } from '@mui/material';
// assets
import { UploadIllustration } from '../../assets';

// ----------------------------------------------------------------------

export default function BlockContent() {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction={{ xs: 'column', md: 'row' }}
      sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}
    >
      <UploadIllustration sx={{ width: 220 }} />

      <Box sx={{ p: 3 }}>
        <Typography gutterBottom variant="h5">
          Arraste ou selecione a imagem
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Arraste a imagem aqui ou clique&nbsp;
          <Typography
            variant="body2"
            component="span"
            sx={{ color: 'primary.main', textDecoration: 'underline' }}
          >
            e navegue
          </Typography>
          &nbsp;em sua máquina
        </Typography>
      </Box>
    </Stack>
  );
}
