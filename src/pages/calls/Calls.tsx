import { IconButton, Box, Button, Container, MenuItem, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TableRox from "src/components/table-rox/TableRox";
import Page from "src/components/Page";
import useCall from "./hooks/Calls.hook";
import { useSelector } from "src/redux/store";
import AdevaLoading from "src/components/AdevaLoading";
import CallModal from "./components/CallModal";
import { PATH_ERP } from "src/routes/paths"

export default function Calls(){
    const { callHook } = useCall()
    const { callList, isLoadingCallList } = useSelector((state) => state.call)
    const navigate = useNavigate()
    
    return(
        <Page title="atendimento">
            <Container maxWidth='lg' sx={{ mt: 3 }}>
            {isLoadingCallList ? (
                <Box flexGrow={1} display='flex' justifyContent='center' sx={{mt: 40}}>
                    <AdevaLoading/>
                </Box>
            ) : (
                <>
                    <Stack spacing={3}>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <Typography variant='h4'>
                                Atendimentos
                            </Typography>
                            <Button
                                onClick={() => navigate(PATH_ERP.callHandle)}
                                variant='contained'
                            >
                                Novo Atendimento
                            </Button>
                        </Stack>
                        
                        <TableRox
                            data={callList}
                            header={callHook.TABLEHEADER}
                            defaultOrderBy='name'
                            // selectType="all"
                            // selectKey="_id"
                            hasCount 
                            hasSearch 
                            hasFilter
                            hasDownloadPdf
                            hasDownloadExcel
                            hasRecord
                            labelCount="Atendimentos"
                            // onSelectAllRowFunction={callHook.onSelectAllRows}
                            // onSelectRowFunction={callHook.onSelectRow}
                            // onClickKey='_id'
                            // titleActions={
                            //     <IconButton
                            //         sx={{
                            //             width: 36,
                            //             height: 36,
                            //             borderRadius: 1,
                            //             backgroundColor: 'lightgray',
                            //             color: (theme) => theme.palette.common.black,
                            //             '&:hover':{
                            //                 backgroundColor: 'darkgray',
                            //             }
                            //         }}
                            //         onClick={(e) => callHook.setOpenPopover(e.currentTarget)}
                            //     >
                            //         <Iconify icon='ic:outline-more-vert'/>
                            //     </IconButton>
                            // }
                            // onClickFunction={(id) => callHook.onClickCall(id)}
                            // newInfoKey="hasAtualization"
                            // selectActions={
                            //     <Tooltip title="Deletar">
                            //         <IconButton color="primary" onClick={() => callHook.handleDeleteProcess()}>
                            //             <Iconify icon={'eva:trash-2-outline'} />
                            //         </IconButton>
                            //     </Tooltip>
                            // }
                            // defaultSelected={activitiesListHook.selectedIds}
                            // disableOnSelect
                            
                        />
                        
                    </Stack>
                </>
            )}
            <CallModal callHook={callHook}/>
            </Container>
            {/* <MenuPopover
                open={Boolean(callHook.openPopover)}
                anchorEl={callHook.openPopover}
                onClose={() => callHook.setOpenPopover(false)}
                sx={{
                '& .MuiMenuItem-root': {
                    px: 1,
                    typography: 'body2',
                    borderRadius: 0.75,
                },
                }}
                disabledArrow
            >
                {callHook.POPOVER_OPTIONS.map((opt: {label: string}) =>
                    <MenuItem
                        key={'OPT_'+opt.label}
                        // onClick={() => navigate(opt.to)}
                    >
                        {opt.label}
                    </MenuItem>
                )}
            </MenuPopover> */}
        </Page>
    )
}