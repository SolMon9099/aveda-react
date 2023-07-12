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
                                {'Publicação'}
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
                                    variant='body1'
                                    fontWeight={'600'}
                                    mb={2}
                                >
                                    Diário do Tribunal de Justiça do Rio Grande do Sul - Edição 2552
                                </Typography>
                                <Typography
                                    variant='body2'
                                    fontWeight={'400'}
                                    mb={2}
                                >
                                    Vara: 2a Vara do Trabalho de Porto Alegre - Comarca Porto Alegre
                                </Typography>
                                <Typography
                                    variant='body2'
                                    fontWeight={'400'}
                                    mb={2}
                                >
                                    Divulgado em 05/03/2023 - Publicado em: 06/03/2023
                                </Typography>
                                <Typography
                                    variant='body2'
                                    fontWeight={'400'}
                                    mb={2}
                                >
                                    Processo: 8010041-55.2022.8.05.0113
                                </Typography>
                                <Typography
                                    variant='body2'
                                    fontWeight={'400'}
                                    mb={2}
                                >
                                    Termo Encontrado: Flávia Vilaça
                                </Typography>
                                <Divider />
                                <Typography
                                    variant='body2'
                                    fontWeight={'400'}
                                    mb={2}
                                >
                                    RECLAMANTE GABRIEL GIRARDI <br/>
                                    ADVOGADO FLAVIA VILAÇA (OAB: 217975/RS)<br/>
                                    RECLAMADO INSTITUTO NACIONAL DO SEGURO SOCIAL - INSS<br/>
                                    ADVOGADO RENATA PEREIRA ZANARDI(OAB: 33819/RS)
                                </Typography>
                                <Typography
                                    variant='body1'
                                    fontWeight={'600'}
                                >
                                    DESPACHO
                                </Typography>
                                <Typography
                                    variant='body1'
                                    fontWeight={'400'}
                                    mb={2}
                                >
                                    Diante da possibilidade de realização de audiências telepresenciais no CEJUSC (Resolução CSJT nº 288/ 2021), designo audiência telepresencial de conciliação para Dia 02/12/2022 10:40, sala virtual: SALA 02 do CEJUSC Ruy Barbosa.
                                </Typography>
                                <Typography
                                    variant='body1'
                                    fontWeight={'400'}
                                    mb={2}
                                >
                                    Fixo o prazo de 03 dias para que os advogados manifestem nos autos algum desinteresse para participação no ato , ficando, desde já, cientes de que nesse caso será cancelada a audiência e o feito terá o regular prosseguimento perante o juízo de origem.
                                </Typography>
                                <Typography
                                    variant='body1'
                                    fontWeight={'400'}
                                    mb={2}
                                >
                                    As partes deverão juntar ao processo, diretamente no sistema PJe, seus atos constitutivos, carta de preposição, procuração/substabelecimento, no prazo de 48 horas antes da audiência acima designada.
                                </Typography>
                                <Typography
                                    variant='body1'
                                    fontWeight={'400'}
                                    mb={2}
                                >
                                    Recomenda-se que o reclamante esteja à disposição deste Juízo no dia e horário acima indicados para a ratificação de eventual acordo por meio de aplicativo eletrônico (WhatsApp), sendo essencial no caso de ainda não ter comparecido a juízo em audiência anterior. O ingresso na sala da sua sessão no Cejusc, no dia e horário acima agendados, poderá ser feito seguindo um dos dois caminhos abaixo explicitados:
                                </Typography>
                                <Typography
                                    variant='body1'
                                    fontWeight={'400'}
                                    mb={2}
                                >
                                    1 - Diretamente pelo link: https://trt2-jusbr.zoom.us/j/81872601242?pwd=dmxJTVdoVjBmRGMzSUFKRVoy N0Jndz09 . A parte será redirecionada à sala de espera do Cejusc. Deverá então clicar no ícone “salas simultâneas” (ou Breakout Rooms). Todas as salas de audiência de conciliação daquele dia aparecerão, devendo a parte ingressar na sala relativa ao seu processo e aguardar por lá a entrada do conciliador e o início da sessão. As salas poderão ser identificadas pelo número da sala e horário de início.
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