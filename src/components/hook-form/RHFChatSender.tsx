// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import useLive from 'src/pages/post/hooks/Live.hook';
import { useEffect } from 'react';
// ----------------------------------------------------------------------

type IProps = {
  name: string;
  withCount?: boolean;
  callback?: () => any
};

type Props = IProps & TextFieldProps;

export default function RHFChatSender({ name, withCount,callback, ...other }: Props) {
  const { control, resetField } = useFormContext();
  const { liveHook } = useLive()
  const sendMsg = (value? :any) =>{
    var helper ={
      message:value.value
    }
    liveHook.handleSubmit(liveHook.onSubmit(helper))
    resetField(name,{ defaultValue: "" })
    
  }

  useEffect(() => {
    resetField(name,{ defaultValue: "" })
  }, [name, resetField])

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          sx={{borderRadius:"0px 0px 27px 27px"}}
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          error={!!error}
          helperText={error?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => sendMsg(field)} sx={{color:"#919EAB", width: '16px', height: '16px'}}>
                    <SendIcon  sx={{width: '16px', height: '16px'}} />
                </IconButton>
              </InputAdornment>
            )
          }}
          {...other}
        />
      )}
    />
  );
}
