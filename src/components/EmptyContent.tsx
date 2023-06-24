// @mui
import { styled } from '@mui/material/styles';
import { Typography, Box, BoxProps } from '@mui/material';
//
import Image from './Image';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(8, 2),
}));

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  title: string;
  img?: string;
  description?: string;
  withImg?: boolean;
}

export default function EmptyContent({ title, description, img, withImg=true, ...other }: Props) {
  return (
    <RootStyle {...other}>
      {withImg &&
        <Image
          disabledEffect
          visibleByDefault
          alt="empty content"
          src={img || '/assets/illustrations/illustration_empty_content.svg'}
          sx={{ height: 240, mb: 3 }}
        />
      }

      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      )}
    </RootStyle>
  );
}
