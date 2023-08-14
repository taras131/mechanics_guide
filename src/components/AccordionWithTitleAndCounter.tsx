import React, {FC} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Paper} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import {deepPurple} from "@mui/material/colors";

interface IProps {
    title: string
    count: number
    children: React.ReactNode
    handleExpandedChange: any
    expanded: string | false
    panelId: string
}

const AccordionWithTitleAndCounter: FC<IProps> = ({title,
                                                      count,
                                                      handleExpandedChange,
                                                      expanded,
                                                      panelId,
                                                      children}) => {
    return (
        <Accordion expanded={expanded === panelId} onChange={handleExpandedChange(panelId)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls={`${panelId}bh-content`}
                id={`${panelId}bh-header`}
                sx={{width: "100%"}}
            >
                <Grid container alignItems="center" justifyContent="space-between"
                      sx={{width: "100%", paddingRight: "10px"}}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <ChatBubbleOutlineIcon color="primary"/>
                        <Typography fontWeight={500} fontSize={16}>
                            {title}
                        </Typography>
                    </Stack>
                    {count > 0 && (
                        <Avatar sx={{
                            width: 24, height: 24, bgcolor: deepPurple[500], fontSize: "12px"
                        }}>
                            {count}
                        </Avatar>)}
                </Grid>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    );
};

export default AccordionWithTitleAndCounter;