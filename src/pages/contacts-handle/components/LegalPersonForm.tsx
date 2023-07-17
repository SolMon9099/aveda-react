import { Box, Grid, MenuItem, Stack, Typography } from "@mui/material"
import { RHFSelect, RHFTextField } from "src/components/hook-form"
import RHFMaskField from "src/components/hook-form/RHFMaskField"
import { statesFull } from "src/utils/state"

type Props = {
    contactsHandleHook: any
}

export default function LegalPersonForm({ contactsHandleHook }: Props){
    return(
            <Box flexGrow={1}>
                {contactsHandleHook.formTab === 'cadastro' ? 
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <RHFSelect
                                SelectProps={{native: false}}
                                name='classification'
                                label='Classificação'
                            >
                                {contactsHandleHook.CLASSIFICATION_OPTIONS.map((opt: any) =>
                                    <MenuItem value={opt.value}>
                                        <Stack direction='row' spacing={1} alignItems='center'>
                                            <Box height={10} width={10} display={'flex'} borderRadius={'50%'} sx={{backgroundColor: opt.color}} /> 
                                            <Typography>
                                                {opt.label}
                                            </Typography>
                                        </Stack>
                                    </MenuItem>
                                )}
                            </RHFSelect>
                        </Grid>
                        <Grid item xs={6}>
                            <Box flexGrow={1}/>
                        </Grid>
                        <Grid item xs={12}>
                            <RHFTextField
                                name='companyName'
                                label='Razão Social'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <RHFTextField
                                name='companyFantasyName'
                                label='Nome Fantasia'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='h6'>
                                Documentos
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <RHFMaskField
                                name='documentsCNPJ'
                                label='CNPJ'
                                mask='99.999.999/9999-99'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFMaskField
                                name='documentsStateRegistration'
                                label='Inscrição Estadual'
                                mask='999999999999'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='h6'>
                                Contatos
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <RHFMaskField
                                name='contactCellPhone'
                                label='Celular'
                                mask="(99) 99999-9999"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFMaskField
                                name='contactPhone'
                                label='Telefone Fixo'
                                mask="(99) 9999-9999"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFTextField
                                name='contactEmail'
                                label='Email'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFTextField
                                name='contactSite'
                                label='Site'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='h6'>
                                Endereço
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <RHFSelect
                                name='addressType'
                                label='Tipo'
                            >
                                {contactsHandleHook.ADDRESSTYPE_OPTIONS.map((opt: any) =>
                                    <option value={opt.value}>
                                        {opt.label}
                                    </option>
                                )}
                            </RHFSelect>
                        </Grid>
                        <Grid item xs={6}>
                            <RHFMaskField
                                name='addressCEP'
                                label='CEP'
                                mask="99999-999"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFTextField
                                name='addressStreet'
                                label='Logradouro'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFTextField
                                name='addressNumber'
                                label='Número'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFTextField
                                name='addressComplement'
                                label='Complemento'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFTextField
                                name='addressNeighborhood'
                                label='Bairro'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFTextField
                                name='addressCity'
                                label='Cidade'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFSelect
                                name='addressState'
                                label='Estado'
                            >
                                {statesFull.map((opt: any) =>
                                    <option value={opt.value}>
                                        {opt.label}
                                    </option>
                                )}
                            </RHFSelect>
                        </Grid>
                    </Grid>
                    :
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h6'>
                                Responsável
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <RHFTextField
                                name='name'
                                label='Nome do Responsável'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFTextField
                                name='office'
                                label='Cargo'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Box flexGrow={1}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='h6'>
                                Informações Bancárias
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <RHFSelect
                                name='bank'
                                label='Banco'
                            >
                                {contactsHandleHook.BANK_OPTIONS.map((opt: any) =>
                                    <option value={opt.value}>
                                        {opt.label}
                                    </option>
                                )}
                            </RHFSelect>
                        </Grid>
                        <Grid item xs={6}>
                            <RHFTextField
                                type='number'
                                name='agency'
                                label='Agência'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFTextField
                                type='number'
                                name='account'
                                label='Conta'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFSelect
                                name='pixType'
                                label='PIX'
                            >
                                {contactsHandleHook.PIXTYPE_OPTIONS.map((opt: any) =>
                                    <option value={opt.value}>
                                        {opt.label}
                                    </option>
                                )}
                            </RHFSelect>
                        </Grid>
                        <Grid item xs={6}>
                            {(['cpf','cnpj','cellphone'].includes(contactsHandleHook.values.pixType)) ?
                                <RHFMaskField
                                    name='pixKey'
                                    label='Chave PIX'
                                    mask={contactsHandleHook.values.pixType === 'cpf' ? "999.999.999-99" : contactsHandleHook.values.pixType === 'cellphone' ? "(99) 99999-9999" : "99.999.999/9999-99"}
                                />
                                :
                                <RHFTextField
                                    name='pixKey'
                                    label='Chave PIX'
                                />
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='h6'>
                                Observações
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <RHFTextField
                                multiline
                                rows={3}
                                name='observations'
                                label='Observações'
                            />
                        </Grid>
                    </Grid>
                }
            </Box>
    )
}