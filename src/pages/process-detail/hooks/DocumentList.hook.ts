import { useSnackbar } from "notistack"
import { useState } from "react"
import { inactiveDocument } from "src/redux/slices/processDocument"
import { useDispatch } from "src/redux/store"

const useDocumentList = () => {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()
    const [ selectedIds, setSelectedIds ] = useState<any[]>([])
    const TABLEHEADER = [
      {id: 'name', subId: 'description', label: 'Nome do Documento', icon:'mdi:file-document'},
      // {id: 'from.responsible.name', label: 'Origem'},
      {id: 'category.label', label: 'Categoria'},
      {id: 'createdAt', label: 'Data'},
    ]

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

  const handleDeleteDocument = async () =>{
    await dispatch(inactiveDocument(selectedIds))
    enqueueSnackbar('Documento(s) deletado(s) com sucesso')
    window.location.reload()
  }


  const documentListHook: any = {
      TABLEHEADER,
      selectedIds,
      onSelectRow,
      onSelectAllRows,
      handleDeleteDocument
  }

  return{
      documentListHook
  }
}

export default useDocumentList;