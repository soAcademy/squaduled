import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    textAlign: "center",
    marginTop: "20px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    flexBasis: "100%",
    flexShrink: 0,
  },
  content: {
    textAlign: "left",
  },
  bg: {
    backgroundColor: "#dbdbdb",
  },
}));

const LoginInfo = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <div className={classes.root}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          className={classes.bg}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>
              ต้องการเข้าสู่ระบบ ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.content}>
              <div className="grid grid-flow-row grid-cols-3 gap-4 text-center">
                <span>สิทธิ์การเข้าถึง </span>
                <span>ชื่อผู้ใช้</span>
                <span>รหัสผ่าน</span>
                <span>ผู้ดูแลระบบ </span>
                <span>10001 - 10003</span>
                <span>888888</span>
                <span>ผู้ใช้ทั่วไป </span>
                <span>10004 - 10015</span>
                <span>888888</span>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default LoginInfo;
