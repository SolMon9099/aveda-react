import { Box, Card, CardContent, CircularProgress, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Iconify from "src/components/Iconify";
import CardPost from "src/components/post/CardPost";
import { useSelector } from "src/redux/store";

type Props = {
    communityHook: any;
}

export default function Search({ communityHook }: Props){
    const [ value, setValue ] = useState('')
    const { searchPosts, searchPagination, isLoadingSearchPosts } = useSelector((state) => state.community)

    return(
        <Stack spacing={2}>
            <Card>
                <CardContent>
                    <TextField
                        id='TEXTFIELDSEARCH'
                        value={value}
                        onChange={(e) => setValue(e.target.value)} 
                        placeholder="Pesquisar na Comunidade..."
                        fullWidth
                        onKeyDown={(e) =>{ if(e.keyCode === 13 && value && value !== ''){communityHook.handleGetPostsSearch(value); document.getElementById('TEXTFIELDSEARCH')?.blur()}}}
                        InputProps={{
                            startAdornment:(
                                <InputAdornment position="start">
                                    <Iconify width={25} height={25} icon='ion:search-outline'/>
                                </InputAdornment>
                            ),
                            endAdornment:(
                                (value && value !== '') &&
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setValue('')}>
                                            <Iconify width={30} height={30} icon='ph:x-circle-fill'/>
                                        </IconButton>
                                    </InputAdornment>
                            )
                        }}
                    />
                </CardContent>
            </Card>
            <InfiniteScroll
                pageStart={1}
                loadMore={communityHook.handleGetMorePostsSearch}
                hasMore={!!searchPagination?.nextCursor}
                loader={
                    <Box mt={2} display='flex' alignItems='center' justifyContent='center' >
                        <CircularProgress/>
                    </Box>
                }
            >
                <Stack spacing={2}>
                    {searchPosts.map((post, idx) =>
                        <CardPost key={'CARDSEARCH_'+post._id+idx} post={post}/>
                    )}
                </Stack>
            </InfiniteScroll>
            {(communityHook.textSearchState && communityHook.textSearchState !== '' && searchPosts.length === 0 && !isLoadingSearchPosts) &&
            <Box flexGrow={1} alignItems='center' justifyContent='center' display='flex' sx={{pt: 5}}>
                <Typography>
                    Nenhum resultado encontrado para{' '} 
                    <span style={{fontWeight: 'bold'}}>
                        {communityHook.textSearchState}
                    </span>
                </Typography>
            </Box>
            }
        </Stack>
    )
}