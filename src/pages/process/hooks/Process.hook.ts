import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProcessList, inactiveProcess } from "src/redux/slices/process";
import { useDispatch, useSelector } from "src/redux/store";
import { PATH_ERP } from "src/routes/paths";

const useProcess = () => {
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { processList } = useSelector((state) => state.process)
    const [ openPopover, setOpenPopover ] = useState(null)
    const [ selectedIds, setSelectedIds ] = useState<string[]>([])
    const POPOVER_OPTIONS = [
        {label: 'Caso', to: PATH_ERP.handleCase},
        {label: 'Processo', to: PATH_ERP.handleProcess},
        {label: 'Importar Processos', to: PATH_ERP.importProcess},
        {label: 'Lista de Importações', to: PATH_ERP.importListProcess},
    ]
    const TABLEHEADER = [
        {id: 'title', subId: 'subtitle', tagsId: 'tags', label: 'Título'},
        {id: 'clientName', subId: 'folder', label: 'Cliente/Pasta'},
        {id: 'action', subId: 'foro', label: 'Ação/Foro'},
        {id: 'lastChange', label: 'Ult. Mov.', align: 'left'},
    ]

    useEffect(() =>{
        dispatch(getProcessList())
    },[dispatch])

    const handleDeleteProcess = async () => {
      await dispatch(inactiveProcess(selectedIds))
      enqueueSnackbar('Processos/Casos deletados com sucesso')
      dispatch(getProcessList())
    }

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

    const onClickProcess = (id: string) => {
      var process = processList.find((p) => p._id === id)
      if(process){
        navigate(process.type === 'case' ? `${PATH_ERP.case}/${id}` : `${PATH_ERP.process}/${id}`)
      }
    }

    const processHook: any = {
        openPopover,
        POPOVER_OPTIONS,
        TABLEHEADER,
        setOpenPopover,
        handleDeleteProcess,
        onSelectRow,
        onSelectAllRows,
        onClickProcess
    }

    return{
        processHook
    }
}

export default useProcess;