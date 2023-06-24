import { Card, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MyAvatar from "src/components/MyAvatar";
import { resetTopic } from "src/redux/slices/topic";
import { useDispatch } from "src/redux/store";
import { PATH_FORUM } from "src/routes/paths";


export default function CardNewPub(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return(
        <Card onClick={() =>{dispatch(resetTopic()); navigate(PATH_FORUM.novoPost)}}>
            <Stack spacing={2} direction='row' sx={{padding: 2}} alignItems='center'>
                <MyAvatar sx={{width: 36, height: 36}}/>
                <TextField
                    sx={{
                        backgroundColor: (theme) => theme.palette.background.neutral,
                        borderRadius: 1,
                        '.MuiOutlinedInput-input':{
                            cursor: 'text'
                        }
                    }}
                    size="small"
                    fullWidth
                    disabled
                    label='Escrever Publicação...'
                />
            </Stack>
        </Card>
    )
}