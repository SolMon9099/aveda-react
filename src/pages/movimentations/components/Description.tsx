import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import Label from "src/components/Label";

export default function MovimentationsTabs({ movimentationHook }: any){
    return(
        <Grid container md={12} >
            <Card>
                <CardContent>
                    <Grid md={12} justifyContent={'center'} alignItems={'center'} display={'flex'} minHeight={360} spacing={4}>
                        <Grid md={12} justifyContent={'center'} >
                            <Grid md={12} justifyContent={'center'} display={'flex'}>
                                <Grid md={6} textAlign={'center'}>
                                    <Typography
                                        variant="h6"
                                        color={'text.primary'}>
                                        Acompanhe as movimentações dos Diários Oficiais
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid md={12} justifyContent={'center'} display={'flex'} marginTop={1}>
                                <Grid md={5} justifyContent={'center'} textAlign={'center'} display={'flex'}>
                                    <Typography
                                        variant="body2"
                                        color={'text.primary'}>
                                        Fique por dentro das publicações dos diversos Diários Oficiais relacionadas a CPF´s e CNPJ´s que você precisa monitorar. Clique no botão no canto direito superior para começar.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
        
    )
}