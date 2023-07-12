import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";
import { Box, Button, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import Iconify from "src/components/Iconify";
import moment from "moment";
import Label from "src/components/Label";
import Markdown from "src/components/Markdown";
import TextMaxLine from "src/components/TextMaxLine";


export default function MovimentationItem({key, idx, processDetailHook} : any){
    const [ hover, setHover ] = useState(false)

    return(
        <TimelineItem
            sx={{ minHeight: 45, '&:before':{ display: 'none'} }}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
        >
            <TimelineSeparator>
                <TimelineDot color='primary'/>
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                <Stack direction='row' spacing={1} alignItems='center'>
                    <Typography variant="subtitle2" fontWeight='500'>
                        {key}
                    </Typography>
                    <Typography variant="subtitle1" color='text.secondary'>
                        •
                    </Typography>
                    <Typography variant="body2" color='text.secondary'>
                        {moment(key, 'DD/MM/YYYY').fromNow()}
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
                            onClick={() => console.log('Nao sei o q fazer')}
                        >
                            <Iconify width={15} height={15} icon='ic:edit'/>
                        </IconButton>
                    )}
                </Stack>
            </TimelineContent>
        </TimelineItem>
    )
}