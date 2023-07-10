import { LoadingButton } from "@mui/lab";
import { Chip } from "@mui/material";
import { Box, Dialog, DialogContent, Grid, IconButton, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { FormProvider, RHFSelect, RHFTextField } from "src/components/hook-form";
import RHFAutoComplete from "src/components/hook-form/RHFAutoComplete";
import Iconify from "src/components/Iconify";
import Label from "src/components/Label";

import SearchTermForm from './SearchTermForm'
import { useNavigate } from "react-router";
import { PATH_ERP } from "src/routes/paths"
import UpdateLogCard from "./UpdateLogCard";

export default function SearchTermHandle({ searchTermHook } : any){
    const navigate = useNavigate();
    return(
        <>
            <Stack direction='row' alignItems='center' spacing={3} justifyContent={'space-between'} mb={3}>
                <Stack direction={'row'}>
                    <IconButton color="primary" onClick={() => searchTermHook.setCurrentPage('list')}>
                        <Iconify icon='material-symbols:arrow-back'/>
                    </IconButton>
                    <Typography variant='h4'>
                        {'Editar Pesquisa em Diários Oficiais'}
                    </Typography>
                </Stack>
            </Stack>
            <Grid container direction={'row'} md={12} justifyContent={'space-between'}>
                <Grid md={7.5} spacing={3} mb={3}>
                    <SearchTermForm searchTermHook={searchTermHook} />
                </Grid>
                <Grid md={4} spacing={3}>
                    <UpdateLogCard searchTermHook={searchTermHook} />
                </Grid>
            </Grid>
            
        </>
    )
}