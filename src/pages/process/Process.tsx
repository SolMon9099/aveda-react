import { Box, Button, Container, IconButton, MenuItem, Stack, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdevaLoading from "src/components/AdevaLoading";
import Iconify from "src/components/Iconify";
import MenuPopover from "src/components/MenuPopover";
import Page from "src/components/Page";
import TableRox from "src/components/table-rox/TableRox";
import { useSelector } from "src/redux/store";
import useProcess from "./hooks/Process.hook";


export default function Process(){
    const { processHook } = useProcess()
    const navigate = useNavigate()
    const { processList, isLoadingProcessList } = useSelector((state) => state.process)
    
    return(
        <Page title="Processos e Casos">
            <Container maxWidth='lg' sx={{ mt: 3 }}>
                {isLoadingProcessList ?
                    <Box flexGrow={1} display='flex' justifyContent='center' sx={{mt: 40}}>
                        <AdevaLoading/>
                    </Box>
                    :
                    <Stack spacing={3}>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <Typography variant='h4'>
                                Processos e Casos
                            </Typography>
                            <Button
                                onClick={(e) => processHook.setOpenPopover(e.currentTarget)}
                                variant='contained'
                                endIcon={<Iconify icon='ic:round-expand-more'/>}
                            >
                                Novo
                            </Button>
                        </Stack>
                        <TableRox 
                            data={processList} 
                            header={processHook.TABLEHEADER} 
                            defaultOrderBy='title' 
                            hasCount 
                            hasSearch 
                            labelCount="Processos"
                            selectKey="_id"
                            selectType="all"
                            onSelectAllRowFunction={processHook.onSelectAllRows}
                            onSelectRowFunction={processHook.onSelectRow}
                            onClickKey='_id'
                            newInfoKey="hasAtualization"
                            onClickFunction={(id) => processHook.onClickProcess(id)}
                            selectActions={
                                <Tooltip title="Deletar">
                                    <IconButton color="primary" onClick={() => processHook.handleDeleteProcess()}>
                                        <Iconify icon={'eva:trash-2-outline'} />
                                    </IconButton>
                                </Tooltip>
                            }
                        />
                    </Stack>
                }
            </Container>

            <MenuPopover
                open={Boolean(processHook.openPopover)}
                anchorEl={processHook.openPopover}
                onClose={() => processHook.setOpenPopover(null)}
                sx={{
                  '& .MuiMenuItem-root': {
                    px: 1,
                    typography: 'body2',
                    borderRadius: 0.75,
                  },
                }}
                disabledArrow
            >
                {processHook.POPOVER_OPTIONS.map((opt: {to: string, label: string}) =>
                    <MenuItem
                        key={'OPT_'+opt.to}
                        onClick={() => navigate(opt.to)}
                    >
                        {opt.label}
                    </MenuItem>
                )}
            </MenuPopover>
        </Page>
    )
}