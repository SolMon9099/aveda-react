import { IconButton, Box, Button, Container, MenuItem, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TableRox from "src/components/table-rox/TableRox";
import Iconify from "src/components/Iconify";
import { useSelector } from "src/redux/store";
import AdevaLoading from "src/components/AdevaLoading";
import { PATH_ERP } from "src/routes/paths"

export default function SearchTermList({searchTermHook}: any){
    const { searchTermList, isLoadingSearchTermList } = useSelector((state) => state.searchTerm)
    const navigate = useNavigate()
    
    return(
        <Stack>
            {isLoadingSearchTermList ? (
                <Box flexGrow={1} display='flex' justifyContent='center'>
                    <AdevaLoading/>
                </Box>
            ) : (
                <>
                    <Stack direction='row' alignItems='center' spacing={3} justifyContent={'space-between'}>
                        <Stack direction={'row'}>
                            <IconButton color="primary" onClick={() => navigate((PATH_ERP.movimentatiosn))}>
                                <Iconify icon='material-symbols:arrow-back'/>
                            </IconButton>
                            <Typography variant='h4'>
                                {'Termos Pesquisados'}
                            </Typography>
                        </Stack>
                        <Stack>
                            <Button
                                onClick={() => navigate((PATH_ERP.handleMoviSearch))}
                                variant='contained'
                            >
                                Nova Pesquisa
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack spacing={3} mt={3}>
                        <TableRox
                            data={searchTermList}
                            header={searchTermHook.TABLEHEADER}
                            onClickKey="_id"
                            onClickFunction={(id) => {searchTermHook.onClickItem(id, searchTermList)}}
                            defaultOrderBy='name'
                        />
                    </Stack>
                </>
            )}
        </Stack>
    )
}