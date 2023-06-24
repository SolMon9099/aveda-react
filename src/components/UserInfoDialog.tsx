import { Dialog, IconButton, Link, Stack, Typography, styled } from "@mui/material";
import Iconify from "./Iconify";
import Image from "./Image";

type Props = {
    open: boolean;
    onClose: (e: any) => void;
    name: string;
    email: string;
    photo?: string;
    description?: string;
}

const BoxStyled = styled('div')(({ theme }) => ({
    width: 144,
    height: 144,
    margin: 'auto',
    borderRadius: '50%',
    padding: 1,
    zIndex: 0,
    outline: 'none',
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px dashed ${theme.palette.grey[500_32]}`,
    '& > *': { width: '100%', height: '100%' },
    '&:hover': {
        '& .placeholder': {
            zIndex: 9,
        },
    },
}));

export default function UserInfoDialog({ open, onClose, name, photo, description, email }: Props){
    return(
        <Dialog fullWidth maxWidth='xs' open={open} onClose={onClose} onClick={(e) => e.stopPropagation()}>
            <Stack spacing={2} pb={2}>
                <Stack direction='row' alignItems='center' justifyContent='space-between' p={2} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                    <Typography variant='subtitle1' fontWeight='700'>
                        {name}
                    </Typography>
                    <IconButton onClick={(e) => onClose(e)}>
                        <Iconify width={18} height={18} icon='ph:x' />
                    </IconButton>
                </Stack>
                <Stack p={2} spacing={2}>
                    {photo &&
                        <BoxStyled>
                            <Image
                                alt="avatar"
                                src={photo}
                                sx={{ zIndex: 8 }}
                            />
                        </BoxStyled>
                    }
                    {description &&
                        <Stack spacing={1}>
                            <Typography variant="h6">
                                Descrição Pessoal
                            </Typography>
                            <Typography variant='subtitle2'>
                                {description}
                            </Typography> 
                        </Stack>
                    }
                    <Typography variant="h6">
                        Informações de contato
                    </Typography>
                    <Stack spacing={1}>
                        <Stack direction='row' spacing={1} alignItems='center'>
                            <Iconify width={24} height={24} icon='ic:outline-email'/>
                            <Typography variant='subtitle2' fontWeight='700'>
                                E-mail
                            </Typography>
                        </Stack>
                        <Typography component={Link} variant='subtitle2' sx={{ pl: 4 }} href={`mailto:${email}`} onClick={(e: any) => e.stopPropagation()}>
                            {email}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Dialog>
    )
}