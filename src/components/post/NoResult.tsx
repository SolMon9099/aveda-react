import { Box, Typography } from "@mui/material";


export default function NoResult(){
    return(
        <Box flexGrow={1} alignItems='center' justifyContent='center' display='flex' sx={{pt: 5}}>
            <Typography>
                Nenhuma publicação encontrada
            </Typography>
        </Box>
    )
}