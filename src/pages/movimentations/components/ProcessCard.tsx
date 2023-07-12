import { TimelineDot } from "@mui/lab";
import { Card, Stack, Box, Typography, IconButton, Button, alpha } from "@mui/material";
import moment from "moment";
import Iconify from "src/components/Iconify";
import Label from "src/components/Label";
import { useSelector } from "src/redux/store";

export default function ProcessCard({searchTermHook} : any){

    return(
        <>
            <Card>
                <Box sx={{ height: 8,bgcolor: (theme) => theme.palette.secondary.main, top: 0 }}/>
                <Stack spacing={3} sx={{pt: 2, pl: 3, pr:3, pb: 3}}>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                        <Typography variant="h6">
                        Processo
                        </Typography>
                    </Stack>
                    <Stack gap={2} direction={'row'} sx={{ marginTop: '16px' }}>
                        <Stack direction={'column'}>
                            <Typography
                                variant={'body2'}
                                fontSize={14}
                                color='primary'
                            >
                                {'Recálculo Aposentadoria Gabriel Girardi'}
                            </Typography>
                            <Typography
                                variant={'body2'}
                                color='text.secondary'
                                fontSize={12}
                            >
                                {'8010041-55.2022.8.05.0113'}
                            </Typography>
                            <Stack direction={'row'} gap={1} mt={2}>
                                <Iconify icon='ri:user-follow-line'/>
                                <Typography
                                    fontSize={14}
                                    fontWeight={500}
                                >
                                    Flávia Vilaça    
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Card>

            <Card sx={{ marginTop: 3}}>
                <Box sx={{ height: 8,bgcolor: (theme) => theme.palette.secondary.main, top: 0 }}/>
                <Stack spacing={3} sx={{pt: 2, pl: 3, pr:3, pb: 3}}>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                        <Typography variant="h6">
                            Atividades Vinculadas
                        </Typography>
                        <IconButton
                            sx={{
                                width: 24,
                                height: 24,
                                p: 0.5,
                                borderRadius: 1,
                                backgroundColor: (theme) => theme.palette.grey[300],
                                color: (theme) => theme.palette.common.black,
                                '&:hover':{
                                    backgroundColor: (theme) => theme.palette.grey[500],
                                }
                            }}
                        >
                            <Iconify width={18} height={18} icon='ic:baseline-plus'/>
                        </IconButton>
                    </Stack>
                </Stack>
            </Card>
        </>
    )
}