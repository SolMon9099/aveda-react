import { Card, Box, Stack, Typography, Divider, Button } from "@mui/material"
import Iconify from "src/components/Iconify"
import Label from "src/components/Label"
import UserAvatar from "src/components/UserAvatar"
import useAuth from "src/hooks/useAuth"
import { useSelector } from "src/redux/store"

export default function Members({ communityHook }: any){
    const { members, selectedCommunity, awaitingApproval } = useSelector((state) => state.community)
    const { user } = useAuth()    

    return(
        <>
        {
        (selectedCommunity?.isAdmin && awaitingApproval.length > 0)  &&
            <Card>
            <Box sx={{ p: 3 }}>
                <Typography variant="h6">
                Solicitações de Participação
                </Typography>
                <Box mb={3}/>
            <Stack spacing={3}>
                {awaitingApproval.map((member) =>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <UserAvatar
                        email={member.email}
                        key={'AVATAR_MEMBER_'+member._id} 
                        name={member.name} 
                        photo={member.photo} 
                        description={member.description} 
                        subNode={
                            <Stack direction='row' alignItems='center' spacing={0.5}>
                                <Typography variant="caption" color='text.secondary'>
                                    {member.likeCount}
                                </Typography>
                                <Box sx={{ color: (theme) => theme.palette.text.secondary }}>
                                    <Iconify width={12} height={12} icon='mdi:like'/>
                                </Box>
                            </Stack>
                        }
                    />
                    {(selectedCommunity?.admins.filter((adm) => adm._id === user?.id)[0] && member._id !== user?.id) &&
                        <Stack spacing={2} direction={'row-reverse'}>
                            <Button
                                color="success"
                                sx={{color:"#FFFFFF"}}
                                variant="contained"
                                onClick={() => communityHook.acceptRequest(member._id)}
                            >
                            Aprovar
                        </Button>
                        
                        <Button
                            color='primary'
                            sx={{color:'#000000', backgroundColor:"#FFFFFF"}}
                            variant="outlined"
                            style={{maxWidth: '36px', maxHeight: '36px', minWidth: '36px', minHeight: '36px'}}

                            onClick={() => communityHook.declineRequest(member._id)}
                            >
                            X
                        </Button>
                        </Stack>
                    }
                    </Stack>
                    )}
                    </Stack>
                </Box>
            </Card>
        }
        <Box mt={3}/>
        <Card>
            <Box sx={{ p: 3 }}>
                <Stack spacing={3}>
                    {selectedCommunity?.admins.map((adm) =>
                        <UserAvatar
                            email={adm.email}
                            key={'AVATAR_ADM_'+adm._id} 
                            name={adm.name} 
                            photo={adm.photo} 
                            description={adm.description} 
                            subNode={
                                <Label color="secondary">
                                    Administrador
                                </Label>
                            }
                        />
                    )}
                    <Divider/>
                    {!!user &&
                        <UserAvatar
                            email={user.email} 
                            name={user.name} 
                            photo={user.photo} 
                            description={user.description} 
                            subNode={
                                <Stack direction='row' alignItems='center' spacing={0.5}>
                                    <Typography variant="caption" color='secondary.main'>
                                        {members.filter((m) => m._id === user.id)[0]?.likeCount}
                                    </Typography>
                                    <Box sx={{ color: (theme) => theme.palette.secondary.main }}>
                                        <Iconify width={12} height={12} icon='mdi:like'/>
                                    </Box>
                                </Stack>
                            }
                        />
                    }
                    <Divider/>
                    {members.map((member) =>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <UserAvatar
                                email={member.email}
                                key={'AVATAR_MEMBER_'+member._id} 
                                name={member.name} 
                                photo={member.photo} 
                                description={member.description} 
                                subNode={
                                    <Stack direction='row' alignItems='center' spacing={0.5}>
                                        <Typography variant="caption" color='secondary.main'>
                                            {member.likeCount}
                                        </Typography>
                                        <Box sx={{ color: (theme) => theme.palette.secondary.main }}>
                                            <Iconify width={12} height={12} icon='mdi:like'/>
                                        </Box>
                                    </Stack>
                                }
                            />
                            {(selectedCommunity?.admins.filter((adm) => adm._id === user?.id)[0] && member._id !== user?.id) &&
                                <Button
                                    color="error"
                                    variant="contained"
                                    onClick={() => communityHook.removeMember(member._id)}
                                >
                                    Remover
                                </Button>
                            }
                        </Stack>
                    )}
                </Stack>
            </Box>
        </Card>
    </>
    )
}