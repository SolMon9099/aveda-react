import { alpha, Box, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { topicType } from "src/@types/topics"
import Iconify from "src/components/Iconify"
import { PATH_FORUM } from "src/routes/paths"


type Props = {
    topic: topicType
}

export default function Topic({ topic }: Props){
    const navigate = useNavigate()

    return(
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Stack spacing={2} direction='row' alignItems='center'>
                <Box sx={{ 
                        display: 'flex', 
                        width: 48, 
                        height: 48, 
                        borderRadius: 3, 
                        bgcolor: (theme) => topic.fromCommunity ? alpha(theme.palette.secondary.main, 0.12) : theme.palette.action.focus,
                        color: (theme) => topic.fromCommunity ? theme.palette.success.dark : theme.palette.text.secondary,
                        justifyContent: 'center',
                        alignItems: 'center' 
                    }}>
                    <Iconify icon='ri:price-tag-3-line' width={20} height={20}/>
                </Box>
                <Stack>
                    <Typography variant="subtitle1" fontWeight='500' sx={{ '&:hover':{ cursor: 'pointer' } }} onClick={() => navigate(PATH_FORUM.topico + topic._id)}>
                        {topic.name}
                    </Typography>
                    <Stack spacing={0.5} direction='row' alignItems='center'>
                        <Typography variant="body2">
                            {topic.postCount === 1 ? `${topic.postCount} Publicação` : `${topic.postCount} Publicações`}
                        </Typography>
                        {topic.communityName &&
                            <Typography variant="body2" color="text.secondary">
                                ∙ {topic.communityName}
                            </Typography>
                        }
                    </Stack>
                </Stack>
            </Stack>
            {topic.isFixed &&
                <Box sx={{color: (theme) => theme.palette.text.disabled}}>
                    <Iconify icon='ri:pushpin-fill' width={25} height={25}/>
                </Box>
            }
        </Stack>
    )
}