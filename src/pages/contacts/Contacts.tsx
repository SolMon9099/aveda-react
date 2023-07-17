import { Box, Button, Card, Container, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import AdevaLoading from "src/components/AdevaLoading";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import TableRox from "src/components/table-rox/TableRox";
import { useSelector } from "src/redux/store";
import useProcess from "./hooks/Contacts.hook";
import { useNavigate } from "react-router-dom";
import { PATH_ERP } from "src/routes/paths";


export default function Contacts(){
    const navigate = useNavigate()
    const { contactHook } = useProcess()
    const { contactList, isLoadingContactList } = useSelector((state) => state.contact)
    
    return(
        <Page title="Contatos">
            <Container maxWidth='lg' sx={{ mt: 3 }}>
                {isLoadingContactList ?
                    <Box flexGrow={1} display='flex' justifyContent='center' sx={{mt: 40}}>
                        <AdevaLoading/>
                    </Box>
                    :
                    <Stack spacing={3}>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <Typography variant='h4'>
                                Contatos
                            </Typography>
                            <Button
                                variant='contained'
                                onClick={() => navigate(PATH_ERP.peopleHandle)}
                            >
                                Novo Contato
                            </Button>
                        </Stack>
                        {contactList.length > 0 ?
                            <TableRox 
                                data={contactList} 
                                header={contactHook.TABLEHEADER} 
                                defaultOrderBy='name' 
                                hasCount 
                                hasSearch 
                                labelCount="Contatos"
                                selectKey="_id"
                                selectType="all"
                                onSelectAllRowFunction={contactHook.onSelectAllRows}
                                onSelectRowFunction={contactHook.onSelectRow}
                                onClickKey='_id'
                                newInfoKey="hasAtualization"
                                onClickFunction={(id) => contactHook.onClickContact(id)}
                                selectActions={
                                    <Tooltip title="Inativar">
                                        <IconButton color="primary" onClick={() => contactHook.handleInactiveContact()}>
                                            <Iconify icon={'fluent-mdl2:block-contact'} />
                                        </IconButton>
                                    </Tooltip>
                                }
                            />
                            :
                            <Card sx={{height: '360px', alignItems: 'center', justifyContent:'center', display: 'flex'}}>
                                <Typography variant="subtitle1" fontWeight={700}>
                                    Não existem contatos cadastrados.
                                </Typography>
                            </Card>
                        }
                    </Stack>
                }
            </Container>
        </Page>
    )
}