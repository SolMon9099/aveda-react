import { Avatar, Stack } from "@mui/material";
import { ReactNode } from "react";
import createAvatar from "src/utils/createAvatar";

type Props = {
    name: string,
    photo?: string,
    sub?: string,
    fontWeightName?: string,
    subNode?: ReactNode,
    isRow?: boolean, 
}

export default function LiveAvatar({name, photo, sub, fontWeightName, subNode, isRow = false}: Props){
    return(
        <Stack direction='row' spacing={1} alignItems='center'>
            <Avatar
                src={photo}
                alt={name}
                color={photo ? 'default' : createAvatar(name).color}
            >
                {createAvatar(name).name}
            </Avatar>
        </Stack>
    )
}