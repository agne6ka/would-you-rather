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
import Badge from "@material-ui/core/Badge";
import Image from "material-ui-image";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "100%",
    margin: "0 auto 25px",
    position: "relative"
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
    textAlign: "right",
    height: 80,
    lineHeight: 80
  },
  score: {
    backgroundColor: "#F6AE2D",
    color: "#2F4858",
    marginBottom: 10
  },
  badge: {
    position: "absolute",
    bottom: "25%",
    right: 38
  },
  badgeContent: {
    color: "#2F4858",
    transform: "translateX(-50%)"
  },
  medal: {
    width: 90,
    position: "absolute",
    left: 0,
    top: 10,
    zIndex: 10
  }
}));

function LeaderBoardItem(props) {
  const classes = useStyles();
  const { avatarURL, userName, answers, questions, score, place } = props;

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          {place < 3 && (
            <div className={classes.medal}>
              <Image src={`/img/medal_${place + 1}.svg`} />
            </div>
          )}
          <Avatar
            variant="rounded"
            className={classes.media}
            src={avatarURL}
          ></Avatar>
          <Typography className={classes.name} variant="h5" component="h2">
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
          <Badge
            className={classes.badge}
            overlap="rectangle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            badgeContent={
              <Typography className={classes.badgeContent}>score</Typography>
            }
          >
            <Avatar className={classes.score}>{score}</Avatar>
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
}
export default LeaderBoardItem;
