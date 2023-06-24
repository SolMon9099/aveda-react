import { IconButton, Typography } from "@mui/material";
import { Dialog, DialogContent, Stack } from "@mui/material";
import Iconify from "src/components/Iconify";
import { setIsOpen } from "src/redux/slices/profile";
import { useDispatch, useSelector } from "src/redux/store";
import ProfileForm from "./components/ProfileForm";


export default function Profile(){
    const dispatch = useDispatch()
    const { isOpen } = useSelector((state) => state.profile)

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
                            {'Perfil'}
                        </Typography>
                        <IconButton
                            onClick={() => dispatch(setIsOpen(false))}
                        >
                            <Iconify icon='ph:x'/>
                        </IconButton>
                    </Stack>
                   <ProfileForm/>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}