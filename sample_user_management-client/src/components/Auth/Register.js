import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  TextareaAutosize,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import ImageUpload from "../ImageUpload/ImageUpload";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    margin: "0 auto",
    marginTop: theme.spacing(8),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  inputField: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  textarea: {
    marginBottom: theme.spacing(2),
    resize: "none",
    width: "100%",
  },
}));

const Register = ({ handleLogin }) => {
  const navigate = useNavigate();
  const { isLoggedIn, dispatch } = useContext(AuthContext);
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [crPassword, setCrPassword] = useState("");
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [remark, setRemark] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCrPassword, setShowCrPassword] = useState(false);
  const [images, setImages] = useState([
    {
      imageId: 1,
      imagePath: "",
      cardName: "Primary Image *",
      imagePriority: 1,
      inputId: "image-file-1",
    },
    {
      imageId: 2,
      imagePath: "",
      cardName: "Secondary Image *",
      imagePriority: 2,
      inputId: "image-file-2",
    },
  ]);

  const handleImageChange = (id, imagePath) => {
    const updatedImages = images.map((image) =>
      image.imageId === id ? { ...image, imagePath } : image
    );
    setImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password != crPassword) {
        console.log("Passwords are not Match");
        return;
      } else if (!gender) {
        console.log("Choose Your Gender");
        return;
      } else if (
        !images.some(
          (image) => image.imageId === 1 && image.imagePath !== ""
        ) ||
        !images.some((image) => image.imageId === 2 && image.imagePath !== "")
      ) {
        console.log("Must Upload Two type of Images");
        return;
      } else {
        const user = {
          title,
          firstName,
          lastName,
          dateOfBirth,
          gender,
          email,
          password,
          remark,
        };

        const res = await axios.post(
          "http://localhost:5000/api/users/register",
          {
            user,
            images,
          }
        );
        console.log("🚀 ~ file: Register.js:105 ~ handleSubmit ~ res:", res);
        window.location.href = "/";
      }
    } catch (error) {
      console.log("🚀 ~ file: Login.js:38 ~ handleSubmit ~ error:", error);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleCrPasswordVisibility = () => {
    setShowCrPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Register
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
            className={classes.inputField}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            margin="normal"
            className={classes.inputField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Conform Password"
            type={showCrPassword ? "text" : "password"}
            value={crPassword}
            onChange={(e) => setCrPassword(e.target.value)}
            required
            margin="normal"
            className={classes.inputField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleToggleCrPasswordVisibility}>
                    {showCrPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControl component="fieldset" className={classes.inputField}>
            <FormLabel component="legend">Title</FormLabel>
            <RadioGroup
              aria-label="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            >
              <FormControlLabel value="MR" control={<Radio />} label="MR" />
              <FormControlLabel value="MRS" control={<Radio />} label="MRS" />
            </RadioGroup>
          </FormControl>
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            margin="normal"
            className={classes.inputField}
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            margin="normal"
            className={classes.inputField}
          />
          <TextField
            label="Date of Birth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
            margin="normal"
            className={classes.inputField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl className={classes.inputField}>
            <InputLabel htmlFor="gender-select">Gender</InputLabel>
            <Select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              inputProps={{
                name: "gender",
                id: "gender-select",
              }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <div className="flex_center">
            {images.map((image) => (
              <ImageUpload
                key={image.imageId}
                imagePath={image.imagePath}
                setimagePath={(imagePath) =>
                  handleImageChange(image.imageId, imagePath)
                }
                cardName={image.cardName}
                inputId={image.inputId}
              />
            ))}
          </div>
          <TextField
            label="Remark"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            multiline
            rows={4}
            margin="normal"
            className={classes.textarea}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitButton}
          >
            Register
          </Button>
          <div className="auth_link" onClick={() => handleLogin()}>
            Have an account? Login Now
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Register;
