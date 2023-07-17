import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PATH_ERP } from 'src/routes/paths';
import { useDispatch, useSelector } from 'src/redux/store';
import { useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { newContactSchema } from 'src/@types/contact';
import { createOrUpdateContact, getContactToEdit, resetContactToEdit } from 'src/redux/slices/contactsHandle';
import moment from 'moment';

export const CLASSIFICATION_OPTIONS = [
    {value: '', label: '', color: ''},
    {value: 'client', label: 'Cliente', color: '#DFE3E8'},
    {value: 'part', label: 'Parte Contrária', color: '#FFBD98'},
    {value: 'lead', label: 'Lead', color: '#00AAEC'},
]

export const GENDER_OPTIONS = [
    {value: '', label: '', color: ''},
    {value: 'male', label: 'Masculino'},
    {value: 'female', label: 'Feminino'},
]
export const ADDRESSTYPE_OPTIONS = [
    {value: '', label: '', color: ''},
    {value: 'home', label: 'Residencial'},
    {value: 'work', label: 'Comercial'},
]
export const NATIONALITY_OPTIONS = [
    {value: '', label: '', color: ''},
    {value: 'brazil', label: 'Brasileiro'},
    {value: 'foreigner', label: 'Estrangeiro'},
]
export const MATRIALSTATUS_OPTIONS = [
    {value: '', label: '', color: ''},
    {value: 'maried', label: 'Casado(a)'},
    {value: 'single', label: 'Solteiro(a)'},
]
export const BANK_OPTIONS = [
    {value: '', label: '', color: ''},
    {value: 'itau', label: 'Itaú'},
    {value: 'bradesco', label: 'Bradesco'},
]
export const PIXTYPE_OPTIONS = [
    {value: '', label: '', color: ''},
    {value: 'cellphone', label: 'Número de Celular'},
    {value: 'cpf', label: 'CPF'},
    {value: 'cnpj', label: 'CNPJ'},
    {value: 'email', label: 'Email'},
    {value: 'random', label: 'Chave Aleatória'},
]
export const NEWFIELD_OPTIONS = [
    {value: '1', label: 'Campo 1', mask: '999.999'},
    {value: '2', label: 'Campo 2', mask: '99.9.99.9'},
]

const useContactsHandle = () => {
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { contactId } = useParams()
    const { contactToEdit } = useSelector((state) => state.contactsHandle)
    const [ personType, setPersonType ] = useState('physical')
    const [ formTab, setFormTab ] = useState('cadastro')
    const [ openField, setOpenField ] = useState(false)
    const [ newFieldType, setNewFieldType ] = useState('1')
    const [ newFieldValue, setNewFieldValue ] = useState('')
    const [ extraFields, setExtraFields ] = useState<any[]>([])
    const PERSON_TYPES = [
        {value: 'physical', label: 'Pessoa Fisíca'},
        {value: 'legal', label: 'Pessoa Jurídica'},
    ]
    const FORM_TABS = [
        {value: 'cadastro', label: 'Cadastro'},
        {value: 'complemento', label: 'Dados Complementares'},
    ]

    useEffect(() =>{
        if(contactId){
            dispatch(getContactToEdit(contactId))
        }else{
            dispatch(resetContactToEdit())
        }
    },[dispatch, contactId, pathname])

    useEffect(() =>{
        if(contactToEdit){
            setPersonType(contactToEdit.type)
        }
    },[contactToEdit])

    const defaultValues = useMemo(() => ({
        classification: contactToEdit?.classification || '',
        name: contactToEdit?.name || '',
        office: contactToEdit?.office || '',
        companyName: contactToEdit?.companyName || '',
        companyFantasyName: contactToEdit?.companyFantasyName || '',
        birthDate: moment(contactToEdit?.birthDate).format('YYYY-MM-DD') || '',
        gender: contactToEdit?.gender || '',
        observations: contactToEdit?.observations || '',
        // --- DOCUMENTOS ---
        // Fisica
        documentsCPF: contactToEdit?.documentsCPF || '',
        documentsRG: contactToEdit?.documentsRG || '',
        documentsCTPS: contactToEdit?.documentsCTPS || '',
        documentsPIS: contactToEdit?.documentsPIS || '',
        documentsVoterRegistration: contactToEdit?.documentsVoterRegistration || '',
        documentsCNH: contactToEdit?.documentsCNH || '',
        documentsPassport: contactToEdit?.documentsPassport || '',
        documentsReservistCertificate: contactToEdit?.documentsReservistCertificate || '',
        // Juridica
        documentsCNPJ: contactToEdit?.documentsCNPJ || '',
        documentsStateRegistration: contactToEdit?.documentsStateRegistration || '',
        // --- CONTATOS ---
        contactCellPhone: contactToEdit?.contactCellPhone || '',
        contactPhone: contactToEdit?.contactPhone || '',
        contactEmail: contactToEdit?.contactEmail || '',
        contactSite: contactToEdit?.contactSite || '',
        // --- ENDEREÇO ---
        addressType: contactToEdit?.addressType || '',
        addressCEP: contactToEdit?.addressCEP || '',
        addressStreet: contactToEdit?.addressStreet || '',
        addressNumber: contactToEdit?.addressNumber || '',
        addressComplement: contactToEdit?.addressComplement || '',
        addressNeighborhood: contactToEdit?.addressNeighborhood || '',
        addressCity: contactToEdit?.addressCity || '',
        addressState: contactToEdit?.addressState || '',
        // --- COMPLEMENTO ---
        // Fisica
        nationality: contactToEdit?.nationality || '',
        nationalityCity: contactToEdit?.nationalityCity || '',
        maritalStatus: contactToEdit?.maritalStatus || '',
        motherName: contactToEdit?.motherName || '',
        fatherName: contactToEdit?.fatherName || '',
        // --- DADOS BANCÁRIOS ---
        bank: contactToEdit?.bank || '',
        agency: contactToEdit?.agency || '',
        account: contactToEdit?.account || '',
        pixType: contactToEdit?.pixType || '',
        pixKey: contactToEdit?.pixKey || '',
    }),[contactToEdit]);

    const NewCaseSchema = Yup.object().shape({
        classification: Yup.string().required('Campo obrigatório!'),
        name: Yup.string().required('Campo obrigatório!'),
        office: Yup.string().required('Campo obrigatório!'),
        companyName: Yup.string().required('Campo obrigatório!'),
        companyFantasyName: Yup.string().required('Campo obrigatório!'),
        birthDate: Yup.string().required('Campo obrigatório!'),
        gender: Yup.string().required('Campo obrigatório!'),
        observations: Yup.string().required('Campo obrigatório!'),
        // --- DOCUMENTOS ---
        // Fisica
        documentsCPF: Yup.string().required('Campo obrigatório!'),
        documentsRG: Yup.string().required('Campo obrigatório!'),
        documentsCTPS: Yup.string().required('Campo obrigatório!'),
        documentsPIS: Yup.string().required('Campo obrigatório!'),
        documentsVoterRegistration: Yup.string().required('Campo obrigatório!'),
        documentsCNH: Yup.string().required('Campo obrigatório!'),
        documentsPassport: Yup.string().required('Campo obrigatório!'),
        documentsReservistCertificate: Yup.string().required('Campo obrigatório!'),
        // Juridica
        documentsCNPJ: Yup.string().required('Campo obrigatório!'),
        documentsStateRegistration: Yup.string().required('Campo obrigatório!'),
        // --- CONTATOS ---
        contactCellPhone: Yup.string().required('Campo obrigatório!'),
        contactPhone: Yup.string().required('Campo obrigatório!'),
        contactEmail: Yup.string().required('Campo obrigatório!'),
        contactSite: Yup.string().required('Campo obrigatório!'),
        // --- ENDEREÇO ---
        addressType: Yup.string().required('Campo obrigatório!'),
        addressCEP: Yup.string().required('Campo obrigatório!'),
        addressStreet: Yup.string().required('Campo obrigatório!'),
        addressNumber: Yup.string().required('Campo obrigatório!'),
        addressComplement: Yup.string().required('Campo obrigatório!'),
        addressNeighborhood: Yup.string().required('Campo obrigatório!'),
        addressCity: Yup.string().required('Campo obrigatório!'),
        addressState: Yup.string().required('Campo obrigatório!'),
        // --- COMPLEMENTO ---
        // Fisica
        nationality: Yup.string().required('Campo obrigatório!'),
        nationalityCity: Yup.string().required('Campo obrigatório!'),
        maritalStatus: Yup.string().required('Campo obrigatório!'),
        motherName: Yup.string().required('Campo obrigatório!'),
        fatherName: Yup.string().required('Campo obrigatório!'),
        // --- DADOS BANCÁRIOS ---
        bank: Yup.string().required('Campo obrigatório!'),
        agency: Yup.string().required('Campo obrigatório!'),
        account: Yup.string().required('Campo obrigatório!'),
        pixType: Yup.string().required('Campo obrigatório!'),
        pixKey: Yup.string().required('Campo obrigatório!'),
    });

    const methods = useForm<newContactSchema>({
        resolver: yupResolver(NewCaseSchema),
        defaultValues,
    });
    
    const {
        watch,
        handleSubmit,
        reset,
        formState: { isSubmitting }
    } = methods;

    const values = watch()

    useEffect(() => {
        const resetAsync = async () =>{
            if (!!contactId && contactToEdit) {
                reset(defaultValues);
            }else
            if (!contactId) {
                reset(defaultValues);
            }
        }
        resetAsync()
    }, [contactId, contactToEdit, reset, defaultValues]);

    useEffect(() =>{
        if(values){
            reset(values)
        }
    },[formTab, personType])


    const onSubmit = async (data: newContactSchema) => {
        try{
            data.type = personType;
            if(!!contactId){
                data._id = contactId;
                await dispatch(createOrUpdateContact(data))
                navigate(PATH_ERP.people+'/'+contactId)
                enqueueSnackbar('Contato atualizado com sucesso!')
            }else{
                await dispatch(createOrUpdateContact(data))
                navigate(PATH_ERP.people)
                enqueueSnackbar('Contato cadastrado com sucesso!')
            }
            reset();
        }catch(e){
            console.log(e)
        }
    };

    const onCancel = () => {
        navigate(PATH_ERP.people)
    }

    const onChangePersonType = (v: string) => {
        setPersonType(v);
        setFormTab('cadastro');
    }

    const onOpenField = () => {
        setOpenField(true)
        setNewFieldType('1')
        setNewFieldValue('')
    }

    const onCloseField = () => {
        setOpenField(false)
        setNewFieldType('1')
        setNewFieldValue('')
    }

    const handleAddField = () => {
        const aux = [...extraFields]
        aux.push({
            value: newFieldValue,
            mask: NEWFIELD_OPTIONS.find((n) => n.value === newFieldType)?.mask,
            label: NEWFIELD_OPTIONS.find((n) => n.value === newFieldType)?.label,
        })
        setExtraFields(aux)
        setOpenField(false)
        setNewFieldType('1')
        setNewFieldValue('')
    }

    const handleChangeFieldValue = (v: string, idx: number) => {
        const aux = [...extraFields]
        aux[idx].value = v;
        setExtraFields(aux)
    }

    const contactsHandleHook: any = {
        isEdit: !!contactId,
        contactId,
        methods,
        values,
        isSubmitting,
        personType,
        formTab,
        openField,
        newFieldType,
        newFieldValue,
        extraFields,
        PERSON_TYPES,
        FORM_TABS,
        CLASSIFICATION_OPTIONS,
        GENDER_OPTIONS,
        ADDRESSTYPE_OPTIONS,
        NATIONALITY_OPTIONS,
        MATRIALSTATUS_OPTIONS,
        BANK_OPTIONS,
        PIXTYPE_OPTIONS,
        NEWFIELD_OPTIONS,
        handleChangeFieldValue,
        onChangePersonType,
        setFormTab,
        onSubmit,
        onCancel,
        handleSubmit,
        onOpenField,
        onCloseField,
        setNewFieldType,
        setNewFieldValue,
        handleAddField
    }

    return{
        contactsHandleHook
    }
}

export default useContactsHandle;