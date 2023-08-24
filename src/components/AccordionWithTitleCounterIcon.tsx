import React, {FC} from 'react';
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {deepPurple} from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {CENTER, ROW, SPACE_BETWEEN} from "../utils/const";
import {fontSizePx} from "../utils/stylesConst";

interface IProps {
    children: React.ReactNode
    count: number
    expanded: string | false
    handleExpandedChange: any
    icon: React.ReactNode
    panelId: string
    title: string
}

const AccordionWithTitleCounterIcon: FC<IProps> = ({
                                                       children,
                                                       count,
                                                       expanded,
                                                       handleExpandedChange,
                                                       icon,
                                                       panelId,
                                                       title
                                                   }) => {
    return (
        <Accordion expanded={expanded === panelId} onChange={handleExpandedChange(panelId)}>
            <AccordionSummary
                aria-controls={`${panelId}bh-content`}
                expandIcon={<ExpandMoreIcon/>}
                id={`${panelId}bh-header`}
                sx={{width: "100%"}}
            >
                <Grid alignItems={CENTER}
                      container
                      justifyContent={SPACE_BETWEEN}
                      sx={{paddingRight: "10px", width: "100%"}}>
                    <Stack alignItems={CENTER} direction={ROW} spacing={1}>
                        {icon}
                        <Typography fontSize={16} fontWeight={500}>
                            {title}
                        </Typography>
                    </Stack>
                    {count > 0 && (
                        <Avatar sx={{
                            bgcolor: deepPurple[500],
                            fontSize: fontSizePx.small,
                            height: 24,
                            width: 24
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

export default AccordionWithTitleCounterIcon;