import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "100%",
    margin: "20px auto"
  },
  media: {
    width: 80,
    height: 80,
    float: "right",
    marginLeft: 20
  },
  list: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  inline: {
    display: "inline"
  },
  name: {
    textAlign: "right"
  }
}));

function LeaderBoardItem(props) {
  const classes = useStyles();
  const { avatarURL, userName, answers, questions, score } = props;

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Avatar
            variant="rounded"
            className={classes.media}
            src={avatarURL}
          ></Avatar>
          <Typography
            className={classes.name}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {userName}
          </Typography>
          <List className={classes.list}>
            <ListItem>
              <ListItemText
                className={classes.listItem}
                primary="Questions answered"
                secondary={answers}
              />
            </ListItem>
            <Divider variant="middle" component="li" />
            <ListItem>
              <ListItemText
                className={classes.listItem}
                primary="Questions created"
                secondary={questions}
              />
            </ListItem>
            <Divider variant="middle" component="li" />
          </List>
        </CardContent>
      </Card>
    </div>
  );
}
export default LeaderBoardItem;
