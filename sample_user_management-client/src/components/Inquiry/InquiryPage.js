import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import axios from "axios";
import InquiryUserList from "./InquiryUserList";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
  inputField: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

const InquiryPage = () => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dobStart, setDobStart] = useState("1900-01-01");
  const [dobEnd, setDobEnd] = useState(new Date().toISOString().split("T")[0]);
  const [gender, setGender] = useState("");
  const [users, setUsers] = useState([]);
  console.log("🚀 ~ file: InquiryPage.js:42 ~ InquiryPage ~ users:", users)

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://localhost:5000/api/users/search?FirstName=${firstName}&LastName=${lastName}&FromDateOfBirth=${dobStart}&ToDateOfBirth=${dobEnd}&Gender=${gender}`
      )
      if (res.data.length === 0) {
        toast.warn("No users founded", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      }
      setUsers(res.data)
    } catch (error) {
      console.log(
        "🚀 ~ file: InquiryPage.js:61 ~ handleSearch ~ error:",
        error
      );
    }
  };

  const handleClear =()=>{
    setFirstName('')
    setLastName('')
    setDobStart("1900-01-01")
    setDobEnd(new Date().toISOString().split("T")[0])
    setGender('')
    setUsers([])
  }


  if (users.length === 0) {
    return (
        <>
        <ToastContainer />
        <form className={classes.form} onSubmit={handleSearch}>
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            margin="normal"
            className={classes.inputField}
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            margin="normal"
            className={classes.inputField}
          />
          <TextField
            label="Date of Birth Start"
            type="date"
            value={dobStart}
            onChange={(e) => setDobStart(e.target.value)}
            margin="normal"
            className={classes.inputField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Date of Birth End"
            type="date"
            value={dobEnd}
            onChange={(e) => setDobEnd(e.target.value)}
            margin="normal"
            className={classes.inputField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl component="fieldset" className={classes.inputField}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Search
          </Button>
        </form>
        </>
      );
  } else {
    return (
        <>
        <ToastContainer />
        <div className="main_inquiry">
            <div className="search_con">
            <form className={classes.form} onSubmit={handleSearch}>
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            margin="normal"
            className={classes.inputField}
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            margin="normal"
            className={classes.inputField}
          />
          <TextField
            label="Date of Birth Start"
            type="date"
            value={dobStart}
            onChange={(e) => setDobStart(e.target.value)}
            margin="normal"
            className={classes.inputField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Date of Birth End"
            type="date"
            value={dobEnd}
            onChange={(e) => setDobEnd(e.target.value)}
            margin="normal"
            className={classes.inputField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl component="fieldset" className={classes.inputField}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
      <div className="d-flex">
      <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Search
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleClear}
          >
            Clear
          </Button>
      </div>
        </form>
            </div>
            <div className="user_list">
                <InquiryUserList inquiries={users}/>
            </div>
        </div>
      
        </>
      );
  }
 
};

export default InquiryPage;
