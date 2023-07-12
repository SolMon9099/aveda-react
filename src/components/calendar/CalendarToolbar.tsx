// @mui
import { styled } from '@mui/material/styles';
import { Stack, Button, Tooltip, Typography, IconButton, ToggleButton, Autocomplete, Chip, TextField } from '@mui/material';
// utils
import { fDate } from '../../utils/formatTime';
// hooks
import useResponsive from '../../hooks/useResponsive';
// @types
import { CalendarView } from '../../@types/calendar';
// components
import Iconify from '../Iconify';
import moment from 'moment';

// ----------------------------------------------------------------------

const VIEW_OPTIONS = [
  { value: 'dayGridMonth', label: 'Month', icon: 'ic:round-view-module' },
  { value: 'timeGridWeek', label: 'Week', icon: 'ic:round-view-week' },
  { value: 'timeGridDay', label: 'Day', icon: 'ic:round-view-day' },
  { value: 'listWeek', label: 'Agenda', icon: 'ic:round-view-agenda' },
] as const;

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(2.5),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

// ----------------------------------------------------------------------

type Props = {
  date: Date;
  view: CalendarView;
  hasOptions?: boolean;
  options?: {label: string, value: string}[];
  selectedOptions?: {label: string, value: string}[];
  placeHolder?: string;
  onChangeSelectedOptions?: (v: {label: string, value: string}[]) => void;
  onToday: VoidFunction;
  onNextDate: VoidFunction;
  onPrevDate: VoidFunction;
  onChangeView: (newView: CalendarView) => void;
};

export default function CalendarToolbar({
  date,
  view,
  hasOptions,
  options = [],
  selectedOptions = [],
  placeHolder,
  onChangeSelectedOptions,
  onToday,
  onNextDate,
  onPrevDate,
  onChangeView,
}: Props) {
  const isDesktop = useResponsive('up', 'sm');

  return (
    <Stack spacing={2}>
      <RootStyle>
        {isDesktop && (
          <Stack direction="row" spacing={0.5}>
            {VIEW_OPTIONS.map((viewOption) => (
              <Tooltip key={viewOption.value} title={viewOption.label}>
                <ToggleButton
                  value={view}
                  selected={viewOption.value === view}
                  onChange={() => onChangeView(viewOption.value)}
                  sx={{ width: 32, height: 32, padding: 0, border: 0 }}
                >
                  <Iconify icon={viewOption.icon} width={20} height={20} />
                </ToggleButton>
              </Tooltip>
            ))}
          </Stack>
        )}

        <Typography variant="h5">{moment(date).format('LL')}</Typography>

        {isDesktop && (
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton onClick={onPrevDate}>
              <Iconify icon="eva:arrow-ios-back-fill" width={20} height={20} />
            </IconButton>

            <Button size="small" color="error" variant="contained" onClick={onToday}>
              Hoje
            </Button>

            <IconButton onClick={onNextDate}>
              <Iconify icon="eva:arrow-ios-forward-fill" width={20} height={20} />
            </IconButton>
          </Stack>
        )}
      </RootStyle>
      {hasOptions &&
        <Autocomplete
          sx={{
            p: 2
          }}
          onChange={(_, data) => onChangeSelectedOptions && onChangeSelectedOptions(data)}
          value={selectedOptions}
          multiple
          fullWidth
          options={options}
          placeholder={placeHolder}
          getOptionLabel={(option) => option.label || ""}
          isOptionEqualToValue={(option,value) => option.value === value.value}
          renderInput={(params) => <TextField {...params} margin="none" label={placeHolder}/>}
          renderTags={(value: any, getTagProps: any) =>
            value.map((option: any, index: any) => (
                <Chip
                    color={option.color}
                    variant="contained"
                    label={option.label}
                    {...getTagProps({ index })}
                />
            ))
        }
        />
      }
    </Stack>
  );
}
