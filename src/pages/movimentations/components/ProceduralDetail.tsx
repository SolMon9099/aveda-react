import { Card, CardContent, Grid, Stack, Typography, IconButton, Divider, Button } from "@mui/material";
import Iconify from "src/components/Iconify";
import Label from "src/components/Label";
import ProcessCard from "./ProcessCard";

export default function PublicationDetail({ movimentationHook }: any){
    let publicationInfo: any = movimentationHook.publicationToShow
    return(
        <Grid container md={12} justifyContent={'space-between'}>
            <Grid direction='row' md={12} display={'flex'} justifyContent={'space-between'} mb={3}>
                <Grid md={4}>
                    <Stack direction='row' spacing={1}>
                        <IconButton color="primary" onClick={() => movimentationHook.setCurrentPage('list')}>
                            <Iconify icon='material-symbols:arrow-back'/>
                        </IconButton>
                        <Stack>
                            <Typography variant='h5'>
                                {'Andamentos Processual'}
                            </Typography>
                            <Stack direction='row' spacing={1}>
                                {publicationInfo?.status.map((status: any) =>
                                    <Label
                                        color={status.color as any}
                                        variant="filled"
                                    >
                                        {status.title}
                                    </Label>    
                                )}
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid direction={'row'}>
                    <Button
                        variant='contained'
                        sx={{
                            marginRight: 2
                        }}
                    >
                        Marcar como Revisado
                    </Button>
                    <IconButton
                        sx={{
                            width: 36,
                            height: 36,
                            borderRadius: 1,
                            backgroundColor: (theme) => theme.palette.grey[300] ,
                        }}
                        onClick={(e) => {movimentationHook.setOpenDetailPopover(e.currentTarget)}}
                    >
                        <Iconify icon='ic:outline-more-vert'/>
                    </IconButton>               
                </Grid>
            </Grid>
            <Grid md={8} mb={2}>
                <Stack spacing={3}>
                    <Card>
                        <CardContent>
                            <Grid md={12} justifyContent={'space-between'} spacing={4}>
                                <Typography
                                    variant='subtitle1'
                                    fontWeight={'500'}
                                    mb={2}
                                >
                                    Publicação
                                </Typography>
                                <Typography
                                    variant='body2'
                                    fontWeight={'400'}
                                    mb={2}
                                >
                                    2ª Vara Gabinete JEF de Porto Alegre<br/>
                                    NÚMERO ÚNICO: 0012023-23.2021.4.03.6332
                                </Typography>
                            </Grid>
                        </CardContent>
                    </Card>
                </Stack>
            </Grid>
            <Grid md={4}>
                <Stack pl={2}>
                    <ProcessCard />
                </Stack>
            </Grid>
        </Grid>
        
    )
}