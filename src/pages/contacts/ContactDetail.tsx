import { Box, Container, IconButton, Stack, Typography, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdevaLoading from "src/components/AdevaLoading";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import MenuPopover from "src/components/MenuPopover";
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
import { CLASSIFICATION_OPTIONS } from "../contacts-handle/hooks/ContactsHandle.hook";
import RegistrationDataCard from "./components/RegistrationDataCard";


export default function ProcessImportDetail(){
    const navigate = useNavigate()
    const { contact, isLoadingContactById } = useSelector((state) => state.contact)
    const { contactDetailHook } = useContactDetail()
    const { activitiesListHook } = useActivitiesList()
    
    return(
        <Page title='Detalhe do Processo'>
            <Container maxWidth='lg' sx={{ mt: 3 }}>
            {isLoadingContactById ?
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
                                    {contact?.name}
                                </Typography>
                                <Typography variant='body2'>
                                    {contact?.companyName}
                                </Typography>
                                <Stack direction='row' spacing={1}>
                                    <Label
                                        sx={{backgroundColor: CLASSIFICATION_OPTIONS.find((opt: any) => opt.value === contact?.classification)?.color, borderRadius: 10}}
                                        variant="filled"
                                    >
                                        {CLASSIFICATION_OPTIONS.find((opt: any) => opt.value === contact?.classification)?.label}
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
                    <ContactDetailTabs contactDetailHook={contactDetailHook}/>
                    {contactDetailHook.currentTab === 1 ?
                        <RegistrationDataCard/>
                        :
                        contactDetailHook.currentTab === 2 ?
                        <></>
                        :
                        contactDetailHook.currentTab === 3 ?
                        <ActivitiesList activitiesListHook={activitiesListHook}/>
                        :
                        contactDetailHook.currentTab === 4 ?
                        <ServiceList contactDetailHook={contactDetailHook} activitiesListHook={activitiesListHook} />
                        :
                        <></>
                    }
                </Stack>
            }
            <ActivityModal activitiesListHook={activitiesListHook}/>
            </Container>
            <MenuPopover
                open={Boolean(contactDetailHook.openPopover)}
                anchorEl={contactDetailHook.openPopover}
                onClose={() => contactDetailHook.setOpenPopover(null)}
                sx={{
                '& .MuiMenuItem-root': {
                    px: 1,
                    typography: 'body2',
                    borderRadius: 0.75,
                },
                }}
                disabledArrow
            >
                {contactDetailHook.POPOVER_OPTIONS?.map((opt: {to: string, label: string}) =>
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