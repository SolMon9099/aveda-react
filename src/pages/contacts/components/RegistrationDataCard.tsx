import { Card, CardContent, Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Iconify from "src/components/Iconify";
import { ADDRESSTYPE_OPTIONS, BANK_OPTIONS, GENDER_OPTIONS, MATRIALSTATUS_OPTIONS, NATIONALITY_OPTIONS, PIXTYPE_OPTIONS } from "src/pages/contacts-handle/hooks/ContactsHandle.hook";
import { useSelector } from "src/redux/store";
import { PATH_ERP } from "src/routes/paths";
import { statesFull } from "src/utils/state";



export default function RegistrationDataCard(){
    const { contact } = useSelector((state) => state.contact)
    const navigate = useNavigate()

    const line = (name: string, value?: string ) =>{
        if(value){
            return(
                <Grid container>
                    <Grid item xs={3}>
                        <Typography variant="body2" color='text.secondary'>
                            {name}
                        </Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="body2">
                            {value}
                        </Typography>
                    </Grid>
                </Grid>
            )
        }
    }

    return(
        <Card>
            <CardContent>
                <Stack spacing={4}>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant='h6'>
                            Dados Cadastrais
                        </Typography>
                        <IconButton
                            sx={{
                                width: 36,
                                height: 36,
                                p: 0.5,
                                borderRadius: 1,
                                backgroundColor: (theme) => theme.palette.grey[300],
                                color: (theme) => theme.palette.common.black,
                                '&:hover':{
                                    backgroundColor: (theme) => theme.palette.grey[500],
                                }
                            }}
                            onClick={() => navigate(PATH_ERP.peopleHandle + '/' + contact?._id)}
                        >
                            <Iconify width={17} height={17} icon='ic:edit'/>
                        </IconButton>
                    </Stack>
                    {(
                      (contact?.type === 'physical' && (contact?.name || contact?.birthDate || contact?.gender)) ||
                      (contact?.type === 'legal' && (contact?.companyName || contact?.companyFantasyName))
                     ) &&
                        <Stack spacing={2}>
                            <Typography variant='subtitle1' fontWeight={500}>
                                Cadastro
                            </Typography>
                            <Divider/>
                            {contact?.type === 'physical' ?
                                <>
                                    {line('Nome completo', contact?.name)}
                                    {line('Data de Nascimento', moment(contact?.birthDate).format('DD/MM/YYYY'))}
                                    {line('Sexo', GENDER_OPTIONS.find((v) => v.value === contact?.gender)?.label)}
                                </>
                                :
                                <>
                                    {line('Razão social', contact?.companyName)}
                                    {line('Nome fantasia', contact?.companyFantasyName)}
                                </>
                            }
                        </Stack>
                    }
                    {(
                      (contact?.type === 'physical' && (contact?.nationality || contact?.nationalityCity || contact?.maritalStatus || contact?.motherName || contact?.fatherName))
                     ) &&
                        <Stack spacing={2}>
                            <Typography variant='subtitle1' fontWeight={500}>
                                Dados Complementares
                            </Typography>
                            <Divider/>
                            <>
                                {line('Nacionalidade', NATIONALITY_OPTIONS.find((v) => v.value === contact?.nationality)?.label)}
                                {line('Naturalidade (Cidade / Estado)', contact?.nationalityCity)}
                                {line('Estado civil', MATRIALSTATUS_OPTIONS.find((v) => v.value === contact?.maritalStatus)?.label)}
                                {line('Nome da mãe', contact?.motherName)}
                                {line('Nome da pai', contact?.fatherName)}
                            </>
                        </Stack>
                    }
                    {(
                      (contact?.type === 'physical' && (
                                                        contact?.documentsCPF || 
                                                        contact?.documentsRG || 
                                                        contact?.documentsCTPS ||
                                                        contact?.documentsPIS ||
                                                        contact?.documentsVoterRegistration ||
                                                        contact?.documentsCNH ||
                                                        contact?.documentsPassport ||
                                                        contact?.documentsReservistCertificate
                                                    )) ||
                      (contact?.type === 'legal' && (contact?.documentsCNPJ || contact?.documentsStateRegistration))
                     ) &&
                        <Stack spacing={2}>
                            <Typography variant='subtitle1' fontWeight={500}>
                                Documentos
                            </Typography>
                            <Divider/>
                            {contact?.type === 'physical' ?
                                <>
                                    {line('CPF', contact?.documentsCPF)}
                                    {line('RG', contact?.documentsRG)}
                                    {line('CTPS', contact?.documentsCTPS)}
                                    {line('PIS', contact?.documentsPIS)}
                                    {line('Título de eleitor', contact?.documentsVoterRegistration)}
                                    {line('CNH', contact?.documentsCNH)}
                                    {line('Passaporte', contact?.documentsPassport)}
                                    {line('Certidão de reservista', contact?.documentsReservistCertificate)}
                                </>
                                :
                                <>
                                    {line('CNPJ', contact?.documentsCNPJ)}
                                    {line('Inscrição estadual', contact?.documentsStateRegistration)}
                                </>
                            }
                        </Stack>
                    }
                    {(
                      (contact?.contactCellPhone || contact?.contactPhone || contact?.contactEmail || contact?.contactSite)
                     ) &&
                        <Stack spacing={2}>
                            <Typography variant='subtitle1' fontWeight={500}>
                                Contatos
                            </Typography>
                            <Divider/>
                            <>
                                {line('Celular', contact?.contactCellPhone)}
                                {line('Telefone Fixo', contact?.contactPhone)}
                                {line('Email', contact?.contactEmail)}
                                {line('Site', contact?.contactSite)}
                            </>
                        </Stack>
                    }
                    {(
                      (contact?.addressType || contact?.addressCEP || contact?.addressStreet || contact?.addressNumber || contact?.addressComplement || 
                       contact?.addressNeighborhood || contact?.addressCity || contact?.addressState)
                     ) &&
                        <Stack spacing={2}>
                            <Typography variant='subtitle1' fontWeight={500}>
                                Endereço
                            </Typography>
                            <Divider/>
                            <>
                                {line('Tipo', ADDRESSTYPE_OPTIONS.find((v) => v.value === contact?.addressType)?.label)}
                                {line('CEP', contact?.addressCEP)}
                                {line('Logradouro', contact?.addressStreet)}
                                {line('Número', contact?.addressNumber)}
                                {line('Complemento', contact?.addressComplement)}
                                {line('Bairro', contact?.addressNeighborhood)}
                                {line('Cidade', contact?.addressCity)}
                                {line('Estado',  statesFull.find((v) => v.value === contact?.addressState)?.label)}
                            </>
                        </Stack>
                    }
                    {(contact?.type === 'physical' &&
                      (contact?.companyName || contact?.office )
                     ) &&
                        <Stack spacing={2}>
                            <Typography variant='subtitle1' fontWeight={500}>
                                Empresa
                            </Typography>
                            <Divider/>
                            <>
                                {line('Razão social', contact?.companyName)}
                                {line('Cargo', contact?.office)}
                            </>
                        </Stack>
                    }
                    {(contact?.type === 'legal' &&
                      (contact?.name || contact?.office )
                     ) &&
                        <Stack spacing={2}>
                            <Typography variant='subtitle1' fontWeight={500}>
                                Responsável
                            </Typography>
                            <Divider/>
                            <>
                                {line('Nome do responsável', contact?.name)}
                                {line('Cargo', contact?.office)}
                            </>
                        </Stack>
                    }
                    {(
                      (contact?.bank || contact?.agency || contact?.account || contact?.pixType || contact?.pixKey)
                     ) &&
                        <Stack spacing={2}>
                            <Typography variant='subtitle1' fontWeight={500}>
                                Informações Bancárias
                            </Typography>
                            <Divider/>
                            <>
                                {line('Banco', BANK_OPTIONS.find((v) => v.value === contact?.bank)?.label)}
                                {line('Agência', contact?.agency)}
                                {line('Conta', contact?.account)}
                                {line('PIX', PIXTYPE_OPTIONS.find((v) => v.value === contact?.pixType)?.label)}
                                {line('Chave PIX', contact?.pixKey)}
                            </>
                        </Stack>
                    }
                    {(
                      (contact?.observations)
                     ) &&
                        <Stack spacing={2}>
                            <Typography variant='subtitle1' fontWeight={500}>
                                Observações
                            </Typography>
                            <Divider/>
                            <>
                                {line('Observações', contact?.observations)}
                            </>
                        </Stack>
                    }
                </Stack>
            </CardContent>
        </Card>
    )
}