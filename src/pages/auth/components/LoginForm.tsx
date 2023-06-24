import { LoadingButton } from "@mui/lab";
import { Alert, Button, Stack, Typography } from "@mui/material";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import RHFPasswordField from "src/components/hook-form/RHFPasswordField";
import useLogin from "../hooks/Login.hook";


export default function LoginForm(){
    const { loginHook } = useLogin()

    return(
        <FormProvider methods={loginHook.methods} onSubmit={loginHook.handleSubmit(loginHook.onSubmit)}>
            <Stack spacing={5}>
                {!!loginHook.errors.afterSubmit && <Alert severity="error">{loginHook.errors.afterSubmit.message}</Alert>}
                <Stack spacing={3}>
                    <RHFTextField
                        name='email'
                        label='E-mail'
                    />

                    <RHFPasswordField
                        name='password'
                        label='Senha'
                    />
                </Stack>

                <Stack direction={'row-reverse'}>

                    <Typography
                        sx={{'&:hover':{cursor:'pointer'}}}
                        variant='subtitle2'
                        color='primary'
                        fontWeight={'500'}
                        onClick={() => loginHook.handleGoToReset()}
                    >
                        Esqueceu a senha?
                    </Typography>

                </Stack>

                <Stack spacing={3}>
                    <LoadingButton
                        type='submit'
                        loading={loginHook.isSubmitting}
                        fullWidth
                        variant='contained'
                    >
                        Acessar
                    </LoadingButton>

                    <Button
                        onClick={() => loginHook.handleGoToRegister()}
                    >
                        Criar Conta
                    </Button>



                </Stack>
            </Stack>
            
        </FormProvider>
    )
}