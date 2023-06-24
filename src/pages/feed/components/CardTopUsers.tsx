import { Card, Box, Typography, Stack, Divider } from "@mui/material";
import Iconify from "src/components/Iconify";
import UserAvatar from "src/components/UserAvatar";
import { useSelector } from "src/redux/store";


export default function CardTopUsers(){
    const { topUsers } = useSelector((state) => state.feed)

    return(
        <Card sx={{ borderRadius: 1 }}>
            <Box sx={{ height: 8,bgcolor: (theme) => theme.palette.secondary.main, top: 0 }}/>
            <Stack spacing={3} sx={{pt: 2, pl: 3, pr:3, pb: 3}}>
                <Typography variant="h6">
                    Pontuação dos Usuários
                </Typography>
                <Stack spacing={3}>
                    {topUsers && 
                        topUsers.mostLikedUsers.map((user, idx) =>
                            <Stack key={'TOPUSER_'+user._id+idx} direction='row' alignItems='center' justifyContent='space-between'>
                                <UserAvatar email={user.email} fontWeightName='small' name={user.name} photo={user.photo} description={user.description} />
                                <Stack spacing={1} direction='row' alignItems='center'>
                                    <Typography variant='subtitle1' color='text.secondary'>
                                        {user.likeCount}
                                    </Typography>
                                    <Iconify icon='mdi:like' color='#637381'/>
                                </Stack>
                            </Stack>
                        )
                    }
                    <Divider/>
                    {topUsers?.currentUser[0] &&
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <UserAvatar email={topUsers.currentUser[0].email} fontWeightName='small' name={topUsers.currentUser[0].name} photo={topUsers.currentUser[0].photo} description={topUsers.currentUser[0].description} />
                            <Stack spacing={1} direction='row' alignItems='center'>
                                <Typography variant='subtitle1' color='text.secondary'>
                                    {topUsers.currentUser[0].likeCount}
                                </Typography>
                                <Iconify icon='mdi:like' color='#637381'/>
                            </Stack>
                        </Stack>
                    }
                </Stack>
            </Stack>
        </Card>
    )
}