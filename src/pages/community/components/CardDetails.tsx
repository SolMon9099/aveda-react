import { Card, Box, Typography, Stack, Divider } from "@mui/material";
import Iconify from "src/components/Iconify";
import UserAvatar from "src/components/UserAvatar";
import { useSelector } from "src/redux/store";
import { fShortenNumber } from '../../../utils/formatNumber'

export default function CardDetails(){
    const { selectedCommunity } = useSelector((state) => state.community)
    
    return(
        <Card sx={{ borderRadius: 1 }}>
            <Box sx={{ height: 8,bgcolor: (theme) => theme.palette.secondary.main, top: 0 }}/>
            <Stack spacing={3} sx={{pt: 2, pl: 3, pr:3, pb: 3}}>
                <Typography variant="h6">
                    Sobre a Comunidade
                </Typography>
                <Stack spacing={3}>
                    <Stack spacing={3}>
                        <Typography variant='body2'>
                            {selectedCommunity?.description}
                        </Typography>
                        {selectedCommunity?.isPrivate ?
                        <Stack>
                            <Stack spacing={1} alignContent={'center'} direction={'row'}>
                                <Iconify color="text.secondary" icon="ri-lock-line" width={18} height={21}/>
                                <Typography variant='subtitle1'>
                                    Privado
                                </Typography>
                            </Stack >
                            <Typography color='text.secondary' variant='body2'>
                                Somente membros podem ver quem está no grupo e o que é publicado nele.
                            </Typography>
                        </Stack>
                        :
                        <Stack>
                            <Stack spacing={1} alignContent={'center'} direction={'row'}>
                                <Iconify color="text.secondary" icon="ri-earth-line" width={18} height={21}/>
                                <Typography variant='subtitle1'>
                                    Público
                                </Typography>
                            </Stack>
                            <Typography color='text.secondary' variant='body2'>
                                Qualquer pessoa pode ver quem está no grupo e o que é publicado nele.
                            </Typography>
                        </Stack>
                        }
                        <Stack direction='row' spacing={1}>
                            <Iconify width={21} height={21} icon='tabler:users'/>
                            <Typography variant="subtitle1" fontWeight='500'>
                                {fShortenNumber((selectedCommunity?.memberCount + selectedCommunity?.admins.length) || 1)} {(selectedCommunity?.memberCount + selectedCommunity?.admins.length) === 1 ? 'membro' : 'membros'}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Divider/>

                    <Typography variant='caption' color='text.secondary'>
                        Administradores
                    </Typography>
                    {selectedCommunity?.admins.map((adm) =>
                        <UserAvatar email={adm.email} key={'CARD_DETAILS_'+adm._id} fontWeightName='small' name={adm.name} photo={adm.photo} description={adm.description}/>
                    )}
                    
                </Stack>
            </Stack>
        </Card>
    )
}


