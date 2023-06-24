import { Button } from "@mui/material";
import Iconify from "src/components/Iconify";
import TableRox from "src/components/table-rox/TableRox";
import { useSelector } from "src/redux/store";


export default function ActivitiesList({activitiesListHook}: any){
    const { process } = useSelector((state) => state.caseDetail)

    return(
        <>
            <TableRox
                header={activitiesListHook.TABLEHEADER}
                data={process?.activities || []}
                defaultOrderBy='name'
                tableTitle="Atividades"
                selectType="single"
                selectKey="_id"
                onSelectRowFunction={activitiesListHook.onSelectRow}
                defaultSelected={activitiesListHook.selectedIds}
                disableOnSelect
                onClickKey="_id"
                onClickFunction={(id) => activitiesListHook.onClickActivity(id)}
                titleActions={
                    <Button
                        variant='contained'
                        startIcon={
                            <Iconify width={18} height={18} icon='ic:baseline-plus'/>
                        }
                        onClick={() => activitiesListHook.setOpenModal(true)}
                    >
                        Adicionar
                    </Button>
                }
            />
        </>
    )
}