import { Stack, Box, Typography, Button, Grid, Paper} from "@mui/material";
import { DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import Iconify from "src/components/Iconify";
import TasksCard from './TasksCard';

export default function TaskKanban({ taskHook, taskList }: any){
    return(
        <>
        <DragDropContext onDragEnd={taskHook.onDragEnd}>
            <Droppable droppableId="all-columns" direction="horizontal" type="column">
                {(provided) => (
                    <Stack
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        direction="row"
                        alignItems="flex-start"
                        spacing={3}
                        sx={{ height: 'calc(100% - 32px)', overflowY: 'hidden' }}
                    >
                        <Grid container spacing={3} sx={{ overflow: 'hidden', minWidth: 840 }}>
                            {taskHook.STATUS_OPTIONS.map((status_item: any, idx: number) =>
                                <Grid item xs={4} key={status_item.label}>
                                    <Draggable isDragDisabled draggableId={status_item.label} index={idx}>
                                        {(provided) => (
                                            <Paper
                                                {...provided.draggableProps}
                                                ref={provided.innerRef}
                                                variant="outlined"
                                                sx={{ px: 2, bgcolor: 'grey.5008' }}
                                            >
                                                <Stack spacing={3}  {...provided.dragHandleProps}>
                                                    <Stack direction='row' px={2} pt={3} alignItems='center' spacing={1.5}>
                                                        <Box
                                                            display='flex'
                                                            width={12}
                                                            height={12}
                                                            borderRadius='50%'
                                                        />
                                                        <Typography variant='h6'>
                                                            {status_item.label}
                                                        </Typography>
                                                    </Stack>
                                                    <Droppable droppableId={status_item.label} type="task">
                                                        {(provided) => (
                                                            <Stack ref={provided.innerRef} {...provided.droppableProps} spacing={2}>
                                                                {taskList.map((list_item : any, idx: number) => {
                                                                    if (list_item.status === status_item.label){
                                                                        return(
                                                                            <TasksCard TasksHook={taskHook} task={list_item} taskIdx={idx} key={list_item._id}/>
                                                                        )
                                                                    }
                                                                })}
                                                                {provided.placeholder}
                                                            </Stack>
                                                        )}
                                                    </Droppable>
                                                    <Stack spacing={2} sx={{ pb: 3 }}>
                                                        <Button
                                                            fullWidth
                                                            size="large"
                                                            color="inherit"
                                                            startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
                                                            sx={{ fontSize: 14 }}
                                                            onClick={() => taskHook.setOpenModal(true)}
                                                        >
                                                            Adicionar Tarefa
                                                        </Button>
                                                    </Stack>
                                                </Stack>
                                            </Paper>
                                        )}
                                    </Draggable>
                                </Grid>
                            )}
                        </Grid>
                        {provided.placeholder}
                    </Stack>
                )}
            </Droppable>
        </DragDropContext>
        </>
    )
}