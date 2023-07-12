import { useState } from "react";
import { PATH_ERP } from "src/routes/paths";

const useMovimentation = () => {
    const [ openPopover, setOpenPopover ] = useState(null)
    const [ openDetailPopover, setOpenDetailPopover ] = useState(null)
    const [ currentTab, setCurrentTab ] = useState(1)
    const [ currentPage, setCurrentPage ] = useState<string>('list')
    const [ publicationToShow, setPublicationToShow ] = useState<any>(null)
    const [ proceduralToShow, setProceduralToShow ] = useState<any>(null)
    const POPOVER_OPTIONS = [
        {label: 'Nova Pesquisa', to: PATH_ERP.handleMoviSearch},
        {label: 'Termos Buscados', to: PATH_ERP.moviSearchTerms},
    ]
    const DETAIL_POPOVER_OPTIONS = [
        {label: 'Imprimir Publicação', to: PATH_ERP.handleMoviSearch},
        {label: 'Descartar Publicação', to: PATH_ERP.handleMoviSearch},
        {label: 'Ver toda Movimentação', to: PATH_ERP.handleMoviSearch},
        {label: 'Bloquear Processo', to: PATH_ERP.moviSearchTerms},
    ]
    const TABS = [
        {label: 'Publicações', value: 1, amount: 35, icon: 35},
        {label: 'Andamentos Processuais', value: 2, amount: 219, icon: 219},
    ]

    const onClickTransaction = (id: any, transactionList: any[]) => {
        setPublicationToShow(transactionList?.find((act) => act._id === id))
        setCurrentPage('publicationDetail')
    }

    const onClickProcedural = (id: any, proceduralList: any[]) => {
        setProceduralToShow(proceduralList?.find((act) => act._id === id))
        setCurrentPage('proceduralDetail')
    }

    const movimentationHook: any = {
        openPopover,
        currentTab,
        currentPage,
        openDetailPopover,
        publicationToShow,
        proceduralToShow,
        POPOVER_OPTIONS,
        DETAIL_POPOVER_OPTIONS,
        TABS,
        setCurrentTab,
        setOpenPopover,
        setCurrentPage,
        setOpenDetailPopover,
        onClickTransaction,
        onClickProcedural,
    }

    return{
        movimentationHook
    }
}

export default useMovimentation;