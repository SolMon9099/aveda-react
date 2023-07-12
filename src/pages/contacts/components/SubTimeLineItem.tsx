import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";
import { Box, Button, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import Iconify from "src/components/Iconify";
import moment from "moment";
import Label from "src/components/Label";
import Markdown from "src/components/Markdown";
import TextMaxLine from "src/components/TextMaxLine";


export default function SubTimeLineItem({srvc, idx} : any){
    const [ hover, setHover ] = useState(false)

    return(
        <TimelineItem 
            key={'SRVCITEM_'+srvc._id+idx} 
            sx={{ minHeight: 45, '&:before': { display: 'none' } }}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}>
            <TimelineSeparator>
                <TimelineDot variant='outlined' color='grey'/>
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                <Stack spacing={1}>
                    <Stack direction='row' spacing={1} alignItems='center'>
                        <Typography variant="subtitle1" fontWeight='500'>
                            {srvc.type}
                        </Typography>
                        <Typography variant="subtitle1" color='text.secondary'>
                            •
                        </Typography>
                        <Typography variant="caption" color='text.secondary'>
                            {srvc.responsible?.name}
                        </Typography>
                        {hover && (
                        <IconButton
                            sx={{
                                width: 22,
                                height: 22,
                                p: 0.5,
                                borderRadius: 1,
                                backgroundColor: (theme) => theme.palette.primary.main,
                                color: (theme) => theme.palette.common.white,
                                '&:hover':{
                                    backgroundColor: (theme) => theme.palette.primary.darker,
                                }
                            }}
                        >
                            <Iconify width={15} height={15} icon='ic:edit'/>
                        </IconButton>
                    )}
                    </Stack>
                    <Markdown children={srvc.description} />
                </Stack>
            </TimelineContent>
        </TimelineItem>
    )
}