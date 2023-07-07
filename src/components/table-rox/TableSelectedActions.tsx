// @mui
import { Checkbox, Typography, Stack, StackProps } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends StackProps {
  dense?: boolean;
  actions?: React.ReactNode;
  rowCount: number;
  numSelected: number;
  selectedUnit?: string,
  onSelectAllRows: (checked: boolean) => void;
}

export default function TableSelectedActions({
  dense,
  actions,
  rowCount,
  numSelected,
  selectedUnit,
  onSelectAllRows,
  sx,
  ...other
}: Props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        p: 2,
        marginX: '8px !important',
        marginBottom: '-16px !important',
        display: 'flex',
        height: 58,
        borderRadius: 1,
        bgcolor: 'primary.lighter',
        ...sx,
      }}
      {...other}
    >
      <Checkbox
        indeterminate={numSelected > 0 && numSelected < rowCount}
        checked={rowCount > 0 && numSelected === rowCount}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onSelectAllRows(event.target.checked)
        }
      />

      <Typography
        variant="subtitle1"
        sx={{
          ml: 2,
          flexGrow: 1,
          color: 'primary.main',
          ...(dense && {
            ml: 3,
          }),
        }}
      >
        {numSelected} {selectedUnit && selectedUnit !== '' ? selectedUnit : 'selecionado'}
      </Typography>

      {actions && actions}
    </Stack>
  );
}
