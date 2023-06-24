import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { getCaseDetail } from "src/redux/slices/caseDetail"
import { useDispatch } from "src/redux/store"


const useCaseDetail = () => {
    const { caseId } = useParams()
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    const [ currentTab, setCurrentTab ] = useState(1)
    const TABS = [
        {label: 'Resumo', value: 1},
        {label: 'Atendimentos', value: 2},
        {label: 'Atividades', value: 3},
        {label: 'Documentos', value: 4}
    ]

    useEffect(() =>{
        if(caseId){
            dispatch(getCaseDetail(caseId))
        }
    },[dispatch, caseId, pathname])


    const caseDetailHook: any = {
        TABS,
        currentTab,
        setCurrentTab
    }

    return{
        caseDetailHook
    }
}

export default useCaseDetail;