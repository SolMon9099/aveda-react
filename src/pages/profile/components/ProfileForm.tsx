import { LoadingButton } from "@mui/lab";
import { Alert, Stack } from "@mui/material";
import { FormProvider, RHFSelect, RHFTextField, RHFUploadAvatar } from "src/components/hook-form";
import { states } from "src/utils/state";
import useProfile from "../hooks/Profile.hook";
import RHFOAB from "src/components/hook-form/RHFOAB";


export default function ProfileForm(){
    const { profileHook } = useProfile()

    return(
        <FormProvider methods={profileHook.methods} onSubmit={profileHook.handleSubmit(profileHook.onSubmit)}>
            <Stack spacing={5}>
                {!!profileHook.errors.afterSubmit && <Alert severity="error">{profileHook.errors.afterSubmit.message}</Alert>}
                <RHFUploadAvatar
                    name="photo"
                    onDrop={profileHook.handleDrop}
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
                </Stack>
                <Stack spacing={3}>
                    <LoadingButton
                        type='submit'
                        loading={profileHook.isSubmitting}
                        fullWidth
                        variant='contained'
                    >
                        Salvar Alterações
                    </LoadingButton>
                </Stack>
            </Stack>
        </FormProvider>
    )
}