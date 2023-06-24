import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useSelector } from "src/redux/store";
import CloseIcon from '@mui/icons-material/Close';
import LiveAvatar from "src/components/LiveAvatar";
import {db} from '../../../config'

export default function ChatMessage({message}:any){

  const { selectedPost } = useSelector((state) => state.post)
  
  return(
    <Box>
      <Stack spacing={1} direction={'row'} alignItems={'center'} >
        <Stack>
          {}
          <LiveAvatar
              photo={message.authorImage}
              name={message.author} 
          />
          {/* <Image sx={{width:'32px',height:'32px',borderRadius:'32px'}} src={}/> */}
        </Stack>
        <Stack direction={'row'} spacing={1}>
          {message?.isAdmin ?
            <Typography sx={{wordBreak: 'break-word'}} variant='body1'>
              <span style={{color:"#FFFFFF",background:"#FF8500"}}>{message.author}</span> {message.message}
            </Typography> 
          :
          <Typography sx={{wordBreak: 'break-word'}} variant='body1'>
            <span style={{color:"#637381"}}>{message.author}</span> {message.message}
          </Typography> 
          }
        </Stack>
        <Stack>
          {selectedPost?.isAuthor && 
          <IconButton sx={{color:"#919EAB", width: '16px', height: '16px'}}>
            <CloseIcon onClick={async (data) => {
              await db.collection("lives").doc(selectedPost?._id).collection('msgs').doc(message?.id).delete()
            }} sx={{width: '16px', height: '16px'}} />
          </IconButton>
          }
        </Stack>
      </Stack>
    </Box>
  )
}