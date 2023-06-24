import { Avatar, Box, Checkbox, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { capitalize } from "lodash";
import Iconify from "../Iconify";
import Label from "../Label";

type Props = {
    row: any;
    header: {id: string, subId?: string, tagsId?: string, label: string, align?: string, type?: string, icon?: string}[],
    selectType: string,
    selectKey: string,
    selected: string[],
    onSelectRow: (id: string) => void,
    onClickKey: string,
    onClickFunction?: (id: string) => void,
    disableOnSelect?: boolean,
    avatarKey?: string | undefined,
    avatarType?: 'label' | 'icon' | 'default',
    newInfoKey?: string,
}

export default function TableRowRox({
        row, 
        header, 
        selectType, 
        selected, 
        selectKey, 
        onSelectRow, 
        onClickKey, 
        onClickFunction, 
        disableOnSelect,
        avatarKey,
        avatarType,
        newInfoKey
    }: Props){
    return(
        <TableRow
            hover={(!!onClickFunction) || (!!onClickFunction && disableOnSelect && !selected.includes(row[selectKey]))}
            sx={{
                '&:hover':{
                    cursor: (!!onClickFunction || (!!onClickFunction && disableOnSelect && !selected.includes(row[selectKey]))) ? 'pointer' : undefined
                }
            }}
            onClick={() => (!!onClickFunction || (disableOnSelect && selected.includes(row[selectKey]) && !!onClickFunction)) && onClickFunction(row[onClickKey])}
        >
            {selectType !== 'none' &&
                <TableCell padding="checkbox" onClick={(e) => {e.stopPropagation(); onSelectRow(row[selectKey])}}>
                    <Checkbox checked={selected.includes(row[selectKey])} />
                </TableCell>
            }
            {header.map((head, idx) =>{
                var headIdArray = head.id.split('.')
                if(head.subId){
                    var headSubIdArray = head.subId.split('.')
                    var dataRowSub = row;
                    headSubIdArray.forEach((id) =>{
                        dataRowSub = dataRowSub[id] ? dataRowSub[id] : ''
                    })
                }
                if(head.tagsId){
                    var headTagIdArray = head.tagsId.split('.')
                    var dataTags = row;
                    headTagIdArray.forEach((id) =>{
                        dataTags = dataTags[id] ? dataTags[id] : ''
                    })
                }
                var dataRow = row;
                headIdArray.forEach((id) =>{
                    dataRow = dataRow[id] ? dataRow[id] : '-'
                })
                return(
                    <TableCell>
                        {(head.type && head.type === 'label') ?
                            <Label
                                variant="filled"
                                color={row.color || 'primary'}
                            >
                                {dataRow}
                            </Label>
                            :
                            <Stack direction='row' spacing={1}>
                                {(newInfoKey && row[newInfoKey] && idx === 0) &&
                                    <Box
                                        sx={{
                                            minWidth: 10,
                                            minHeight: 10,
                                            maxWidth: 10,
                                            maxHeight: 10,
                                            top: 6,
                                            position: 'relative',
                                            borderRadius: '50%',
                                            backgroundColor: (theme) => theme.palette.warning.main,
                                        }}
                                    />
                                }
                                <Stack direction='row' spacing={2} alignItems='center'>
                                    {(avatarKey && idx === 0) &&
                                        <>
                                            {avatarType === 'default' ?
                                                <Avatar src={row[avatarKey]}/>
                                                :
                                                <Label
                                                    color={(disableOnSelect && selected.includes(row[selectKey])) ? 'default' : 'primary'}
                                                >
                                                    {capitalize(row[avatarKey][0])}
                                                </Label>
                                            }
                                        </>
                                    }
                                    {
                                        avatarType === 'icon' &&
                                        <Iconify width={24} height={24} color='secondary.main' icon={head?.icon || ''}/>
                                    }
                                    <Stack>
                                        <Stack direction='row' spacing={1} alignItems='center'>
                                            {head.type === 'hasIcon' && <Iconify width={15} height={15} icon={row.icon} color={(disableOnSelect && selected.includes(row[selectKey])) ? 'grey' : 'primary.main'}/>}
                                            <Typography 
                                                sx={{ 
                                                    textDecoration: (disableOnSelect && selected.includes(row[selectKey])) ? 'line-through' : undefined,
                                                    color: (theme) => (disableOnSelect && selected.includes(row[selectKey])) ? theme.palette.text.secondary : undefined,
                                                }} 
                                                variant='subtitle2' 
                                                fontWeight={idx === 0 ? '600' : '500'}
                                            >
                                                {dataRow}
                                            </Typography>
                                        </Stack>
                                        {(dataRowSub || dataRowSub === '') && 
                                            <Typography 
                                                sx={{ 
                                                    textDecoration: (disableOnSelect && selected.includes(row[selectKey])) ? 'line-through' : undefined
                                                }} 
                                                variant='body2' 
                                                color='text.secondary'
                                            >
                                                {dataRowSub}
                                            </Typography>
                                        }
                                        {(dataTags && dataTags.length > 0) &&
                                            <Stack spacing={1} direction='row'>
                                                {dataTags.map((tag: any) =>
                                                    <Label variant="filled" color={tag.color}>
                                                        {tag.title}
                                                    </Label>
                                                )}
                                            </Stack>
                                        }
                                    </Stack>
                                </Stack>
                            </Stack>
                        }
                    </TableCell>
                )
            })}
        </TableRow>
    )
}