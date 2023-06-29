import { IconButton, Box, Button, Container, MenuItem, Stack, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import Iconify from "src/components/Iconify";
import TableRox from "src/components/table-rox/TableRox";
import MenuPopover from "src/components/MenuPopover";
import Page from "src/components/Page";
import TasksTabs from "./components/TasksTabs";
import useTask from "./hooks/Tasks.hook";
import { useSelector } from "src/redux/store";
import AdevaLoading from "src/components/AdevaLoading";
import TaskModal from "./components/TaskModal";
import TaskKanban from "./components/TaskKanban";

export default function Tasks(){
    const { taskHook } = useTask()
    const { taskList, isLoadingTaskList } = useSelector((state) => state.task)
    
    return(
        <Page title="Atividades">
            <Container maxWidth='lg' sx={{ mt: 3 }}>
            {isLoadingTaskList ? (
                <Box flexGrow={1} display='flex' justifyContent='center' sx={{mt: 40}}>
                    <AdevaLoading/>
                </Box>
            ) : (
                <>
                <Stack spacing={3}>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                        <Typography variant='h4'>
                            Atividades
                        </Typography>
                        <Button
                            onClick={() => taskHook.setOpenModal(true)}
                            variant='contained'
                            // endIcon={<Iconify icon='ic:round-expand-more'/>}
                        >
                            Nova Atividade
                        </Button>
                    </Stack>
                    <TasksTabs taskHook={taskHook}/>
                    {taskHook.currentTab === 1 && (
                        <>
                        <TableRox
                            data={taskList}
                            header={taskHook.TABLEHEADER}
                            defaultOrderBy='name'
                            tableTitle="Lista de Atividades"
                            selectType="all"
                            selectKey="_id"
                            hasCount 
                            hasSearch 
                            hasFilter
                            labelCount="Atividade"
                            onSelectAllRowFunction={taskHook.onSelectAllRows}
                            // onSelectRowFunction={taskHook.onSelectRow}
                            onClickKey='_id'
                            titleActions={
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
                                    onClick={(e) => taskHook.setOpenPopover(e.currentTarget)}
                                >
                                    <Iconify icon='ic:outline-more-vert'/>
                                </IconButton>
                            }
                            onClickFunction={(id) => taskHook.onClickTask(id)}
                            // newInfoKey="hasAtualization"
                            // selectActions={
                            //     <Tooltip title="Deletar">
                            //         <IconButton color="primary" onClick={() => taskHook.handleDeleteProcess()}>
                            //             <Iconify icon={'eva:trash-2-outline'} />
                            //         </IconButton>
                            //     </Tooltip>
                            // }
                            // defaultSelected={activitiesListHook.selectedIds}
                            // disableOnSelect
                            
                        />
                        </>
                    )}
                    {taskHook.currentTab === 2 && (
                        <>
                        <TaskKanban taskHook = {taskHook} taskList={taskList}/>
                        </>
                    )}
                </Stack>
                </>
            )}
            <TaskModal taskHook={taskHook}/>
            </Container>
            <MenuPopover
                open={Boolean(taskHook.openPopover)}
                anchorEl={taskHook.openPopover}
                onClose={() => taskHook.setOpenPopover(false)}
                sx={{
                '& .MuiMenuItem-root': {
                    px: 1,
                    typography: 'body2',
                    borderRadius: 0.75,
                },
                }}
                disabledArrow
            >
                {taskHook.POPOVER_OPTIONS.map((opt: {label: string}) =>
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