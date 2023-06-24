import { useEffect } from "react"
import { getProcessLotList } from "src/redux/slices/processImportList"
import { useDispatch } from "src/redux/store"


const useProcessImportList = () => {
    const dispatch = useDispatch()
    const TABLE_HEADER = [
        {id: 'tribunal', subId: 'county' ,label: 'Tribunal/Comarca'},
        {id: 'lawyerName', subId: 'lawyerDesc' ,label: 'Advogado'},
        {id: 'searchDate', label: 'Pesquisa'},
        {id: 'processTotal', label: 'Processos'},
        {id: 'status', label: 'Status', type: 'label'},
    ]

    useEffect(() =>{
        dispatch(getProcessLotList())
    },[dispatch])

    const processImportListHook: any = {
        TABLE_HEADER,
    }

    return{
        processImportListHook
    }
}

export default useProcessImportList;