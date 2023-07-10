import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";
import { Box, Button, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import Iconify from "src/components/Iconify";
import Label from "src/components/Label";
import Markdown from "src/components/Markdown";
import TextMaxLine from "src/components/TextMaxLine";


export default function MovimentationItem({mov, idx, caseDetailHook} : any){
    const [ hover, setHover ] = useState(false)

    return(
        <TimelineItem 
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
            key={'MOVITEM_'+mov._id+idx} 
            sx={{ 
                minHeight: 45, 
                '&:before': { display: 'none' }, 
                '&:hover': { backgroundColor: (theme) => theme.palette.action.hover } 
            }}>
            <TimelineSeparator>
                <TimelineDot variant='outlined' color='grey'/>
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                <Stack spacing={1}>
                    <Stack direction='row' spacing={1}>
                        <Typography variant="subtitle2" fontWeight='500'>
                            {mov.type}
                        </Typography>
                        {hover &&
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
                                <Iconify width={15} height={15} icon='ic:baseline-plus'/>
                            </IconButton>
                        }
                    </Stack>
                    {mov.type !== 'Documento' ?
                        <Markdown children={mov.description} />
                        :
                        <Box flexGrow={1}>
                            <Grid container spacing={2}>
                                {mov.documents.map((doc: any) =>
                                    <Grid item xs={12} md={5}>
                                        <Stack 
                                            key={'doc_'+doc._id} 
                                            direction='row' 
                                            spacing={2} 
                                            alignItems='center' 
                                            sx={{
                                                maxWidth: 256,
                                                overflow: 'hidden',
                                                px: 2,
                                                py: 1,
                                                border: '1px solid',
                                                borderRadius: 1,
                                                borderColor: (theme) => theme.palette.grey[500_32],
                                                '&:hover':{
                                                    cursor: 'pointer'
                                                }
                                            }}
                                            onClick={() => window.open(doc.url, '_blank')}
                                        >
                                            <Iconify width={24} height={24} color='secondary.main' icon='mdi:file-document'/>
                                            <TextMaxLine line={1} variant='body2'>
                                                {doc.name}
                                            </TextMaxLine>
                                        </Stack>
                                    </Grid>
                                )}
                                <Grid item xs={12} md={3}>
                                    <Button
                                        onClick={() => caseDetailHook.setCurrentTab(5)}
                                    >
                                        VER TODOS
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                        }
                </Stack>
            </TimelineContent>
        </TimelineItem>
    )
}