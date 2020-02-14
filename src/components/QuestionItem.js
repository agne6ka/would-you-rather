import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "20px auto"
  },
  media: {
    width: 80,
    height: 80,
    float: "right"
  }
});

function QuestionItem(props) {
  const classes = useStyles();
  const { userName, avatarURL, optionOne, optionTwo } = props;
  return (
    <div className="QuestionItem">
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Avatar
              variant="rounded"
              className={classes.media}
              src={avatarURL}
            ></Avatar>
            <Typography variant="subtitle2">{userName}:</Typography>
            <Typography gutterBottom variant="h5" component="h2">
              Would you rather?
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              * {optionOne}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              * {optionTwo}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="secondary">
            VIEW POLL
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default QuestionItem;
