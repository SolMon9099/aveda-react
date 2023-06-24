import { useEffect, useState } from 'react';
import { Box, Stack, LinearProgress, Typography } from '@mui/material'
import Image from "./Image";

type Props = {
    text?: boolean;
}

export default function AdevaLoading({text} : Props){
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
          setProgress((oldProgress) => {
            if (oldProgress >= 95) {
              return 95;
            }
            const diff = Math.random() * 3;
            return Math.min(oldProgress + diff, 100);
          });
        }, 500);
    
        return () => {
          clearInterval(timer);
        };
      }, []);

    return(
        <Box id="teeee" component="div" sx={{alignItems: 'center', display: 'flex', justifyContent: 'center', height: '100%'}}>
            <Stack spacing={4} alignItems='center'>
                <Image sx={{maxWidth: '180px', maxHeight: '64px'}} disabledEffect src={process.env.PUBLIC_URL + '/logo/logo_roxo.png'} alt='LOGO'/>
                <Stack spacing={2} alignItems='center'>
                    <LinearProgress variant="determinate" value={progress} sx={{height:'5px', width:'360px'}}/>
                    {text &&
                        <Typography variant='h6' color='InactiveCaptionText'>
                            Carregando dados...
                        </Typography>
                    }
                </Stack>
            </Stack>
        </Box>
    )
}