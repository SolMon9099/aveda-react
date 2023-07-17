import { DialogContent, Dialog, Stack, Typography, IconButton, TextField, Box, Button } from "@mui/material";
import Iconify from "src/components/Iconify";
import InputMask from 'react-input-mask';


export default function NewFieldModal({ contactsHandleHook }: any){
    return(
        <Dialog fullWidth maxWidth='xs' open={contactsHandleHook.openField} onClose={contactsHandleHook.onCloseField}>
            <DialogContent>
                <Stack spacing={2}>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant="h6">
                            Novo Campo
                        </Typography>
                        <IconButton onClick={contactsHandleHook.onCloseField}>
                            <Iconify width={24} height={24} icon='ph:x'/>
                        </IconButton>
                    </Stack>
                    <TextField
                        label='Campo'  
                        select
                        fullWidth
                        SelectProps={{ native: true }}
                        value={contactsHandleHook.newFieldType}
                        onChange={(v) => contactsHandleHook.setNewFieldType(v.target.value)}
                    >
                        {contactsHandleHook.NEWFIELD_OPTIONS.map((opt: any) =>
                            <option value={opt.value}>
                                {opt.label}
                            </option>
                        )}
                    </TextField>
                    <InputMask  onChange={(v) => contactsHandleHook.setNewFieldValue(v.target.value)} value={contactsHandleHook.newFieldValue} maskChar="" mask={contactsHandleHook.NEWFIELD_OPTIONS.find((n:any) => n.value === contactsHandleHook.newFieldType).mask}>
                        {// @ts-ignore
                        (inputProps: TextFieldProps) => <TextField label='Valor' {...inputProps} fullWidth />}
                    </InputMask>
                    <Stack direction='row' spacing={2}>
                        <Box flexGrow={1}/>
                        <Button
                            color="inherit"
                            variant="outlined"
                            onClick={contactsHandleHook.onCloseField}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            onClick={contactsHandleHook.handleAddField}
                        >
                            Adicionar
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}