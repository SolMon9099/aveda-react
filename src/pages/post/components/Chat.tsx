import { Box, Stack } from "@mui/material";
import { useSelector } from "src/redux/store";
import { useEffect, useState } from "react";
import ChatMessage from './ChatMessage'
import ChatSender from './ChatSender'
import {db} from '../../../config'

type ChatType = {
  isVisible: boolean
}

export default function Chat({ isVisible } : ChatType){
  const [fireMsgs, setFireMsgs] = useState([]);
  //const { messages } = useSelector((state) => state.live)
  const { selectedPost } = useSelector((state) => state.post)

  useEffect(() => {
    async function getMessages() {  
        await db.collection("lives").doc(selectedPost?._id).collection('msgs').orderBy("createdAt", "asc").onSnapshot((querySnapshot :any) =>{
          setFireMsgs(querySnapshot.docs.map((doc:any) =>({
            author:doc.data().author,
            authorImage:doc.data().authorImage,
            isAdmin:doc.data().isAdmin,
            message:doc.data().message,
            createdAt:doc.data().createdAt,
            id: doc.id
          }))
          )
        }) 
      }
    getMessages();
}, [selectedPost?._id]);


  useEffect(() => {
    var elem : any = document.getElementById('chatMessages');
    elem!.scrollTop = elem?.scrollHeight;
  }, [fireMsgs])
  


  return(
    <Box sx={{overflow:'hidden'}}>
      <Stack pt={1} pl={1} sx={{overflow:'hidden'}}>
        <Box id='chatMessages' sx={{height:'352px', overflowY:'scroll',
            paddingRight: '17px',
          }}>
          {fireMsgs?.map((msg:any) =>(
            <>
            <ChatMessage message={msg} />
            <Box mb={2}/>
            </>
            ))}
        </Box>
      </Stack>
      { isVisible ? <ChatSender /> : <></>}
    </Box>
  )
}