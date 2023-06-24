import { LoadingButton } from "@mui/lab";
import { Alert, Button, Dialog, DialogContent, IconButton, Stack, Typography } from "@mui/material";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import Iconify from 'src/components/Iconify'
import useResetEmail from 'src/pages/reset/hooks/ResetEmail.hook'
import { openResetModal } from 'src/redux/slices/reset'
import { dispatch, useSelector } from 'src/redux/store'


export default function ResetForm(){
    const { resetEmailHook } = useResetEmail()
    const { openModal } = useSelector((state) => state.reset)

    return(
        <FormProvider methods={resetEmailHook.methods} onSubmit={resetEmailHook.handleSubmit(resetEmailHook.onSubmitEmail)}>
            
            {openModal && 
          <Dialog
                  fullWidth
                  maxWidth='sm'
                  open={openModal}
                  onClose={() => dispatch(openResetModal((false)))}
              >
                <DialogContent>
                <Stack spacing={2}>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                        <Typography variant='h6'>
                            Recuperação recebida!
                        </Typography>
                        <IconButton
                            onClick={() => dispatch(openResetModal((false)))}
                            >
                            <Iconify icon='ph:x'/>
                        </IconButton>
                          </Stack>
                        <Typography variant='body1'>
                        Foi enviado um link para a recuperação de senha para o seu email.
                        </Typography>
                          <Stack   direction="row"
                          justifyContent="flex-end"
                          alignItems="center"
                          spacing={2}>
                            <Button variant="contained" sx={{color:"#FFFFFF"}} onClick={() =>{ 
                                dispatch(openResetModal((false)))}}>Fechar</Button>
                          </Stack>
                    </Stack>
                </DialogContent>
              </Dialog>
        }

            <Stack spacing={5}>
                {!!resetEmailHook.errors.afterSubmit && <Alert severity="error">{resetEmailHook.errors.afterSubmit.message}</Alert>}
                <Stack spacing={3}>
                    <RHFTextField
                        name='email'
                        label='E-mail'
                    />
                </Stack>

                <Stack spacing={3}>
                    <LoadingButton
                        type='submit'
                        loading={resetEmailHook.isSubmitting}
                        fullWidth
                        variant='contained'
                    >
                        Recuperar
                    </LoadingButton>

                    <Button
                        onClick={() => resetEmailHook.handleGoToLogin()}
                    >
                        Fazer Login
                    </Button>
                </Stack>
            </Stack>
            
        </FormProvider>
    )
}