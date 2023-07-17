import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { getProcessDetail } from "src/redux/slices/processDetail";
import { getContactById } from "src/redux/slices/contact";
import { useDispatch } from "src/redux/store"
import { PATH_ERP } from "src/routes/paths";


const useContactDetail = () => {
    const { contactId } = useParams()
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    const [ currentTab, setCurrentTab ] = useState(1)
    const [openPopover, setOpenPopover] = useState(null)
    const TABS = [
        {label: 'Dados Cadastrais', value: 1, },
        {label: 'Processos e Casos', value: 2},
        {label: 'Atividades', value: 3},
        {label: 'Atendimentos', value: 4},
        {label: 'Extrato', value: 5},
        {label: 'Documentos', value: 6}
    ]
    const POPOVER_OPTIONS = [
        {label: 'Editar Atendimento', to: PATH_ERP.handleCase},
        {label: 'Transformar em Caso', to: PATH_ERP.handleCase},
        {label: 'Transformar em Processo', to: PATH_ERP.HandleCallProcess},
        {label: 'Encerrar Atendimento', to: PATH_ERP.importListProcess},
        {label: 'Excluir Atendimento', to: PATH_ERP.importListProcess},
    ]

    useEffect(() =>{
        if(contactId){
            dispatch(getProcessDetail(contactId))
            dispatch(getContactById(contactId))
        }
    },[dispatch, contactId, pathname])


    const contactDetailHook: any = {
        TABS,
        POPOVER_OPTIONS,
        currentTab,
        openPopover,
        setCurrentTab,
        setOpenPopover,
    }

    return{
        contactDetailHook
    }
}

export default useContactDetail;