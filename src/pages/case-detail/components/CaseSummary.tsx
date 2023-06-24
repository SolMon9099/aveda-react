import { Box, Card, CardContent, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Iconify from "src/components/Iconify";
import TextMaxLine from "src/components/TextMaxLine";
import { useSelector } from "src/redux/store";
import { PATH_ERP } from "src/routes/paths";


export default function CaseSummary(){
    const { process } = useSelector((state) => state.caseDetail)
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
                            Resumo do Caso
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
                            onClick={() => navigate(PATH_ERP.handleCase+'/'+process?._id)}
                        >
                            <Iconify icon='mdi:pencil'/>
                        </IconButton>  
                    </Stack>
                    <Box flexGrow={1}>
                        <Grid container spacing={2}>
                            {row('Cliente', process?.clientName || '')}
                            {row('Título do Caso', process?.title || '-')}
                            {row('Pasta do Caso', process?.folder || '-')}
                            {row('Matéria', process?.matter?.label || '-')}
                            {row('Observações', process?.observations || '-')}
                            {row('Responsável', process?.responsible?.label || '-')}
                        </Grid>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    )
}