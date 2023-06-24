import { Card, Box, Typography, Stack } from "@mui/material";
import Label from "src/components/Label";
import { useSelector } from "src/redux/store";


export default function CardPoints(){
    const { topTopics } = useSelector((state) => state.feed)

    return(
        <Card sx={{ borderRadius: 1 }}>
            <Box sx={{ height: 8,bgcolor: (theme) => theme.palette.secondary.main, top: 0 }}/>
            <Stack spacing={3} sx={{pt: 2, pl: 3, pr:3, pb: 3}}>
                <Typography variant="h6">
                    Principais Tópicos
                </Typography>
                <Stack spacing={3}>
                    {topTopics &&
                        topTopics.map((topic, idx) =>
                            <Stack key={'TOPTOPIC_' + topic.name + idx} direction='row' alignItems='center' spacing={1}>
                                <Label sx={{ borderRadius: 0.5 }} color={topic.fromCommunity ? 'secondary' : 'default'}>
                                    <Typography variant='caption'>
                                        {topic.name}
                                    </Typography>
                                </Label>
                                <Typography variant='body2' color='text.secondary'>
                                    x {topic.postCount}
                                </Typography>
                            </Stack>
                        )

                    }
                </Stack>
            </Stack>
        </Card>
    )
}