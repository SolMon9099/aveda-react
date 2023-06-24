import { Card, Box, Typography, Stack } from "@mui/material";
import UserAvatar from "src/components/UserAvatar";
import { useSelector } from "src/redux/store";


export default function CardWhoLiked() {
    const { likes } = useSelector((state) => state.post)
    return(
        <Card sx={{ borderRadius: 1 }}>
            <Box sx={{ height: 8, bgcolor: (theme) => theme.palette.secondary.main, top: 0 }}/>
            <Stack spacing={3} sx={{pt: 2, pl: 3, pr:3, pb: 3}}>
                <Typography variant="h6">
                    Quem curtiu
                </Typography>
                <Stack spacing={3}>
                    {likes.map((like) => <UserAvatar name={like.name} email={like.email} description={like.description} fontWeightName="small"/>)}
                </Stack>
            </Stack>
        </Card>
    )
}