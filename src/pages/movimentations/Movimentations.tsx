import { Button, Container, MenuItem, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Iconify from "src/components/Iconify";
import MenuPopover from "src/components/MenuPopover";
import Page from "src/components/Page";
import MovimentationsTabs from "./components/MovimentationsTabs";
import Description from "./components/Description";
import TransactionLit from "./components/TransactionList";
import ProceduralList from "./components/ProceduralList";
import useMovimentation from "./hooks/Movimentations.hook";

export default function Movimentations(){
    const { movimentationHook } = useMovimentation()
    const navigate = useNavigate()

    return(
        <Page title="Movimentações">
            <Container maxWidth='lg' sx={{ mt: 3 }}>
                <Stack spacing={3}>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                        <Typography variant='h4'>
                            Movimentações
                        </Typography>
                        <Button
                            onClick={(e) => movimentationHook.setOpenPopover(e.currentTarget)}
                            variant='contained'
                            endIcon={<Iconify icon='ic:round-expand-more'/>}
                        >
                            Pesquisa
                        </Button>
                    </Stack>
                    <MovimentationsTabs movimentationHook={movimentationHook}/>
                    {movimentationHook.currentTab === 1 && (
                        // <Description />
                        <TransactionLit movimentationHook={movimentationHook} />
                    )}
                    {movimentationHook.currentTab === 2 && (
                        <ProceduralList movimentationHook={movimentationHook} />
                    )}
                </Stack>
            </Container>
            <MenuPopover
                open={Boolean(movimentationHook.openPopover)}
                anchorEl={movimentationHook.openPopover}
                onClose={() => movimentationHook.setOpenPopover(null)}
                sx={{
                  '& .MuiMenuItem-root': {
                    px: 1,
                    typography: 'body2',
                    borderRadius: 0.75,
                  },
                }}
                disabledArrow
            >
                {movimentationHook.POPOVER_OPTIONS.map((opt: {to: string, label: string}) =>
                    <MenuItem
                        key={'OPT_'+opt.to}
                        onClick={() => navigate(opt.to)}
                    >
                        {opt.label}
                    </MenuItem>
                )}
            </MenuPopover>
        </Page>
    )
}