import { IconButton, Typography } from "@mui/material";
import { Dialog, DialogContent, Stack } from "@mui/material";
import Iconify from "src/components/Iconify";
import { setIsOpen } from "src/redux/slices/auth";
import { useDispatch, useSelector } from "src/redux/store";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ResetForm from './components/ResetForm'


export default function Auth(){
    const dispatch = useDispatch()
    const { isOpen, selected } = useSelector((state) => state.auth)

    return(
        <Dialog
            fullWidth
            maxWidth='sm'
            open={isOpen}
            onClose={() => dispatch(setIsOpen(false))}
        >
            <DialogContent>
                <Stack spacing={2}>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                        <Typography variant='h6'>
                            {selected === 1 ? 'Fazer Login' : selected === 3 ? 'Recuperar senha' :'Criar Conta Gratuitamente'}
                        </Typography>
                        <IconButton
                            onClick={() => dispatch(setIsOpen(false))}
                        >
                            <Iconify icon='ph:x'/>
                        </IconButton>
                    </Stack>
                    {selected === 1 ?
                        <LoginForm/>
                        :
                        selected === 3 ?
                        <ResetForm />
                        :
                        <RegisterForm/>
                    }
                </Stack>
            </DialogContent>
        </Dialog>
    )
}