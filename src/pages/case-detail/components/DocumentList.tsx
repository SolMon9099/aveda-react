import { Button, IconButton, Tooltip } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Iconify from "src/components/Iconify";
import TableRox from "src/components/table-rox/TableRox";
import { useSelector } from "src/redux/store";
import { PATH_ERP } from "src/routes/paths";
import useDocumentList from "../hooks/DocumentList.hook";


export default function DocumentList(){
    const { process } = useSelector((state) => state.caseDetail)
    const { documentListHook } = useDocumentList()
    const navigate = useNavigate()
    const { caseId } = useParams()

    return(
        <TableRox
            data={process?.documents || []}
            header={documentListHook.TABLEHEADER}
            defaultOrderBy='name'
            hasSearch
            selectType="all"
            selectKey="_id"
            tableTitle="Documentos"
            titleActions={
                <Button
                    variant='contained'
                    startIcon={
                        <Iconify width={18} height={18} icon='ic:baseline-plus'/>
                    }
                    onClick={() => navigate(PATH_ERP.caseDocument + '/' + caseId)}
                >
                    Adicionar
                </Button>
            }
            onClickFunction={
                (id) => window.open(process?.documents.filter((d) => d._id === id)[0].url, '_blank')
            }
            onClickKey='_id'
            onSelectRowFunction={documentListHook.onSelectRow}
            onSelectAllRowFunction={documentListHook.onSelectAllRow}
            selectActions={
                <Tooltip title="Deletar">
                    <IconButton color="primary" onClick={() => documentListHook.handleDeleteDocument()}>
                        <Iconify icon={'eva:trash-2-outline'} />
                    </IconButton>
                </Tooltip>
            }
            avatarType='icon'
        />
    )
}