import { Box, Card, Container, Stack, Typography } from "@mui/material";
import RHFPasswordField from 'src/components/hook-form/RHFPasswordField'
import Page from "src/components/Page";
import { FormProvider } from "src/components/hook-form";
import useReset from './hooks/Reset.hook'
import { LoadingButton } from "@mui/lab";

export default function ResetPassword(){
    const { resetHook } = useReset()

  return(
    <Page title="Restaurar Senha">
      <FormProvider methods={resetHook.methods} onSubmit={resetHook.handleSubmit(resetHook.onSubmit)}>
      <Container maxWidth='sm' sx={{ mt: 3 }}>
        <Card sx={{padding:'16px'}}>
          <Typography variant='h5'>
            Restaurar senha
          </Typography>
          <Box mt={2}/>
          <Stack spacing={2}>
            <RHFPasswordField
              name='password'
              label='Senha'
              />
            <RHFPasswordField
              name='confirm'
              label='Confirmar senha'
              />
            <LoadingButton
              type='submit'
              loading={resetHook.isSubmitting}
              fullWidth
              variant='contained'
            >
              Alterar Senha
            </LoadingButton>
          </Stack>
        </Card>
      </Container>
      </FormProvider>
    </Page>
  )
}