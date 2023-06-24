// @mui
import { TableRow, TableCell } from '@mui/material';
//
import EmptyContent from '../EmptyContent';

// ----------------------------------------------------------------------

type Props = {
  isNotFound: boolean;
  filterName?: string;
};

export default function TableNoData({ isNotFound, filterName }: Props) {
  return (
    <TableRow>
      {isNotFound ? (
        <TableCell colSpan={12}>
          <EmptyContent
            title= {`Nenhum dado encontrado para "${filterName}"`}
            description='Tente outra pesquisa'
            withImg={false}
            sx={{
              '& span.MuiBox-root': { height: 160 },
            }}
          />
        </TableCell>
      ) : (
        <TableCell colSpan={12}>
          <EmptyContent
            title="Nenhum dado encontrado"
            sx={{
              '& span.MuiBox-root': { height: 160 },
            }}
          />
        </TableCell>
      )}
    </TableRow>
  );
}
