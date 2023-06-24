import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useSelector } from "src/redux/store";


export default function CardDetails(){
    const { process } = useSelector((state) => state.caseDetail)

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
                        {row('Caso', process?.number || '-')}
                        {row('Pasta', process?.folder || '-')}
                        {row('Cliente', process?.clientName || '-')}
                        {row('Responsável', process?.responsible?.label || '-')}
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    )
}