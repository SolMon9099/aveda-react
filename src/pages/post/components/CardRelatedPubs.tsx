import { Card, Box, Typography, Stack } from "@mui/material";
import { useSelector } from "src/redux/store";
import { Link } from "react-router-dom"; 
import { PATH_FORUM } from "src/routes/paths";


export default function CardRelatedPubs(){
    const { relatedPosts } = useSelector((state) => state.post)
    return(
        <Card sx={{ borderRadius: 1 }}>
            <Box sx={{ height: 8, bgcolor: (theme) => theme.palette.secondary.main, top: 0 }}/>
            <Stack spacing={3} sx={{pt: 2, pl: 3, pr:3, pb: 3}}>
                <Typography variant="h6">
                    Publicações Relacionadas
                </Typography>
                <Stack spacing={3}>
                    {relatedPosts.map((post) =>
                        <Stack key={'RELATEDD_POST_'+post._id} direction='row' spacing={1} alignItems='center'>
                            <Box display='flex' sx={{bgcolor: (theme) => theme.palette.secondary.main, borderRadius:0.5}}>
                                <Typography variant="caption" color='secondary.contrastText' sx={{px: 1.1, py: 0.2}}>
                                    {post.commentCount}
                                </Typography>
                            </Box>
                            <Typography component={Link} to={PATH_FORUM.post+post._id} variant="body2" color='info.darker' sx={{px: 1.1, py: 0.2}}>
                                {post.title}
                            </Typography>
                        </Stack>
                    )}
                </Stack>
            </Stack>
        </Card>
    )
}