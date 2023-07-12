import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";
import { Box, Card, CardContent, IconButton, InputAdornment, Stack, TextField, Typography, Grid } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Iconify from "src/components/Iconify";
import Label from "src/components/Label";
import { useSelector } from "src/redux/store";
import { PATH_ERP } from "src/routes/paths";
import MovimentationItem from "./MovimentationItem";
import { useEffect, useState } from "react";


export default function MovimentationList({processDetailHook}: any){
    const [ filter, setFilter ] = useState('')
    const [ filtered, setFiltered ] = useState<any>({})
    const { process } = useSelector((state) => state.processDetail)
    const navigate = useNavigate()

    useEffect(() =>{
        var lowerCaseFilter = filter.toLowerCase()
        var filteredAux: any = {}
        Object.keys(process?.movimentationGrouped).forEach((k) =>{
            var arrayAux: any[] = [];
            process?.movimentationGrouped[k].forEach((m: any) =>{
                if(
                    m.type?.toLowerCase().includes(lowerCaseFilter) ||
                    m.tags.find((t: any) => t.title.toLowerCase().includes(lowerCaseFilter)) ||
                    m.description?.toLowerCase().includes(lowerCaseFilter) ||
                    m.status?.toLowerCase().includes(lowerCaseFilter)
                ){
                    arrayAux.push(m)
                }
            })
            if(arrayAux.length > 0){
                filteredAux[k] = arrayAux;
            }
        })
        setFiltered(filteredAux)
    },[filter, process])

    return(
        <Card>
            <CardContent>
                <Stack spacing={3}>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                        <Stack direction='row' spacing={1} alignItems='center'>
                            <Typography variant='h6'>
                                {processDetailHook.currentTab === 4 ? 'Publicações' : 'Andamento Processual'}
                            </Typography>
                            {/* {process?.imported &&
                                <Iconify width={18} height={18} color='grey.400' icon='material-symbols:rss-feed'/>
                            } */}
                        </Stack>
                        <Stack direction="row">
                            <IconButton
                                sx={{
                                    width: 30,
                                    height: 30,
                                    marginRight: 2,
                                    p: 0.5,
                                    borderRadius: 1,
                                    backgroundColor: (theme) => theme.palette.grey[300],
                                    color: (theme) => theme.palette.common.black,
                                    '&:hover':{
                                        backgroundColor: (theme) => theme.palette.grey[500],
                                    }
                                }}
                                onClick={() => navigate(PATH_ERP.processMovimentation + '/' + process?._id + '/' + 'doc')}
                            >
                                <Iconify width={18} height={18} icon='mdi:file-download-outline'/>
                            </IconButton>
                            <IconButton
                                sx={{
                                    width: 30,
                                    height: 30,
                                    p: 0.5,
                                    borderRadius: 1,
                                    backgroundColor: (theme) => theme.palette.grey[300],
                                    color: (theme) => theme.palette.common.black,
                                    '&:hover':{
                                        backgroundColor: (theme) => theme.palette.grey[500],
                                    }
                                }}
                                onClick={() => navigate(PATH_ERP.processMovimentation + '/' + process?._id)}
                            >
                                <Iconify width={18} height={18} icon='ic:baseline-plus'/>
                            </IconButton>
                        </Stack>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Box
                            px={2}
                            py={1}
                            display='flex'
                            borderRadius={1}
                            sx={{
                                backgroundColor: (theme) => theme.palette.warning.lighter
                            }}
                        >
                            <Stack spacing={2} direction='row'>
                                <Typography variant="subtitle1" fontWeight={500} color='warning.darker'>
                                    {process?.movimentationsPendindgToday}
                                </Typography>
                                <Typography variant="body2" color='warning.darker'>
                                    Pendentes (hoje)
                                </Typography>
                            </Stack>
                        </Box>
                        <Box
                            px={2}
                            py={1}
                            display='flex'
                            borderRadius={1}
                            sx={{
                                backgroundColor: (theme) => theme.palette.error.lighter
                            }}
                        >
                            <Stack spacing={2} direction='row'>
                                <Typography variant="subtitle1" fontWeight={500} color='error.darker'>
                                    {process?.movimentationsPendindgAll}
                                </Typography>
                                <Typography variant="body2" color='error.darker'>
                                    Pendentes (todo período)
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>
                    <Stack direction={'row'} spacing={2}>
                        <Grid md={12} justifyContent={'space-between'} display={'flex'}>
                            <Grid md={10}>
                                <TextField
                                    sx={{
                                        mr: 3,
                                        width: '100%'
                                    }}
                                    size='small'
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    InputProps={{
                                        startAdornment:(
                                            <InputAdornment position="start">
                                                <Iconify icon='ri:search-line' width={18} height={18}/>
                                            </InputAdornment>
                                        )
                                    }}
                                    placeholder='Pesquisar...'
                                />
                            </Grid>
                            <Grid md={2}>
                                <Label 
                                    sx={{
                                        height: 40,
                                        float: 'right'
                                    }}
                                    variant="filled"
                                    color='default'
                                    endIcon = {<FilterListIcon/>}
                                >
                                    Filtrar
                                </Label>
                            </Grid>
                        </Grid>
                    </Stack>
                    {/* @ts-ignore */}
                    <Timeline>
                        {Object.keys(filtered).map((key: any) =>
                            <div key={key}>
                                <TimelineItem sx={{ minHeight: 45, '&:before':{ display: 'none'} }}>
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
                                        </Stack>
                                    </TimelineContent>
                                </TimelineItem>
                                {filtered[key].map((mov: any, idx: number) =>
                                    <MovimentationItem mov={mov} idx={idx} processDetailHook={processDetailHook}/>
                                )}
                            </div>
                        )}
                    </Timeline>
                </Stack>
            </CardContent>
        </Card>
    )
}