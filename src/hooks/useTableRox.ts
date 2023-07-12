import { useState } from 'react';

// ----------------------------------------------------------------------

export type UseTableProps = {
  dense: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  order: 'asc' | 'desc';
  orderBy: string;
  //
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  onSelectRow: (id: string) => void;
  onSelectAllRows: (checked: boolean, newSelecteds: string[]) => void;
  //
  onSort: (id: string) => void;
  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDense: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type Props = {
  tableData: any;
  header: {id: string, subId?: string, label: string, align?: string}[],
  defaultDense?: boolean;
  defaultOrder?: 'asc' | 'desc';
  defaultOrderBy?: string;
  defaultSelected?: string[];
  defaultRowsPerPage?: number;
  defaultCurrentPage?: number;
  onSelectRowFunction?: (id: string) => void;
  onSelectAllRowFunction?: (id: string[]) => void;
};

export default function useTableRox(props?: Props) {
  const [orderBy, setOrderBy] = useState(props?.defaultOrderBy || 'name');

  const [order, setOrder] = useState<'asc' | 'desc'>(props?.defaultOrder || 'asc');

  const [page, setPage] = useState(props?.defaultCurrentPage || 0);

  const [rowsPerPage, setRowsPerPage] = useState(props?.defaultRowsPerPage || 5);

  const [selected, setSelected] = useState<string[]>(props?.defaultSelected || []);

  const [filterName, setFilterName] = useState('');

  const [filteredData, setFilteredData] = useState(props?.tableData || []);

  const onSort = (id: string) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const onSelectRow = (id: string) => {
    if(props?.onSelectRowFunction){
      props.onSelectRowFunction(id)
    }

    const selectedIndex = selected.indexOf(id);

    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const onSelectAllRows = (checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      if(props?.onSelectAllRowFunction){
        props?.onSelectAllRowFunction(newSelecteds)
      }
      setSelected(newSelecteds);
      return;
    }
    if(props?.onSelectAllRowFunction){
      props?.onSelectAllRowFunction([])
    }
    setSelected([]);
  };

  const onChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onFilterName = (v: string) =>{
    setFilterName(v)
    var auxTableData: any = [];
    props?.tableData.forEach((data: any) =>{
        var push = false;
        props?.header.forEach((h) =>{
            var headIdArray = h.id?.split('.') ?? [];
            var dataRow = data;
            headIdArray.forEach((id) =>{
                dataRow = dataRow[id] ? dataRow[id] : '-'
            })
            if(h.subId){
                var headSubIdArray = h.subId.split('.')
                var dataRowSub = data;
                headSubIdArray.forEach((id) =>{
                    dataRowSub = dataRowSub[id] ? dataRowSub[id] : ''
                })
            }
            if(dataRow.toString().toLowerCase().includes(v.toLocaleLowerCase()) || (dataRowSub && dataRowSub.toString().toLowerCase().includes(v.toLocaleLowerCase()))){
                push = true
            }
        })
        if(push){
            auxTableData.push(data)
        }
    })
    setFilteredData(auxTableData)
  }

  return {
    order,
    page,
    setPage,
    orderBy,
    rowsPerPage,
    filterName,
    onFilterName,
    filteredData,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  };
}

// ----------------------------------------------------------------------

export function descendingComparator(a: any, b: any, orderBy: any) {
  var orderByArray = orderBy.toString().split('.')
  var aAux = a;
  var bAux = b;

  orderByArray.forEach((id: any) =>{
    aAux = aAux[id] ? aAux[id] : '-'
    bAux = bAux[id] ? bAux[id] : '-'
  })

  if (bAux < aAux) {
    return -1;
  }
  if (bAux > aAux) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: 'asc' | 'desc',
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function emptyRows(page: number, rowsPerPage: number, arrayLength: number) {
  return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}
