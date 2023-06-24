import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useSelector } from "src/redux/store";


export default function CardDetails(){
    const { processImportDetail } = useSelector((state) => state.processImportList)

    const row = (title: string, subtitle: string) => {
        return(
            <>
                <Grid item xs={12} sm={4} md={2}>
                    <Typography variant='body2'>
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={10}>
                    <Typography variant='subtitle2' fontWeight='500'>
                        {subtitle}
                    </Typography>
                </Grid>
            </>
        )
    }

    return(
        <Card>
            <CardContent>
                <Box flexGrow={1}>
                    <Grid container spacing={2}>
                        {row('Advogado', processImportDetail?.lawyerName || '-')}
                        {row('Inscrição OAB', processImportDetail?.oabNumber + ' / ' + processImportDetail?.sectional || '-')}
                        {row('Data da Pesquisa', processImportDetail?.searchDate || '-')}
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    )
}