import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getContactList, inactiveContact } from "src/redux/slices/contact";
import { useDispatch } from "src/redux/store";
import { PATH_ERP } from "src/routes/paths";

const useProcess = () => {
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ selectedIds, setSelectedIds ] = useState<string[]>([])
    const TABLEHEADER = [
        {id: 'name', subId: 'subName', label: 'Nome'},
        {id: 'classification', label: 'Classificação', type: 'coloredTag' },
        {id: 'status', label: 'Status', type: 'coloredTag'},
    ]

    useEffect(() =>{
        dispatch(getContactList())
    },[dispatch])

    const handleInactiveContact = async () => {
      await dispatch(inactiveContact(selectedIds))
      enqueueSnackbar('Contatos inativados com sucesso!')
      dispatch(getContactList())
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

    const onClickContact = (id: string) => {
      navigate(`${PATH_ERP.people}/${id}` )
    }

    const contactHook: any = {
        TABLEHEADER,
        handleInactiveContact,
        onSelectRow,
        onSelectAllRows,
        onClickContact
    }

    return{
        contactHook
    }
}

export default useProcess;