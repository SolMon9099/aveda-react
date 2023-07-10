import { LoadingButton } from "@mui/lab";
import { Box, Dialog, DialogContent, Grid, IconButton, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import Iconify from "src/components/Iconify";

export default function SuccessModal({ searchHandleHook } : any){
    return(
        <Dialog maxWidth='sm' fullWidth open={searchHandleHook.openModal} onClose={() => searchHandleHook.onClose()}>
            <DialogContent>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography
                        variant="h6"
                    >
                        Pesquisas em andamento!
                    </Typography>
                    <IconButton
                        onClick={() => searchHandleHook.onClose()}
                    >
                        <Iconify width={24} height={24} icon='ic:close'/>
                    </IconButton>
                </Stack>
                <Stack>
                    <Typography
                        variant="body1"
                    >
                        Você começará a receber as publicações em até 48h.
                    </Typography>
                </Stack>
                <Stack direction='row'>
                    <Box flexGrow={1}/>
                    <LoadingButton
                        // type='submit'
                        variant='contained'
                        onClick={() => searchHandleHook.onClose()}
                    >
                        Entendido
                    </LoadingButton>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}