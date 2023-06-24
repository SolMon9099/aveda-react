import { Card, Stack, TextField } from "@mui/material";
import MyAvatar from "src/components/MyAvatar";

export default function CardNewPub({feedHook}: any){
    return(
        <Card onClick={() => feedHook.goToNewPost()}>
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