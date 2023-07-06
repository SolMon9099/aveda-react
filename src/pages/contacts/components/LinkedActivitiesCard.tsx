import { Card, Stack, Box, Typography, IconButton, Button, alpha } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import Iconify from "src/components/Iconify";
import Label from "src/components/Label";
import { useSelector } from "src/redux/store";

export default function LinkedActivitiesCard({processDetailHook, activitiesListHook, type} : any){
    const { process } = useSelector((state) => state.processDetail)
    const [ activitiesToMap, setActivitiesToMap ] = useState<any>([])

    useEffect(() =>{
        if(type === 'movimentation'){
            setActivitiesToMap(process?.movimentationLinkedActivities)
        }else{
            setActivitiesToMap(process?.serviceLinkedActivities)
        }
    },[type, process])

    return(
        <Card>
            <Box sx={{ height: 8,bgcolor: (theme) => theme.palette.secondary.main, top: 0 }}/>
            <Stack spacing={3} sx={{pt: 2, pl: 3, pr:3, pb: 3}}>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography variant="h6">
                        Atividades Vinculadas
                    </Typography>
                    <IconButton
                        sx={{
                            width: 24,
                            height: 24,
                            p: 0.5,
                            borderRadius: 1,
                            backgroundColor: (theme) => theme.palette.grey[300],
                            color: (theme) => theme.palette.common.black,
                            '&:hover':{
                                backgroundColor: (theme) => theme.palette.grey[500],
                            }
                        }}
                        onClick={() => {activitiesListHook.setOpenModal(true)}}
                    >
                        <Iconify width={18} height={18} icon='ic:baseline-plus'/>
                    </IconButton>
                </Stack>
                <Stack spacing={2}>
                    {activitiesToMap.map((act: any) =>
                        <Stack key={'ACT_'+act._id} direction='row' spacing={2}>
                            <Box
                                width={22}
                                height={22}
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                sx={{
                                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                                    borderRadius: 0.5
                                }}  
                            >
                                <Iconify color='primary.main' icon={act.type === 'task' ? 'gg:check-o' : 'mdi:calendar-check'}/>
                            </Box>
                            <Stack>
                                <Typography variant="subtitle2" fontWeight='500'>
                                    {act.name}
                                </Typography>
                                <Typography variant="caption" color='text.secondary'>
                                    {(act.date && act.hour) ? 
                                        moment(act.date).format('llll').split('às')[0] + ' • ' + act.hour 
                                        : 
                                        act.date ? 
                                        moment(act.date).format('llll').split('às')[0] 
                                        :
                                        act.hour
                                    }
                                </Typography>
                                <Stack direction='row' spacing={1}>
                                    {act.tags.map((tag: any) =>
                                        <Label variant="filled" color={tag.color as any}>
                                            {tag.title}
                                        </Label>
                                    )}
                                </Stack>
                            </Stack>
                        </Stack>
                    )}
                    <Stack direction='row'>
                        <Button
                            onClick={() => processDetailHook.setCurrentTab(3)}
                        >
                            Ver Todas
                        </Button>
                        <Box flexGrow={1}/>
                    </Stack>  
                </Stack>
            </Stack>
        </Card>
    )
}