import React, { useState } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    margin: 'auto',
    marginTop: theme.spacing(8),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
  imagePreview: {
    marginTop: theme.spacing(1),
    width: '100%',
    maxWidth: 100,
    maxHeight:100
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(0),

  },
}));

const ImageUpload = ({imagePath,setimagePath,cardName,inputId}) => {
  const classes = useStyles();
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/jpeg' && file.size <= 2000000) {
      handleUpload(file)
      const reader = new FileReader();
      reader.onload = () => {
        setimagePath(reader.result);
      };
      reader.readAsDataURL(file);     
    } else {
      // Invalid file type or size
      setimagePath('');
      alert('Please select a valid JPEG image file (Max size: 2MB)');
    }
  };

  const handleUpload = async(imageFile) => {
    if (imageFile) {
        setUploading(true);
        const formData = new FormData();
        formData.append('files', imageFile);
  
        await axios
          .post('http://localhost:5000/api/images', formData)
          .then((response) => {
            // Process the API response
            console.log('Image upload response:', response.data);
            // Update the image URL or perform any other necessary actions
            // based on the response data
          })
          .catch((error) => {
            console.error('Image upload error:', error);
            // Handle error scenarios
          })
          .finally(() => {
            setUploading(false);
          });
      }
  };

  const handleRemove = () => {
    setimagePath('');
  };

  return (
    <Card className={classes.root}>
      <CardContent>
      <Typography variant="h7" component="h7">
          {cardName}
        </Typography>
        <form className={classes.form}>
          <input
            accept="image/jpeg"
            className={classes.input}
            id={inputId}
            type="file"
            onChange={handleFileChange}
          />
          {!imagePath && <label htmlFor={inputId}>
            <Button variant="contained" color="primary" component="span">
              Choose File
            </Button>
          </label>}
          {imagePath && (
            <Box className={classes.imagePreview}>
              <img src={imagePath} alt="Preview" width="100%" />
            </Box>
          )}
          {uploading ? (
            <CircularProgress className={classes.buttonContainer} />
          ) : (
            <Box className={classes.buttonContainer}>
              {imagePath && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleRemove}
                >
                  Remove
                </Button>
              )}
            </Box>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
