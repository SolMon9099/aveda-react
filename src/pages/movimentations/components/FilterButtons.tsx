import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import Label from "src/components/Label";

export default function FilterButtons({ transactionHook }: any){
    let buttons = transactionHook.FILTER_BUTTONS;
    return(
        <Grid container md={12} >
            {buttons?.length > 0 && buttons.map((button: any) => {
                return (
                    <Grid md={3} justifyContent={'center'} alignItems={'center'} display={'flex'} padding={1} minHeight={98}>
                        <Card 
                            sx={{
                                width: '100%',
                                backgroundColor: button.backgroundColor,
                            }}
                        >
                            <CardContent>
                                <Typography
                                    textAlign={'center'}
                                    variant="h3"
                                    color={button.color}>
                                    {button.amount}
                                </Typography>
                                <Typography
                                    textAlign={'center'}
                                    variant="subtitle2"
                                    color={button.color}>
                                    {button.label}
                                </Typography>                              
                            </CardContent>
                        </Card>
                    </Grid>
                )
            })}
        </Grid>
        
    )
}