import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  CardHeader,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '90%',
    margin: '0 auto',
    marginTop: theme.spacing(2),
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(2),
  },
}));

const InquiryUserList = ({inquiries}) => {
  const classes = useStyles();

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div>
      {inquiries.map((inquiry) => (
        <Card key={inquiry.email} className={classes.root}>
          <CardHeader
            avatar={<Avatar alt={inquiry.firstName} src={inquiry.images[0].imagePath} className={classes.avatar} />}
            title={`${capitalizeFirstLetter(inquiry.title)} ${capitalizeFirstLetter(inquiry.firstName)} ${capitalizeFirstLetter(inquiry.lastName)}`}
            subheader={inquiry.email}
          />
        </Card>
      ))}
    </div>
  )
}

export default InquiryUserList