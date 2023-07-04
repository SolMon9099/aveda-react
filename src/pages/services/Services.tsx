import { IconButton, Box, Button, Container, MenuItem, Stack, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import Iconify from "src/components/Iconify";
import TableRox from "src/components/table-rox/TableRox";
import MenuPopover from "src/components/MenuPopover";
import Page from "src/components/Page";
// import TasksTabs from "./components/TasksTabs";
import useService from "./hooks/Services.hook";
import { useSelector } from "src/redux/store";
import AdevaLoading from "src/components/AdevaLoading";
import ServiceModal from "./components/ServiceModal";
// import TaskKanban from "./components/TaskKanban";

export default function Services(){
    const { serviceHook } = useService()
    const { serviceList, isLoadingServiceList } = useSelector((state) => state.service)
    
    return(
        <Page title="atendimento">
            <Container maxWidth='lg' sx={{ mt: 3 }}>
            {isLoadingServiceList ? (
                <Box flexGrow={1} display='flex' justifyContent='center' sx={{mt: 40}}>
                    <AdevaLoading/>
                </Box>
            ) : (
                <>
                    <Stack spacing={3}>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <Typography variant='h4'>
                                atendimento
                            </Typography>
                            <Button
                                onClick={() => serviceHook.setOpenModal(true)}
                                variant='contained'
                                // endIcon={<Iconify icon='ic:round-expand-more'/>}
                            >
                                Novo Atendimento
                            </Button>
                        </Stack>
                        
                        <TableRox
                            data={serviceList}
                            header={serviceHook.TABLEHEADER}
                            defaultOrderBy='name'
                            selectType="all"
                            selectKey="_id"
                            hasCount 
                            hasSearch 
                            hasFilter
                            hasDownloadPdf
                            hasDownloadExcel
                            labelCount="Atendimentos"
                            onSelectAllRowFunction={serviceHook.onSelectAllRows}
                            // onSelectRowFunction={serviceHook.onSelectRow}
                            onClickKey='_id'
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
                            //         onClick={(e) => serviceHook.setOpenPopover(e.currentTarget)}
                            //     >
                            //         <Iconify icon='ic:outline-more-vert'/>
                            //     </IconButton>
                            // }
                            onClickFunction={(id) => serviceHook.onClickService(id)}
                            // newInfoKey="hasAtualization"
                            // selectActions={
                            //     <Tooltip title="Deletar">
                            //         <IconButton color="primary" onClick={() => serviceHook.handleDeleteProcess()}>
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
            <ServiceModal serviceHook={serviceHook}/>
            </Container>
            <MenuPopover
                open={Boolean(serviceHook.openPopover)}
                anchorEl={serviceHook.openPopover}
                onClose={() => serviceHook.setOpenPopover(false)}
                sx={{
                '& .MuiMenuItem-root': {
                    px: 1,
                    typography: 'body2',
                    borderRadius: 0.75,
                },
                }}
                disabledArrow
            >
                {serviceHook.POPOVER_OPTIONS.map((opt: {label: string}) =>
                    <MenuItem
                        key={'OPT_'+opt.label}
                        // onClick={() => navigate(opt.to)}
                    >
                        {opt.label}
                    </MenuItem>
                )}
            </MenuPopover>
        </Page>
    )
}