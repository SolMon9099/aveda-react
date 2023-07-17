import { Box, Card, CardContent, Container, IconButton, Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdevaLoading from "src/components/AdevaLoading";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import { useSelector } from "src/redux/store";
import { PATH_ERP } from "src/routes/paths";
import useContactsHandle from "./hooks/ContactsHandle.hook";
import PersonTypeTabs from "./components/PersonTypeTabs";
import FormTabs from "./components/FormTabs";
import PhysicalPersonForm from "./components/PhysicalPersonForm";
import { FormProvider } from "src/components/hook-form";
import LegalPersonForm from "./components/LegalPersonForm";
import { LoadingButton } from "@mui/lab";


export default function ProcessHandle(){
    const navigate = useNavigate()
    const { isLoadingContactToEdit } = useSelector((state) => state.contactsHandle)
    const { contactsHandleHook } = useContactsHandle()
    
    return(
        <Page title={(contactsHandleHook.isEdit ? "Editar " : "Novo ") + "Contato"}>
            <Container maxWidth='md' sx={{ mt: 3 }}>
            {(contactsHandleHook.isEdit && isLoadingContactToEdit) ?
                <Box flexGrow={1} display='flex' justifyContent='center' sx={{mt: 40}}>
                    <AdevaLoading/>
                </Box>
                :
                <Stack spacing={3}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                        <IconButton color="primary" onClick={() => navigate((contactsHandleHook.isEdit ? PATH_ERP.people + '/' + contactsHandleHook.contactId : PATH_ERP.people))}>
                            <Iconify icon='material-symbols:arrow-back'/>
                        </IconButton>
                        <Typography variant='h4'>
                            {(contactsHandleHook.isEdit ? "Editar " : "Novo ") + "Contato"}
                        </Typography>
                    </Stack>
                    <PersonTypeTabs contactsHandleHook={contactsHandleHook}/>
                    <Card>
                        <CardContent>
                            <Stack spacing={3}>
                                <FormTabs contactsHandleHook={contactsHandleHook}/>
                                <FormProvider methods={contactsHandleHook.methods} onSubmit={contactsHandleHook.handleSubmit(contactsHandleHook.onSubmit)}>
                                    <Stack spacing={2}>
                                        {contactsHandleHook.personType === 'physical' ?
                                            <PhysicalPersonForm contactsHandleHook={contactsHandleHook}/>
                                            :
                                            <LegalPersonForm contactsHandleHook={contactsHandleHook}/>
                                        }
                                        <Stack direction='row' spacing={2}>
                                            <Box flexGrow={1}/>
                                            <Button
                                                color='inherit'
                                                variant="outlined"
                                                onClick={() => contactsHandleHook.onCancel()}
                                            >
                                                Cancelar
                                            </Button>
                                            <LoadingButton
                                                loading={contactsHandleHook.isSubmitting}
                                                variant="contained"
                                                type='submit'
                                            >
                                                Salvar
                                            </LoadingButton>
                                        </Stack>
                                    </Stack>
                                </FormProvider>
                            </Stack>
                        </CardContent>
                    </Card>
                </Stack>
            }
            </Container>
        </Page>
    )
}