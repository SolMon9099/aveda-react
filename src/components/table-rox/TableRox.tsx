import {TableContainer, Table, TableBody, Card, TextField, InputAdornment, Typography, Box, TablePagination } from "@mui/material"
import FilterListIcon from '@mui/icons-material/FilterList';
import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined';
// import TableEdit from '@mul/icons-material/TableEdit';
import { Stack } from "@mui/system"
import useTableRox, { getComparator } from "src/hooks/useTableRox"
import Iconify from "../Iconify"
import Scrollbar from "../Scrollbar"
import TableNoData from "./TableNoData"
import TableHeadCustom from "./TableHeadCustom"
import TableRowRox from "./TableRowRox"
import TableSelectedActions from "./TableSelectedActions"
import React from "react"
import Label from "../Label";

type Props = {
    data: any[],
    header: {id: string, subId?: string, tagsId?: string, label: string, align?: string, type?: string, icon?: string}[],
    defaultOrderBy: string,
    tableTitle?: string,
    tableSubtitle?: string,
    avatarKey?: string | undefined,
    avatarType?: 'label' | 'icon' | 'default',
    hasSearch?: boolean,
    searchPlaceholder?: string,
    hasFilter?: boolean,
    hasDownloadPdf?: boolean,
    hasDownloadExcel?: boolean,
    hasRecord?:boolean,
    hasRecordMark?:boolean,
    hasCount?: boolean,
    labelCount?: string,
    selectKey?: string,
    onClickKey?: string,
    onClickFunction?: (id: string) => void,
    selectType?: 'all' | 'single' | 'none',
    onSelectRowFunction?: (id: string) => void,
    onSelectAllRowFunction?: (id: string[]) => void,
    defaultSelected?: string[],
    selectActions?: React.ReactNode,
    selectedUnit?: string,
    titleActions?: React.ReactNode,
    disableOnSelect?: boolean,
    newInfoKey?: string 
}

