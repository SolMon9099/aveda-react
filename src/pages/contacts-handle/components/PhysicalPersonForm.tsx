import { Box, Button, Grid, MenuItem, Stack, Typography, TextField } from "@mui/material"
import Iconify from "src/components/Iconify"
import { RHFSelect, RHFTextField } from "src/components/hook-form"
import RHFMaskField from "src/components/hook-form/RHFMaskField"
import { statesFull } from "src/utils/state"
import NewFieldModal from "./NewFieldModal"
import InputMask from 'react-input-mask';

type Props = {
    contactsHandleHook: any
}

export default function PhysicalPersonForm({ contactsHandleHook }: Props){
    return(
            <Box flexGrow={1}>
                <NewFieldModal contactsHandleHook={contactsHandleHook}/>
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
                                name='name'
                                label='Nome Completo'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFTextField
                                type='date'
                                name='birthDate'
                                label='Data de Nascimento'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFSelect
                                name='gender'
                                label='Sexo'
                            >
                                {contactsHandleHook.GENDER_OPTIONS.map((opt: any) =>
                                    <option value={opt.value}>
                                        {opt.label}
                                    </option>
                                )}
                            </RHFSelect>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='h6'>
                                Documentos
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <RHFMaskField
                                name='documentsCPF'
                                label='CPF'
                                mask="999.999.999-99"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFTextField
                                name='documentsRG'
                                label='RG'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFMaskField
                                name='documentsCTPS'
                                label='CTPS'
                                mask="999.99999.99-9"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFMaskField
                                name='documentsPIS'
                                label='PIS'
                                mask="999.99999.99-9"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFMaskField
                                name='documentsVoterRegistration'
                                label='Título de Eleitor'
                                mask="9999 9999 9999"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFMaskField
                                name='documentsCNH'
                                label='CNH'
                                mask="9999999999"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFMaskField
                                name='documentsPassport'
                                label='Passaporte'
                                mask="aa999999"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFMaskField
                                name='documentsReservistCertificate'
                                label='Certidão Reservista'
                                mask="999999999999"
                            />
                        </Grid>
                        {contactsHandleHook.extraFields.map((field: any, idx: number) =>
                            <Grid item xs={6}>
                                <InputMask  onChange={(v) => contactsHandleHook.handleChangeFieldValue(v.target.value, idx)} value={field.value} maskChar="" mask={field.mask}>
                                    {// @ts-ignore
                                    (inputProps: TextFieldProps) => <TextField label={field.label} {...inputProps} fullWidth />}
                                </InputMask>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Stack direction='row'>
                                <Button
                                    variant='text'
                                    startIcon={
                                        <Iconify width={18} height={18} icon='ic:baseline-plus'/>
                                    }
                                    onClick={contactsHandleHook.onOpenField}
                                >
                                    Novo Campo
                                </Button>
                                <Box flexGrow={1}/>
                            </Stack>
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
                        <Grid item xs={6}>
                            <RHFSelect
                                name='nationality'
                                label='Nacionalidade'
                            >
                                {contactsHandleHook.NATIONALITY_OPTIONS.map((opt: any) =>
                                    <option value={opt.value}>
                                        {opt.label}
                                    </option>
                                )}
                            </RHFSelect>
                        </Grid>
                        <Grid item xs={6}>
                            <RHFTextField
                                name='nationalityCity'
                                label='Naturalidade (Cidade / Estado)'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFSelect
                                name='maritalStatus'
                                label='Estado Civil'
                            >
                                {contactsHandleHook.MATRIALSTATUS_OPTIONS.map((opt: any) =>
                                    <option value={opt.value}>
                                        {opt.label}
                                    </option>
                                )}
                            </RHFSelect>
                        </Grid>
                        <Grid item xs={6}>
                            <Box flexGrow={1}/>
                        </Grid>
                        <Grid item xs={12}>
                            <RHFTextField
                                name='motherName'
                                label='Nome da Mãe'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <RHFTextField
                                name='fatherName'
                                label='Nome do Pai'
                            />
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
                                Empresa
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <RHFTextField
                                name='companyName'
                                label='Razão Social'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFTextField
                                name='office'
                                label='Cargo'
                            />
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