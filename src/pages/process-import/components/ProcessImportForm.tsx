import { LoadingButton } from "@mui/lab"
import { Avatar, Box, Button, Card, CardContent, Dialog, DialogContent, DialogTitle, Grid, IconButton, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { FormProvider, RHFSelect } from "src/components/hook-form"
import RHFMaskField from "src/components/hook-form/RHFMaskField"
import Iconify from "src/components/Iconify"
import useAuth from "src/hooks/useAuth"
import { useSelector } from "src/redux/store"
import { PATH_ERP } from "src/routes/paths"
import createAvatar from "src/utils/createAvatar"
import { states } from "src/utils/state"


type Props = {
    processImportHook: any
}

export default function ProcessImportForm({ processImportHook }: Props){
    const { user } = useAuth()
    const navigate = useNavigate()
    const { findedUser } = useSelector((state) => state.processImport)

    return(
        <Card>
            <CardContent>
                <FormProvider methods={processImportHook.methods} onSubmit={processImportHook.handleSubmit(processImportHook.onSubmit)}>
                    <Box flexGrow={1}>
                        <Stack spacing={2}>
                            <Typography variant='h6'>
                                {user?.name.split(' ')[0] + ', importe todos os seus processos em menos de 2 minutos!'}
                            </Typography>
                            <Typography variant='body2'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula imperdiet neque, eu pretium ipsum imperdiet non. Nulla vitae faucibus purus.
                            </Typography>
                        </Stack>
                        <Box mb={3}/>
                        {processImportHook.step === 0 ? 
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <RHFMaskField
                                        mask="999.999"
                                        name='oabNumber'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <RHFSelect
                                        name='sectional'
                                        label='Seccional'
                                    >
                                        {states.map((state) =>
                                            <option value={state} key={state}>
                                                {state}
                                            </option>
                                        )}
                                    </RHFSelect>
                                </Grid>
                            </Grid>
                            :
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={10}>
                                    <Box
                                        sx={{
                                            backgroundColor: (theme) => theme.palette.grey[100],
                                            p: 2,
                                            borderRadius: 1,
                                            border: (theme) => `1px solid ${theme.palette.grey[500_24]}`
                                        }}
                                    >
                                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                            <Stack direction='row' spacing={2} alignItems='center'>
                                                <Avatar
                                                    alt={findedUser?.name}
                                                    color={createAvatar(findedUser?.name || '').color}
                                                >
                                                    {createAvatar(findedUser?.name || '').name}
                                                </Avatar>
                                                <Stack>
                                                    <Typography variant='subtitle1'>
                                                        {findedUser?.name}
                                                    </Typography>
                                                    <Typography variant='body2' color='text.secondary'>
                                                        {findedUser?.oabNumber + ' / ' + findedUser?.sectional}
                                                    </Typography>
                                                    <Typography variant='body2' color='text.secondary'>
                                                        {findedUser?.type}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                            <IconButton
                                                onClick={() => processImportHook.setStep(0)}
                                            >
                                                <Iconify width={12} height={12} icon='ph:x'/>
                                            </IconButton>
                                        </Stack>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <RHFSelect
                                        name="tribunal"
                                        label='Tribunal'
                                    >
                                        {processImportHook.TRIBUNAL_OPTIONS.map((opt: any) =>
                                            <option key={'tribunal'+opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        )}
                                    </RHFSelect>
                                </Grid>
                                <Grid item xs={12}>
                                    <RHFSelect
                                        name="county"
                                        label='Comarca'
                                    >
                                        {processImportHook.COUNTY_OPTIONS.map((opt: any) =>
                                            <option key={'county'+opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        )}
                                    </RHFSelect>
                                </Grid>
                                <Grid item xs={12}>
                                    <RHFSelect
                                        name="situation"
                                        label='Situação'
                                    >
                                        {processImportHook.SITUATION_OPTIONS.map((opt: any) =>
                                            <option key={'situation'+opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        )}
                                    </RHFSelect>
                                </Grid>
                            </Grid>
                        }
                        <Box mb={3}/>
                        
                        <LoadingButton
                            fullWidth
                            loading={processImportHook.isSubmitting}
                            type='submit'
                            variant='contained'
                            size="large"
                            sx={{
                                boxShadow: 'none'
                            }}
                        >
                            {processImportHook.step === 0 ? 'Pesquisar Inscrição' : 'Buscar Processos'}
                        </LoadingButton>
                        <Box mb={3}/>
                    </Box>
                </FormProvider>
            </CardContent>
            <Dialog open={processImportHook.open} maxWidth='sm' fullWidth>
                <DialogTitle>
                    Busca de Processos em andamento!
                </DialogTitle>
                <DialogContent sx={{ mt: 3 }}>
                    <Typography variant='body1'>
                        Usualmente leva alguns minutos para retornar os resultados. 
                        <p/>
                        Acompanhe o status pela tabela dos Lotes de Processos Importados.
                    </Typography>
                    <Stack direction='row' sx={{ mt: 3 }}>
                        <Box flexGrow={1}/>
                        <Button
                            variant='contained'
                            onClick={() => navigate(PATH_ERP.importListProcess)}
                        >
                            Entendido
                        </Button>
                    </Stack> 
                </DialogContent>
            </Dialog>
        </Card>
    )
}