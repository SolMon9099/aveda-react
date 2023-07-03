import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { getProcessDetail } from "src/redux/slices/processDetail"
import { useDispatch } from "src/redux/store"


const useContactDetail = () => {
    const { contactId } = useParams()
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    const [ currentTab, setCurrentTab ] = useState(1)
    const TABS = [
        {label: 'Dados Cadastrais', value: 1, },
        {label: 'Processos e Casos', value: 2},
        {label: 'Atividades', value: 3},
        {label: 'Atendimentos', value: 4},
        {label: 'Extrato', value: 5},
        {label: 'Documentos', value: 6}
    ]

    useEffect(() =>{
        if(contactId){
            dispatch(getProcessDetail(contactId))
        }
    },[dispatch, contactId, pathname])


    const processDetailHook: any = {
        TABS,
        currentTab,
        setCurrentTab
    }

    return{
        processDetailHook
    }
}

export default useContactDetail;