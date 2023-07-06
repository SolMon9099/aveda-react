import { Box, Container, Grid, IconButton, Stack, Typography, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdevaLoading from "src/components/AdevaLoading";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import MenuPopover from "src/components/MenuPopover";
import useResponsive from "src/hooks/useResponsive";
import { useSelector } from "src/redux/store";
import { PATH_ERP } from "src/routes/paths";
import ContactDetailTabs from "./components/ContactDetailTabs";
import ServiceList from "./components/ServiceList";
// import ProcessSummary from "src/pages/process-detail/components/ProcessSummary";
import useContactDetail from "./hooks/ContactDetail.hook";
import ActivitiesList from "src/pages/process-detail/components/ActivitiesList";
import useActivitiesList from "src/pages/process-detail/hooks/ActivitieList.hook";
// import DocumentList from "src/pages/process-detail/components/DocumentList";
// import DocumentsCard from "src/pages/process-detail/components/DocumentsCard";
// import MovimentationList from "src/pages/process-detail/components/MovimentationsList";
import Label from "src/components/Label";
// import ServiceList from "src/pages/process-detail/components/ServiceList";
// import LinkedActivitiesCard from "src/pages/process-detail/components/LinkedActivitiesCard";
import ActivityModal from "src/pages/case-detail/components/ActivityModal";


export default function ProcessImportDetail(){
    const navigate = useNavigate()
    const { process, isLoadingProcessDetail } = useSelector((state) => state.processDetail)
    const { processDetailHook } = useContactDetail()
    const { activitiesListHook } = useActivitiesList()

    const isDesktop = useResponsive('up', 'md');
    
    return(
        <Page title='Detalhe do Processo'>
            <Container maxWidth='lg' sx={{ mt: 3 }}>
            {isLoadingProcessDetail ?
                <Box flexGrow={1} display='flex' justifyContent='center' sx={{mt: 40}}>
                    <AdevaLoading/>
                </Box>
                :
                <Stack spacing={3}>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                        <Stack direction='row' alignItems='center' spacing={1}>
                            <IconButton color="primary" onClick={() => navigate(PATH_ERP.people)}>
                                <Iconify icon='material-symbols:arrow-back'/>
                            </IconButton>
                            <Stack>
                                <Typography variant='h5'>
                                    {process?.title}
                                </Typography>
                                <Stack direction='row' spacing={1}>
                                    <Label
                                        color={'default'}
                                        variant="filled"
                                    >
                                        {'Cliente'}
                                    </Label>
                                </Stack>
                            </Stack>
                        </Stack>       
                        <IconButton
                            sx={{
                                width: 36,
                                height: 36,
                                borderRadius: 1,
                                backgroundColor: 'lightgray',
                                color: (theme) => theme.palette.common.black,
                                '&:hover':{
                                    backgroundColor: 'darkgray',
                                }
                            }}
                        >
                            <Iconify icon='ic:outline-more-vert'/>
                        </IconButton>             
                    </Stack>
                    <ContactDetailTabs processDetailHook={processDetailHook}/>
                    {processDetailHook.currentTab === 1 ?
                        <></>
                        :
                        processDetailHook.currentTab === 2 ?
                        <></>
                        // <Box flexGrow={1}>
                        //     <Grid container spacing={3}>
                        //         <Grid item md={8} xs={12}>
                        //             <ServiceList/>
                        //         </Grid>
                        //         {isDesktop &&
                        //             <Grid item md={4} xs={0}>
                        //                 <LinkedActivitiesCard type='service' activitiesListHook={activitiesListHook} processDetailHook={processDetailHook}/>
                        //             </Grid>
                        //         }
                        //     </Grid>
                        // </Box>
                        :
                        processDetailHook.currentTab === 3 ?
                        <ActivitiesList activitiesListHook={activitiesListHook}/>
                        :
                        processDetailHook.currentTab === 4 ?
                        <ServiceList processDetailHook={processDetailHook} activitiesListHook={activitiesListHook} />
                        :
                        // <DocumentList/>
                        <></>
                    }
                </Stack>
            }
            <ActivityModal activitiesListHook={activitiesListHook}/>
            </Container>
            <MenuPopover
                open={Boolean(processDetailHook.openPopover)}
                anchorEl={processDetailHook.openPopover}
                onClose={() => processDetailHook.setOpenPopover(null)}
                sx={{
                '& .MuiMenuItem-root': {
                    px: 1,
                    typography: 'body2',
                    borderRadius: 0.75,
                },
                }}
                disabledArrow
            >
                {processDetailHook.POPOVER_OPTIONS?.map((opt: {to: string, label: string}) =>
                    <MenuItem
                        key={'OPT_'+opt.to}
                        onClick={() => navigate(opt.to)}
                    >
                        {opt.label}
                    </MenuItem>
                )}
            </MenuPopover>
        </Page>
    )
}