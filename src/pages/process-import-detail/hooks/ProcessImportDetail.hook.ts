import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getProcessLotDetail, importProcessFromLot } from "src/redux/slices/processImportList"
import { useDispatch } from "src/redux/store"
import { PATH_ERP } from "src/routes/paths"


const useProcessImportDetail = () => {
    const { enqueueSnackbar } = useSnackbar()
    const [ selectedIds, setSelectedIds ] = useState<any[]>([])
    const { listId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const TABLE_HEADER = [
        {id: 'processNumber', label: 'Número do Processo'},
        {id: 'clientName', label: 'Cliente'},
        {id: 'counterName', label: 'Parte Contrária'},
        {id: 'matter', subId: 'action', label: 'Matéria/Ação'},
    ]

    useEffect(() =>{
        if(listId){
            dispatch(getProcessLotDetail(listId))
        }
    },[dispatch, listId])

    const onSelectRow = (id: string) => {    
        const selectedIndex = selectedIds.indexOf(id);
    
        let newSelected: string[] = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selectedIds, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selectedIds.slice(1));
        } else if (selectedIndex === selectedIds.length - 1) {
          newSelected = newSelected.concat(selectedIds.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selectedIds.slice(0, selectedIndex),
            selectedIds.slice(selectedIndex + 1)
          );
        }
        setSelectedIds(newSelected);
    };

    const onSelectAllRows = (newSelecteds: string[]) => {
        setSelectedIds(newSelecteds)
    };

    const importProcess = async () => {
      await dispatch(importProcessFromLot({processLotImport: listId, ids: selectedIds}))
      navigate(PATH_ERP.process)
      enqueueSnackbar('Processo(s) importado(s) com sucesso')
    }

    const processImportDetailHook: any = {
        TABLE_HEADER,
        onSelectRow,
        onSelectAllRows,
        importProcess,
    }

    return{
        processImportDetailHook
    }
}

export default useProcessImportDetail;