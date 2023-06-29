import { Stack, Box, Typography, Button} from "@mui/material";
import Iconify from "src/components/Iconify";
import Label from "src/components/Label";

export default function TaskKanban({ taskHook, taskList }: any){
    return(
        <Stack direction='row' alignItems='left' justifyContent='space-between'>
            {taskHook.STATUS_OPTIONS.map((status_item: any) => {
                return (
                    <Box
                        sx={{
                            padding:'10px', 
                            mt:2, mr:'1%', width:'32%', 
                            bgcolor:(theme) => (theme.palette.grey[300])
                        }}
                    >
                        <Typography fontWeight={'600'}>{status_item.label}</Typography>
                        {taskList.map((list_item : any) => {
                            if (list_item.status === status_item.label){
                                return (
                                    <Box
                                        sx={{bgcolor:(theme) => (theme.palette.common.white), padding:'10px', marginTop:'20px', borderRadius:'10px', cursor:'pointer'}}
                                        onClick={() => taskHook.onClickTask(list_item._id)}
                                    >
                                        {(list_item.tags && list_item.tags.length > 0) &&
                                            <Stack spacing={1} direction='row'>
                                                {list_item.tags.map((tag: any) =>
                                                    <Label variant="filled" color={tag.color}>
                                                        {tag.title}
                                                    </Label>
                                                )}
                                            </Stack>
                                        }
                                        <Typography variant='subtitle2' fontWeight={'500'}>{list_item.name}</Typography>
                                        <Typography variant='body2' color='text.secondary'>{list_item.sub_name}</Typography>
                                        <br/>
                                        <div style={{display:'flex', justifyContent:'space-between'}}>
                                            <Typography variant='body2' color='text.secondary'>{list_item.date}</Typography>
                                            <Label>FV</Label>
                                        </div>
                                    </Box>
                                )
                            }
                        })}
                        <br/>
                        <div style={{textAlign:'center'}}>
                            <Button
                                style={{color:'#212B36'}}
                                variant='text'
                                startIcon={
                                    <Iconify width={18} height={18} icon='ic:baseline-plus'/>
                                }
                                onClick={() => taskHook.setOpenModal(true)}
                            >
                                Adicionar Tarefa
                            </Button>
                        </div>
                    </Box>
                )
            })}
        </Stack>
    )
}