import { Box, Button, Container, IconButton, MenuItem, Stack, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdevaLoading from "src/components/AdevaLoading";
import Iconify from "src/components/Iconify";
import MenuPopover from "src/components/MenuPopover";
import Page from "src/components/Page";
import TableRox from "src/components/table-rox/TableRox";
import { useSelector } from "src/redux/store";
import useProcess from "./hooks/Contacts.hook";


export default function Contacts(){
    const { contactHook } = useProcess()
    const navigate = useNavigate()
    const { conactList, isLoadingContactList } = useSelector((state) => state.contact)
    
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
                                // onClick={(e) => contactHook.setOpenPopover(e.currentTarget)}
                                variant='contained'
                                // endIcon={<Iconify icon='ic:round-expand-more'/>}
                            >
                                Novo
                            </Button>
                        </Stack>
                        <TableRox 
                            data={conactList} 
                            header={contactHook.TABLEHEADER} 
                            defaultOrderBy='title' 
                            hasCount 
                            hasSearch 
                            labelCount="Contatos"
                            selectKey="_id"
                            selectType="all"
                            onSelectAllRowFunction={contactHook.onSelectAllRows}
                            onSelectRowFunction={contactHook.onSelectRow}
                            onClickKey='_id'
                            newInfoKey="hasAtualization"
                            onClickFunction={(id) => contactHook.onClickProcess(id)}
                            selectActions={
                                <Tooltip title="Deletar">
                                    <IconButton color="primary" onClick={() => contactHook.handleDeleteProcess()}>
                                        <Iconify icon={'eva:trash-2-outline'} />
                                    </IconButton>
                                </Tooltip>
                            }
                        />
                    </Stack>
                }
            </Container>

            <MenuPopover
                open={Boolean(contactHook.openPopover)}
                anchorEl={contactHook.openPopover}
                onClose={() => contactHook.setOpenPopover(null)}
                sx={{
                  '& .MuiMenuItem-root': {
                    px: 1,
                    typography: 'body2',
                    borderRadius: 0.75,
                  },
                }}
                disabledArrow
            >
                {contactHook.POPOVER_OPTIONS.map((opt: {to: string, label: string}) =>
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