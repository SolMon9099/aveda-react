import { Card, Box, Stack, Typography, Button, DialogContent, Dialog, IconButton } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { communityType } from 'src/@types/community'
import Iconify from 'src/components/Iconify'
import Image from 'src/components/Image'
import useAuth from 'src/hooks/useAuth'
import { setIsOpen } from 'src/redux/slices/auth'
import { useDispatch } from 'src/redux/store'
import { PATH_FORUM } from 'src/routes/paths'

type Props = {
    discoverHook: any,
    community: communityType,
}

export default function CommunityCard({discoverHook, community}: Props){
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false)
    
    return(
        <Card 
            sx={{ 
                borderRadius: 1, 
                '&:hover': { 
                             cursor: 'pointer',
                             boxShadow: 'none'
                           } 
            }}
            onClick={() => community.isMember && navigate(PATH_FORUM.comunidade+community._id)}
        >
                    {openModal && 
          <Dialog
                  fullWidth
                  maxWidth='sm'
                  open={openModal}
                  onClose={() => setOpenModal(false)}
              >
                <DialogContent>
                <Stack spacing={2}>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                        <Typography variant='h6'>
                            Solicitação recebida!
                        </Typography>
                        <IconButton
                            onClick={() => setOpenModal(false)}
                            >
                            <Iconify icon='ph:x'/>
                        </IconButton>
                          </Stack>
                        <Typography variant='body1'>
                        Seu pedido de participação no grupo foi realizada com sucesso. Por favor, Aguarde os moderadores analisarem sua solicitação.
                        </Typography>
                          <Stack   direction="row"
                          justifyContent="flex-end"
                          alignItems="center"
                          spacing={2}>
                            <Button variant="contained" sx={{color:"#FFFFFF"}} onClick={() =>{ 
                                window.location.reload()}}>Adicionar</Button>
                          </Stack>
                    </Stack>
                </DialogContent>
              </Dialog>
        }
            <Image src={community.banner} sx={{ maxHeight: 120, width: '100%' }}/>
            <Box sx={{ p:3 }}>
                <Stack spacing={5}>
                    <Stack>
                        <Typography variant='subtitle1' fontWeight='500'>
                            {community.name}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            {community.postCount === 1 ? `${community.postCount} Publicação` : `${community.postCount} Publicações`}
                        </Typography>
                        {community.isPrivate ?
                        <Stack alignContent="center" direction={'row'}>
                            <Iconify color="text.secondary" icon="ri-lock-line" width={18} height={18}/>
                            <Typography variant='body2' color='text.secondary'>
                                Privada
                            </Typography>
                        </Stack>
                        :
                        <Stack alignContent="center" direction={'row'}>
                            <Iconify color="text.secondary" icon="ri-earth-line" width={18} height={18}/>
                            <Typography variant='body2' color='text.secondary'>
                                Publica
                            </Typography>
                     </Stack>
                        }
                    </Stack>
                    {community.isMember ?
                        <Button color='inherit' variant='contained' fullWidth onClick={(e) => {e.stopPropagation(); discoverHook.handleLeave(community._id)}}>
                            Sair do Grupo
                        </Button>
                        :
                        community.isAwaitingApproval ?
                        <Button variant='contained' fullWidth disabled>
                            Esperando Aprovação
                        </Button>                        
                        :
                        <Button variant='contained' fullWidth onClick={(e) => {
                            if(community.isPrivate)
                            {
                                if(isAuthenticated){
                                    e.stopPropagation();
                                    discoverHook.handleRequest(community._id)
                                    setOpenModal(true)
                                }else{
                                    dispatch(setIsOpen(true))
                                }
                            }else{
                                e.stopPropagation();
                                discoverHook.handleJoin(community._id)
                            }
                            
                            }}>
                            Participar do Grupo
                        </Button>
                    }
                </Stack>
            </Box>
        </Card>
    )
}