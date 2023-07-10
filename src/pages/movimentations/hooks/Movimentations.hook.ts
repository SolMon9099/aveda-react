import { useState } from "react";
import { PATH_ERP } from "src/routes/paths";

const useMovimentation = () => {
    const [ openPopover, setOpenPopover ] = useState(null)
    const [ currentTab, setCurrentTab ] = useState(1)
    const [ currentPage, setCurrentPage ] = useState<string>('')
    const POPOVER_OPTIONS = [
        {label: 'Nova Pesquisa', to: PATH_ERP.handleMoviSearch},
        {label: 'Termos Buscados', to: PATH_ERP.handleProcess},
    ]
    const TABS = [
        {label: 'Publicações', value: 1, amount: 35, icon: 35},
        {label: 'Andamentos Processuais', value: 2, amount: 219, icon: 219},
    ]

    const onClickTransaction = (id: any) => {
        console.log(id);
    }

    const movimentationHook: any = {
        openPopover,
        currentTab,
        currentPage,
        POPOVER_OPTIONS,
        TABS,
        setCurrentTab,
        setOpenPopover,
        setCurrentPage,
        onClickTransaction,
    }

    return{
        movimentationHook
    }
}

export default useMovimentation;