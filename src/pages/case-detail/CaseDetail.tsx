import { Box, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdevaLoading from "src/components/AdevaLoading";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import useResponsive from "src/hooks/useResponsive";
import { useSelector } from "src/redux/store";
import { PATH_ERP } from "src/routes/paths";
import CardDetails from "./components/CardDetails";
import useCaseDetail from "./hooks/CaseDetail.hook";
import useActivitiesList from "./hooks/ActivitieList.hook";
import CaseDetailTabs from "./components/CaseDetailTabs";
import CaseSummary from "./components/CaseSummary";
import ActivitiesList from "./components/ActivitiesList";
import DocumentList from "./components/DocumentList";
import Label from "src/components/Label";
import ServiceList from "./components/ServiceList";
import LinkedActivitiesCard from "./components/LinkedActivitiesCard";
import ActivityModal from "./components/ActivityModal";
// import DocumentList from "./components/DocumentList";
import DocumentsCard from "./components/DocumentsCard";
import MovimentationList from "./components/MovimentationsList";


export default function CaseDetail(){
    const navigate = useNavigate()
    const { process, isLoadingCaseDetail } = useSelector((state) => state.caseDetail)
    const { caseDetailHook } = useCaseDetail()
    const { activitiesListHook } = useActivitiesList()

    const isDesktop = useResponsive('up', 'md');
    
    return(
        <Page title='Detalhe do Caso'>
            <Container maxWidth='lg' sx={{ mt: 3 }}>
            {isLoadingCaseDetail ?
                <Box flexGrow={1} display='flex' justifyContent='center' sx={{mt: 40}}>
                    <AdevaLoading/>
                </Box>
                :
                <Stack spacing={3}>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                        <Stack direction='row' alignItems='center' spacing={1}>
                            <IconButton color="primary" onClick={() => navigate(PATH_ERP.process)}>
                                <Iconify icon='material-symbols:arrow-back'/>
                            </IconButton>
                            <Stack>
                                <Typography variant='h5'>
                                    {process?.title}
                                </Typography>
                                <Stack direction='row' spacing={1}>
                                    {process?.tags.map((tag) =>
                                        <Label
                                            color={tag.color as any}
                                            variant="filled"
                                        >
                                            {tag.title}
                                        </Label>
                                    )}
                                </Stack>
                            </Stack>
                        </Stack>       
                        <IconButton
                            sx={{
                                width: 36,
                                height: 36,
                                borderRadius: 1,
                                backgroundColor: (theme) => theme.palette.primary.main,
                                color: (theme) => theme.palette.common.white,
                                '&:hover':{
                                    backgroundColor: (theme) => theme.palette.primary.darker,
                                }
                            }}
                        >
                            <Iconify icon='ic:outline-more-vert'/>
                        </IconButton>             
                    </Stack>
                    <CardDetails/>
                    <CaseDetailTabs caseDetailHook={caseDetailHook}/>
                    {caseDetailHook.currentTab === 1 ?
                        <CaseSummary/>
                        :
                        caseDetailHook.currentTab === 2 ?
                        <Box flexGrow={1}>
                            <Grid container spacing={3}>
                                <Grid item md={8} xs={12}>
                                    <ServiceList/>
                                </Grid>
                                {isDesktop &&
                                    <Grid item md={4} xs={0}>
                                        <LinkedActivitiesCard caseDetailHook={caseDetailHook} activitiesListHook={activitiesListHook}/>
                                    </Grid>
                                }
                            </Grid>
                        </Box>
                        :
                        caseDetailHook.currentTab === 3 ?
                        <ActivitiesList activitiesListHook={activitiesListHook}/>
                        :
                        caseDetailHook.currentTab === 5 ?
                        <Box flexGrow={1}>
                            <Grid container spacing={3}>
                                <Grid item md={8} xs={12}>
                                    <MovimentationList caseDetailHook={caseDetailHook}/>
                                </Grid>
                                {isDesktop &&
                                    <Grid item md={4} xs={0}>
                                        <Stack spacing={3}>
                                            <LinkedActivitiesCard type='movimentation' activitiesListHook={activitiesListHook} caseDetailHook={caseDetailHook}/>
                                            <DocumentsCard caseDetailHook={caseDetailHook}/>
                                        </Stack>
                                    </Grid>
                                }
                            </Grid>
                        </Box>
                        :
                        caseDetailHook.currentTab === 6 ?
                        <Box flexGrow={1}>
                            <Grid container spacing={3}>
                                <Grid item md={8} xs={12}>
                                    <MovimentationList caseDetailHook={caseDetailHook}/>
                                </Grid>
                                {isDesktop &&
                                    <Grid item md={4} xs={0}>
                                        <Stack spacing={3}>
                                            <LinkedActivitiesCard type='movimentation' activitiesListHook={activitiesListHook} caseDetailHook={caseDetailHook}/>
                                            <DocumentsCard caseDetailHook={caseDetailHook}/>
                                        </Stack>
                                    </Grid>
                                }
                            </Grid>
                        </Box>
                        :
                        <DocumentList/>
                    }
                </Stack>
            }
            <ActivityModal activitiesListHook={activitiesListHook}/>
            </Container>
        </Page>
    )
}