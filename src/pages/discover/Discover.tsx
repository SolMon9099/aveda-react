import { Box, Container, Stack, Typography, Grid } from "@mui/material";
import Page from "src/components/Page";
import { useSelector } from "src/redux/store";
import CommunityCard from "./components/CommunityCard";
import useDiscover from "./hooks/Discover.hook";


export default function Discover(){
    const { discoverHook } = useDiscover()
    const { allCommunities, isLoadingDiscover } = useSelector((state) => state.community)

    return(
        <Page title="Salvos">
            <Container maxWidth='lg' sx={{ mt: 3 }}>
                <Stack spacing={3}>
                    <Typography variant='h4'>
                        Descobrir Comunidades
                    </Typography>
                    {!isLoadingDiscover && allCommunities.length === 0 ?
                        <Box flexGrow={1} alignItems='center' justifyContent='center' display='flex' sx={{pt: 5}}>
                            <Typography>
                                Nenhuma comunidade encontrada
                            </Typography>
                        </Box>
                        :
                        <Box flexGrow={1}>
                            <Grid container spacing={2}>
                                {allCommunities.map((community, idx) =>
                                    <Grid item key={'COMMUNITY_CARD_'+community._id+idx} lg={4} md={6} sm={12}>
                                        <CommunityCard discoverHook={discoverHook} community={community}/>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    }
                </Stack>
            </Container>
        </Page>
    )
}