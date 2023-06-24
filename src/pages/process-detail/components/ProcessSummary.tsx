import { Box, Card, CardContent, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Iconify from "src/components/Iconify";
import Label from "src/components/Label";
import TextMaxLine from "src/components/TextMaxLine";
import { useSelector } from "src/redux/store";
import { PATH_ERP } from "src/routes/paths";
import { money } from "src/utils/formatNumber";


export default function ProcessSummary(){
    const { process } = useSelector((state) => state.processDetail)
    const navigate = useNavigate()
 
    const row = (title: string, subtitle: string, url?: boolean) => {
        return(
            <>
                <Grid item xs={12} sm={4} md={3}>
                    <Typography variant='body2' color='text.secondary'>
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                    <TextMaxLine
                        sx={{
                            color: (theme) => url ? theme.palette.primary.main : undefined,
                            '&:hover':{
                                cursor: url ? 'pointer' : undefined
                            }
                        }} 
                        onClick={url ? () => window.open(subtitle, '_blank') : undefined }
                        target='_blank'
                        variant="subtitle2" 
                        fontWeight='500' 
                        line={1}
                    >
                        {subtitle}
                    </TextMaxLine>
                </Grid>
            </>
        )
    }

    return(
        <Card>
            <CardContent>
                <Stack spacing={3}>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                        <Typography variant='h6'>
                            Resumo do Processo
                        </Typography>
                        <IconButton
                            sx={{
                                width: 36,
                                height: 36,
                                borderRadius: 1,
                                backgroundColor: (theme) => theme.palette.grey[300],
                                color: (theme) => theme.palette.common.black,
                                '&:hover':{
                                    backgroundColor: (theme) => theme.palette.grey[500],
                                }
                            }}
                            onClick={() => navigate(PATH_ERP.handleProcess+'/'+process?._id)}
                        >
                            <Iconify icon='mdi:pencil'/>
                        </IconButton>  
                    </Stack>
                    <Box flexGrow={1}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4} md={3}>
                                <Typography variant='body2'>
                                    Autor
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={8} md={9}>
                                <Stack direction='row' alignItems='center' spacing={1}>
                                    <Typography variant='subtitle2' fontWeight='500'>
                                        {process?.clientQualify === 'reu' ? process?.counterName : process?.clientName}
                                    </Typography>
                                    {process?.clientQualify !== 'reu' && 
                                        <Label
                                            color='default'
                                        >
                                            Cliente
                                        </Label>
                                    }
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={4} md={3}>
                                <Typography variant='body2'>
                                    Réu
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={8} md={9}>
                                <Stack direction='row' alignItems='center' spacing={1}>
                                    <Typography variant='subtitle2' fontWeight='500'>
                                        {process?.clientQualify === 'reu' ? process?.clientName : process?.counterName}
                                    </Typography>
                                    {process?.clientQualify === 'reu' && 
                                        <Label
                                            color='default'
                                        >
                                            Cliente
                                        </Label>
                                    }
                                </Stack>
                            </Grid>
                            {row('Pasta do Processo', process?.folder || '-')}
                            {row('Número do Processo', process?.number || '-')}
                            {row('Orgão', process?.part?.label || '-')}
                            {row('Tipo de Ação', process?.action?.label || '-')}
                            {row('Matéria', process?.matter?.label || '-')}
                            {row('Comarca', process?.county?.label || '-')}
                            {row('Instância', process?.instance?.label || '-')}
                            {row('Fase', process?.phase?.label || '-')}
                            {row('Url do Processo', process?.url || '-', true)}
                            {row('Valor da Causa', money(process?.causeValue) || '-')}
                            {row('Responsável', process?.responsible?.label || '-')}
                            {row('Status', process?.status?.label || '-')}
                        </Grid>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    )
}