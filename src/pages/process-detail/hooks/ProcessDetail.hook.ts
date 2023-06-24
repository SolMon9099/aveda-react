import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { getProcessDetail } from "src/redux/slices/processDetail"
import { useDispatch } from "src/redux/store"


const useProcessDetail = () => {
    const { processId } = useParams()
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    const [ currentTab, setCurrentTab ] = useState(1)
    const TABS = [
        {label: 'Resumo', value: 1},
        {label: 'Atendimentos', value: 2},
        {label: 'Atividades', value: 3},
        {label: 'Movimentações', value: 4},
        {label: 'Documentos', value: 5}
    ]

    useEffect(() =>{
        if(processId){
            dispatch(getProcessDetail(processId))
        }
    },[dispatch, processId, pathname])


    const processDetailHook: any = {
        TABS,
        currentTab,
        setCurrentTab
    }

    return{
        processDetailHook
    }
}

export default useProcessDetail;