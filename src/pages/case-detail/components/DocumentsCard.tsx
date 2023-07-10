import { Card, Stack, Box, Typography, Button } from "@mui/material";
import moment from "moment";
import Iconify from "src/components/Iconify";
import TextMaxLine from "src/components/TextMaxLine";
import { useSelector } from "src/redux/store";

export default function DocumentsCard({castDetailHook} : any){
    const { process } = useSelector((state) => state.processDetail)

    return(
        <Card>
            <Box sx={{ height: 8,bgcolor: (theme) => theme.palette.secondary.main, top: 0 }}/>
            <Stack spacing={3} sx={{pt: 2, pl: 3, pr:3, pb: 3}}>
                <Typography variant="h6">
                    Documentos do Processo
                </Typography>
                <Stack spacing={2}>
                    {process?.documents.map((doc, idx) =>
                        idx < 3 &&
                        <Stack 
                            key={'doc_'+doc._id} 
                            direction='row' 
                            spacing={2} 
                            alignItems='center' 
                            sx={{
                                px: 2,
                                py: 1,
                                border: '1px solid',
                                borderRadius: 1,
                                borderColor: (theme) => theme.palette.grey[500_32],
                                '&:hover':{
                                    cursor: 'pointer'
                                }
                            }}
                            onClick={() => window.open(doc.url, '_blank')}
                        >
                            <Iconify width={24} height={24} color='secondary.main' icon='mdi:file-document'/>
                            <Stack>
                                <TextMaxLine line={1} variant='body2'>
                                    {doc.name}
                                </TextMaxLine>
                                <Typography variant='caption' color='text.secondary'>
                                    {doc.createdAt}
                                </Typography>
                            </Stack>
                        </Stack>
                    )}
                    <Stack direction='row'>
                        <Button
                            onClick={() => castDetailHook.setCurrentTab(4)}
                        >
                            VER TODOS
                        </Button>
                        <Box flexGrow={1}/>
                    </Stack>  
                </Stack>
            </Stack>
        </Card>
    )
}