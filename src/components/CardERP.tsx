import { Card, Box, Stack, Typography } from "@mui/material";
import Image from './Image'
import Logo from "./Logo";

type Props = {
    banner: boolean
}

export default function CardERP({banner}: Props){
    return(
        banner ?
            <Box
                display='flex' 
                sx={{
                    bgcolor: (theme) => theme.palette.grey[300],
                    width: '100%',
                    height: 270,
                    borderRadius: 1
                }}
                alignItems='center'
                justifyContent='center'
            >
                <Image src={"https://storage.googleapis.com/adeva-bucket/static/attachments/image-1677244409242-16879.png?GoogleAccessId=adm-bucket-dolphin%40roxcode.iam.gserviceaccount.com&Expires=4108244400&Signature=bzrVBrZ%2FlmCfOlwXkC1MoEAK1etVBWDG45lV1lryezlg5VK0UrMYYnQyEaNtckWVhwE5xDL0iW6Vbt5OwfxztkGnHJygbgSS0sUxL55helOBKgBDguz%2FCwupVdW0dqJt95S7u7zVUWT%2Fkj6gGzubyCyc1OskuYdaHh%2BOtdvMDvV4ak9a3RI0vmUMgGpEPNFskQ8k0%2B3ORkUrAhCSrg3sJSdUZSbxV51TutYUfo2ebGwnb3xsKdMASxG5bmyqVg78k5x2JkbRBQT1N55tUXEyIy6bzfY6RPWZCpQfgKG5YSxTIF4Y8kBRGu0uX7GZxJR1JeFnXxbuNmC87QouCA2XYg%3D%3D"} />
            </Box>
            :
            <Card sx={{borderRadius: 0}}>
                <Stack>
                    <Box 
                        flexGrow={1} 
                        width='100%' 
                        display='flex' 
                        sx={{ p:4 }} 
                        alignItems='center' 
                        justifyContent='center'
                    >
                        <Logo purple disabledLink/>
                    </Box>
                    <Box 
                        flexGrow={1} 
                        width='100%' 
                        display='flex' 
                        sx={{
                                p:4, 
                                bgcolor: (theme) => theme.palette.secondary.main
                            }} 
                        alignItems='center' 
                        justifyContent='center'
                    >
                        <Typography variant="subtitle1" color='common.white' textAlign='center'>
                            SUBSSTITUIR ESSE TEXTO
                        </Typography>
                    </Box>
                </Stack>
            </Card>
    )
}