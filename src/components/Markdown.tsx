import ReactMarkdown, { Options } from 'react-markdown';
// markdown plugins
import rehypeRaw from 'rehype-raw';
// @mui
import { styled, Theme, useTheme } from '@mui/material/styles';
import { Link, Typography, Divider } from '@mui/material';
//
import Image from './Image';
import useResponsive from 'src/hooks/useResponsive';

// ----------------------------------------------------------------------

const MarkdownStyle = styled('div')(({ theme, maxline, isDesktop }: {
  theme: Theme;
  maxline: number | undefined,
  isDesktop: boolean | undefined
}) => {
  const isLight = theme.palette.mode === 'light';

  return {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: isDesktop ? '-webkit-box' : undefined,
    WebkitLineClamp: maxline,
    WebkitBoxOrient: 'vertical',
    // WebkitLineClamp: maxline,
    // WebkitBoxOrient: 'vertical',
    // List
    '& ul, & ol': {
      ...theme.typography.body1,
      paddingLeft: theme.spacing(5),
      '& li': {
        lineHeight: 2,
      },
    },

    // Blockquote
    '& blockquote': {
      lineHeight: 1.5,
      fontSize: '1.5em',
      margin: '40px auto',
      position: 'relative',
      fontFamily: 'Georgia, serif',
      padding: theme.spacing(3, 3, 3, 8),
      borderRadius: Number(theme.shape.borderRadius) * 2,
      backgroundColor: theme.palette.background.neutral,
      color: `${theme.palette.text.secondary} !important`,
      [theme.breakpoints.up('md')]: {
        width: '80%',
      },
      '& p, & span': {
        marginBottom: '0 !important',
        fontSize: 'inherit !important',
        fontFamily: 'Georgia, serif !important',
        color: `${theme.palette.text.secondary} !important`,
      },
      '&:before': {
        left: 16,
        top: -8,
        display: 'block',
        fontSize: '3em',
        content: '"\\201C"',
        position: 'absolute',
        color: theme.palette.text.disabled,
      },
    },

    // Code Block
    '& pre, & pre > code': {
      fontSize: 16,
      overflowX: 'auto',
      whiteSpace: 'pre',
      padding: theme.spacing(2),
      color: theme.palette.common.white,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: isLight ? theme.palette.grey[900] : theme.palette.grey[500_16],
    },
    '& code': {
      fontSize: 14,
      borderRadius: 4,
      whiteSpace: 'pre',
      padding: theme.spacing(0.2, 0.5),
      color: theme.palette.warning[isLight ? 'darker' : 'lighter'],
      backgroundColor: theme.palette.warning[isLight ? 'lighter' : 'darker'],
      '&.hljs': { padding: 0, backgroundColor: 'transparent' },
    },
  };
});

// ----------------------------------------------------------------------

export default function Markdown({ maxline, ...other }: Options & { maxline?: number }) {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'lg');
  // var maxLineValue = maxline;
  // var showReadMoreButton = false;

  // precisa ser tratado o caso de pouco texto mas varias linhas

  // if (maxline && maxline >= 5 && other.children.length > 500 && isDesktop) {
  //   maxLineValue = 3;
  //   showReadMoreButton = true;
  // }

  return <>
    <MarkdownStyle maxline={maxline} theme={theme} isDesktop={isDesktop}>
      <ReactMarkdown rehypePlugins={[rehypeRaw]} components={components} {...other} />
    </MarkdownStyle>
    {/* {showReadMoreButton ? <Button variant='text' size='small'>Ler mais</Button> : <></>} */}
  </>
}

// ----------------------------------------------------------------------

const components = {
  h1: ({ ...props }) => <Typography variant="h1" {...props} />,
  h2: ({ ...props }) => <Typography variant="h2" {...props} />,
  h3: ({ ...props }) => <Typography variant="h3" {...props} />,
  h4: ({ ...props }) => <Typography variant="h4" {...props} />,
  h5: ({ ...props }) => <Typography variant="h5" {...props} />,
  h6: ({ ...props }) => <Typography variant="h6" {...props} />,
  hr: ({ ...props }) => <Divider sx={{ my: 3 }} {...props} />,
  img: ({ ...props }) => (
    <Image alt={props.alt} ratio="16/9" sx={{ borderRadius: 2, my: 5 }} {...props} />
  ),
  a: ({ ...props }) =>
    props.href.includes('http') ? (
      <Link target="_blank" rel="noopener" {...props} />
    ) : (
      <Link {...props} />
    ),
};
