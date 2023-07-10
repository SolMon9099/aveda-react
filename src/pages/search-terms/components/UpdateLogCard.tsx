import { TimelineDot } from "@mui/lab";
import { Card, Stack, Box, Typography, IconButton, Button, alpha } from "@mui/material";
import moment from "moment";
import Iconify from "src/components/Iconify";
import Label from "src/components/Label";
import { useSelector } from "src/redux/store";

export default function UpdateLogCard({searchTermHook} : any){

    return(
        <Card>
            <Box sx={{ height: 8,bgcolor: (theme) => theme.palette.secondary.main, top: 0 }}/>
            <Stack spacing={3} sx={{pt: 2, pl: 3, pr:3, pb: 3}}>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography variant="h6">
                        Registro de Atualizações
                    </Typography>
                </Stack>
                {searchTermHook.UPDATE_HISTORY?.length > 0 && searchTermHook.UPDATE_HISTORY.map((history: any) => (
                    <Stack gap={2} direction={'row'} sx={{ marginTop: '16px', }}>
                        <TimelineDot color='primary'/>
                        <Stack direction={'column'}>
                            <Typography
                                variant={'body2'}
                                fontSize={14}
                            >
                                {history.action}
                            </Typography>
                            <Typography
                                variant={'body2'}
                                color='text.secondary'
                                fontSize={12}
                            >
                                {history.name} - {history.date}
                            </Typography>
                        </Stack>
                    </Stack>
                ))}
            </Stack>
        </Card>
    )
}