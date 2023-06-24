import { LoadingButton } from "@mui/lab";
import { Alert, Button, Stack } from "@mui/material";
import { FormProvider, RHFSelect, RHFTextField, RHFUploadAvatar } from "src/components/hook-form";
import RHFPasswordField from "src/components/hook-form/RHFPasswordField";
import { states } from "src/utils/state";
import useRegister from "../hooks/Register.hook";
import RHFOAB from "src/components/hook-form/RHFOAB";


export default function RegisterForm(){
    const { registerHook } = useRegister();

    return(
        <FormProvider methods={registerHook.methods} onSubmit={registerHook.handleSubmit(registerHook.onSubmit)}>
            <Stack spacing={5}>
                {!!registerHook.errors.afterSubmit && <Alert severity="error">{registerHook.errors.afterSubmit.message}</Alert>}
                <RHFUploadAvatar
                    name="photo"
                    onDrop={registerHook.handleDrop}
                />
                <RHFTextField
                    name='description'
                    label='Descritivo Pessoal'
                    withCount
                    multiline
                    rows={3}
                />
                <Stack spacing={3}>
                    <RHFTextField
                        name='name'
                        label='Nome Completo'
                    />
                    <Stack direction='row' spacing={2}>
                        <RHFOAB
                            name='oabNumber'
                            label='Número da OAB'
                            mask="999.999"
                        />
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
                    </Stack>
                    <RHFTextField
                        name='email'
                        label='E-mail'
                    />
                    <RHFPasswordField
                        name='password'
                        label='Senha'
                    />
                </Stack>
                <Stack spacing={3}>
                    <LoadingButton
                        type='submit'
                        loading={registerHook.isSubmitting}
                        fullWidth
                        variant='contained'
                    >
                        Criar Conta
                    </LoadingButton>
                    <Button
                        onClick={() => registerHook.handleGoToLogin()}
                    >
                        Fazer Login
                    </Button>
                </Stack>
            </Stack>
        </FormProvider>
    )
}