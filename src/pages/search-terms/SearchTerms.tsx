import { IconButton, Box, Button, Container, MenuItem, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Page from "src/components/Page";
import SearchTermList from "./components/SearchTermList";
import SearchTermHandle from "./components/SearchTermHandle";
import useSearchTerm from "./hooks/SearchTerms.hook";

export default function SearchTerms(){
    const { searchTermHook } = useSearchTerm()
    const navigate = useNavigate()
    
    return(
        <Page title="Movimentações">
            <Container maxWidth='lg' sx={{ mt: 3, marginBottom: '20px' }}>
                <Stack>
                    {searchTermHook.currentPage === 'list' && (
                        <SearchTermList searchTermHook={searchTermHook} />
                    )}

                    {searchTermHook.currentPage === 'handle' && (
                        <SearchTermHandle searchTermHook={searchTermHook} />
                    )}
                </Stack>
            </Container>
        </Page>
    )
}