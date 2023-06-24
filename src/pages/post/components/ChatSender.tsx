import { Box, Stack } from "@mui/material";
import { FormProvider } from "src/components/hook-form";
import useLive from '../hooks/Live.hook'
import RHFChatSender from 'src/components/hook-form/RHFChatSender'
import useAuth from './../../../hooks/useAuth';

export default function ChatSender(){
    const { isAuthenticated } = useAuth()
    const { liveHook } = useLive()

  return(
    <Box >
      <Stack  direction={'row'} alignItems={'center'} >
            <FormProvider sx methods={liveHook.methods} onSubmit={liveHook.handleSubmit(liveHook.onSubmit)}>
                <RHFChatSender
                    onClick={()=>{liveHook.handleChat()}}
                    disabled={!isAuthenticated}
                    name='message'
                    fullWidth
                    placeholder='Escreva algo...'
                    />
            </FormProvider>
        </Stack>
    </Box>
  )
}