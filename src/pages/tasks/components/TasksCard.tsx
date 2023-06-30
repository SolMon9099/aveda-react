import { Box, Paper, Stack, Typography } from '@mui/material';
// import moment from 'moment';
import { Draggable } from 'react-beautiful-dnd';
import { taskType } from 'src/@types/task';
// import Iconify from 'src/components/Iconify';
import Label from "src/components/Label";

type Props = {
    task: taskType,
    taskIdx: number,
    TasksHook: any
}

export default function TasksCard({ task, taskIdx, TasksHook }: Props){
    return(
        <Draggable draggableId={task._id} index={taskIdx}>
            {(provided) => (
                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <Paper
                        onClick={() => TasksHook.onClickTask(task._id)}
                        sx={{
                            px: 2,
                            width: 1,
                            position: 'relative',
                            boxShadow: (theme) => theme.customShadows.z1,
                            '&:hover': {
                                boxShadow: (theme) => theme.customShadows.z16,
                            },
                        }}
                    >
                        <Box sx={{ cursor: 'pointer', py: 3, }}>
                            {(task.tags && task.tags.length > 0) &&
                                <Stack spacing={1} direction='row'>
                                    {task.tags.map((tag: any) =>
                                        <Label variant="filled" color={tag.color}>
                                            {tag.title}
                                        </Label>
                                    )}
                                </Stack>
                            }
                            <Typography variant='subtitle2' fontWeight={'500'}>{task.name}</Typography>
                            <Typography variant='body2' color='text.secondary'>{task.sub_name}</Typography>
                            <br/>
                            <div style={{display:'flex', justifyContent:'space-between'}}>
                                <Typography variant='body2' color='text.secondary'>{task.date}</Typography>
                                <Label>FV</Label>
                            </div>
                        </Box>
                    </Paper>
                </div>
            )}
        </Draggable>
    )
}