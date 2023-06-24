import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import moment from "moment";
import Chat from './Chat'
import useResponsive from "src/hooks/useResponsive";

export default function LiveChat({ selectedPost }: any) {
  const timeNow = moment(new Date()).format('LT')
  const now = new Date();
  const isMobile = useResponsive('down', 'sm');
  const isVisible = (selectedPost.isLiveNow === 'now') || (selectedPost.isLiveNow !== 'finished' && moment(selectedPost.date).format('MM/DD/YYYY') === moment(new Date()).format('MM/DD/YYYY') && (selectedPost.scheduleHour <= timeNow));
  const liveDate = moment(selectedPost.date)
  .set('hour', selectedPost.scheduleHour.split(':')[0])
  .set('minute', selectedPost.scheduleHour.split(':')[1])
  .set('second', 0).toDate();

  return (
    <Card sx={{ width: isMobile ? '100%' : '368px', height: isVisible ? '464px' : '535px' }}>
      <Box pl={2} pt={1} pb={1} sx={{ borderTop: '8px solid #FF8500' }}>
        <Typography variant='h5'>
          Chat
        </Typography>
      </Box>
      <Divider />
      { moment(now).isAfter(liveDate)
        ? <Chat isVisible={isVisible}/>
        : <Stack sx={{ height: '85%' }} alignItems={'center'} alignSelf={'center'} justifyContent={'center'}>
          <Typography variant='body2' color="grey.600">
            Chat estará disponível durante a live.
          </Typography>
        </Stack>
      }

    </Card>
  )
}