export default function TableRox({
        data, 
        header, 
        avatarKey,
        avatarType, 
        defaultOrderBy,
        tableTitle,
        tableSubtitle, 
        hasSearch=false,
        searchPlaceholder='',
        hasFilter=false,
        hasDownloadPdf=false,
        hasDownloadExcel=false,
        hasRecord=false,
        hasRecordMark=false,
        hasCount=false, 
        labelCount='Dados',
        selectKey='id',
        onClickKey='id',
        onClickFunction,
        selectType='none',
        onSelectRowFunction,
        onSelectAllRowFunction,
        defaultSelected,
        selectActions,
        selectedUnit='',
        titleActions,
        disableOnSelect=false,
        newInfoKey
    }: Props){
    const {
        page,
        order,
        orderBy,
        rowsPerPage,
        //
        selected,
        onSelectRow,
        onSelectAllRows,
        filterName,
        onFilterName,
        filteredData,
        //
        onSort,
        onChangePage,
        onChangeRowsPerPage,
    } = useTableRox({
        defaultOrderBy: defaultOrderBy,
        tableData: data,
        header: header,
        onSelectRowFunction: onSelectRowFunction,
        onSelectAllRowFunction: onSelectAllRowFunction,
        defaultSelected: defaultSelected
    });
    
    const dataFiltered: any[] = applySortFilter({
        tableData: filteredData,
        comparator: getComparator(order, orderBy),
    });

    return(
        <Card>
            <Scrollbar>
                <TableContainer sx={{ minWidth: 800, mt: 3 }}>
                    {(tableTitle || titleActions || tableSubtitle) &&
                        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ pb:3, px: 3 }}>
                            {(tableTitle || tableSubtitle) && (
                                <Stack>
                                    {(tableTitle && tableTitle !== '') && 
                                        <Typography variant='h6'>
                                            {tableTitle}
                                        </Typography>
                                    }
                                    {(tableSubtitle && tableSubtitle !== '') && 
                                        <Typography variant='body1'>
                                            {tableSubtitle}
                                        </Typography>
                                    }
                                </Stack>
                            )}
                            {titleActions && titleActions}
                        </Stack>
                    }
                    <Stack spacing={2}>
                        {hasSearch && (
                            <>
                            <div>
                                <TextField
                                    sx={{
                                        ml: 3,
                                        mr: 3,
                                        minWidth: 480,
                                    }}
                                    size='small'
                                    InputProps={{
                                        startAdornment:(
                                            <InputAdornment position="start">
                                                <Iconify icon='ri:search-line' width={18} height={18}/>
                                            </InputAdornment>
                                        )
                                    }}
                                    placeholder={searchPlaceholder !== '' ? searchPlaceholder : 'Pesquisar...'}
                                    value={filterName}
                                    onChange={(e) => onFilterName(e.target.value)}
                                />
                                {hasFilter && (
                                    <Label 
                                        sx={{
                                            height: 40
                                        }}
                                        variant="filled"
                                        color='default'
                                        endIcon = {<FilterListIcon/>}
                                    >
                                        Filtrar
                                    </Label>
                                )}
                                {hasDownloadExcel && (
                                    <Label 
                                        sx={{
                                            height: 40,
                                            width: 40,
                                            mr: 3,
                                            float: "right",
                                        }}
                                        variant="filled"
                                        color='default'
                                    >
                                        <Iconify sx={{ height: 24, width: 24 }} icon="mdi:table-edit"/>
                                    </Label>
                                )}
                                
                                {hasDownloadPdf && (
                                    <Label 
                                        sx={{
                                            height: 40,
                                            width: 40,
                                            mr: 3,
                                            float: "right"
                                        }}
                                        variant="filled"
                                        color='default'
                                    >
                                        <Iconify sx={{ height: 24, width: 24 }} icon="mdi:file-download-outline"/>
                                    </Label>
                                )}
                                
                            </div>
                            </>
                        )
                        }
                        {hasCount &&
                            <Typography
                                sx={{
                                    pl: 3,
                                }}
                                variant='body2'
                                color='text.secondary'
                            >
                                {`${filteredData.length} ${labelCount}`}
                            </Typography>
                        }
                        {(selected.length > 0 && selectType === 'all') && (
                            <TableSelectedActions
                                numSelected={selected.length}
                                selectedUnit={selectedUnit}
                                rowCount={data.length}
                                onSelectAllRows={(checked) =>
                                    onSelectAllRows(
                                        checked,
                                        data.map((row) => row[selectKey])
                                    )
                                }
                                actions={selectActions}
                            />
                        )}
                        <Table>
                            <TableHeadCustom 
                                headLabel={selectType === 'single' ? [{id: '', label: ''}, ...header] : header}
                                order={order}
                                orderBy={orderBy}
                                rowCount={data.length}
                                numSelected={selected.length}
                                onSort={onSort}
                                onSelectAllRows={selectType === 'all' ? (checked) =>
                                    onSelectAllRows(
                                      checked,
                                      data.map((row) => row[selectKey])
                                    ) : undefined
                                }
                                sx={(selected.length > 0 && selectType === 'all') ? {
                                    display: 'none',
                                } : undefined}                                      
                            />

                            <TableBody>  
                                {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) =>
                                    <TableRowRox 
                                        key={row[selectKey]} 
                                        row={row} 
                                        header={header} 
                                        hasRecord={hasRecord}
                                        hasRecordMark={hasRecordMark}
                                        selectType={selectType} 
                                        selected={selected} 
                                        selectKey={selectKey}
                                        onSelectRow={onSelectRow}
                                        onClickKey={onClickKey}
                                        onClickFunction={onClickFunction}
                                        disableOnSelect={disableOnSelect}
                                        avatarKey={avatarKey}
                                        avatarType={avatarType}
                                        newInfoKey={newInfoKey}
                                    />
                                )}
                                {(dataFiltered.length === 0) &&
                                    <TableNoData isNotFound={filterName !== ''} filterName={filterName}/>
                                }
                            </TableBody>
                        </Table>
                    </Stack>
                </TableContainer>
            </Scrollbar>
            <Box sx={{ position: 'relative' }}>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={dataFiltered.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={onChangePage}
                    onRowsPerPageChange={onChangeRowsPerPage}
                    labelRowsPerPage='Resultados por Página'
                    labelDisplayedRows={({ from, to, count }) =>{
                        return `${from}–${to} de ${count !== -1 ? count : `Mais de ${to}`}`;
                    }}
                />
            </Box>
        </Card>
    )
}

function applySortFilter<T>({
    tableData,
    comparator,
  }: {
    tableData: T[];
    comparator: (a: any, b: any) => number;
  }) {
    const stabilizedThis = tableData.map((el, index) => [el, index] as const);
  
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
  
    tableData = stabilizedThis.map((el) => el[0]);
  
    return tableData;
}