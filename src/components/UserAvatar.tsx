import { Avatar, Stack, Tooltip, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import createAvatar from "src/utils/createAvatar";
import UserInfoDialog from "./UserInfoDialog";

type Props = {
    name: string,
    email: string,
    photo?: string,
    sub?: string,
    fontWeightName?: string,
    subNode?: ReactNode,
    isRow?: boolean, 
    description?: string
}

export default function UserAvatar({name, photo, sub, fontWeightName, subNode, description, isRow = false, email}: Props){
    const [ isOpen, setIsOpen ] = useState(false)

    return(
        <>
            <Stack direction='row' sx={{ '&:hover': { cursor: 'pointer' } }} spacing={1} alignItems='center' onClick={(e) => {e.stopPropagation(); setIsOpen(true)}}>
                <Avatar
                    src={photo}
                    alt={name}
                    color={photo ? 'default' : createAvatar(name).color}
                >
                    {createAvatar(name).name}
                </Avatar>
                <Stack spacing={isRow ? 0.5 : 0} direction={isRow ? 'row' : 'column'} alignItems={isRow ? 'center' : undefined}>
                    {description && description !== '' ?
                        <Tooltip title={description}>
                            <Typography variant='subtitle2' fontWeight={fontWeightName ? fontWeightName : 'medium'}>
                                {name}
                            </Typography>
                        </Tooltip>
                        :
                        <Typography variant='subtitle2' fontWeight={fontWeightName ? fontWeightName : 'medium'}>
                            {name}
                        </Typography>
                    }
                    {sub &&
                        <Typography variant='caption' color='text.secondary'>
                            {sub}
                        </Typography>
                    }
                    {!!subNode &&
                        subNode
                    }
                </Stack>
            </Stack>
            <UserInfoDialog name={name} photo={photo} description={description} open={isOpen} email={email} onClose={(e) => {e.stopPropagation(); setIsOpen(false)}}/>
        </>
    )
}