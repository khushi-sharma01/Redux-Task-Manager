import React, { useState } from "react";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch } from "react-redux";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [taskId, setTaskId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [assignDate, setAssignDate] = useState(null); // Changed to null as initial state
  const [finishDate, setFinishDate] = useState(null); // Changed to null as initial state
  const [assignTo, setAssignTo] = useState("");
  const [status, setStatus] = useState("");
  const [picture, setPicture] = useState({
    file: "https://cdn0.iconfinder.com/data/icons/employee-and-business-fill/512/Office_Staff-1024.png",
    
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const handlePicture = (event) => {
    setPicture({
      file: URL.createObjectURL(event.target.files[0]),
    
    });
  };
  const handleError = (label, msg) => {
    setError((prev) => ({ ...prev, [label]: msg }));
  };
  const handleSubmit = () => {
    const formattedAssignDate = assignDate ? dayjs(assignDate).format('YYYY-MM-DD') : null;
    const formattedFinishDate = finishDate ? dayjs(finishDate).format('YYYY-MM-DD') : null;
    
    const body = {
      taskid: taskId,
      taskname: taskName,
      assigndate: formattedAssignDate,
      finishdate: formattedFinishDate,
      assignto: assignTo,
      status: status,
      picture:picture.file
    };
  
    Toast.fire({
      icon: "success",
      title: "Task Edited successfully"
    });
    
  
    dispatch({
      type: "ADD_TASK",
      payload: [taskId, body],
    });
  };
  
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 500,
          height: "auto",
          padding: 10,
          margin: 10,
          backgroundColor: "#c4e7cc",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} style={{display:'flex'}}>
            <div>
              <h2>Add Task</h2>
            </div>
            <div
              style={{ cursor: "pointer", marginLeft: "auto" ,marginTop:'19px' }}
              onClick={() => navigate("/displaytask")}
            >
              <ReceiptLongIcon  />
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              onChange={(e) => {
                setTaskId(e.target.value);
              }}
              label="Task id"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              onChange={(e) => {
                setTaskName(e.target.value);
              }}
              label="Task Name"
            />
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Assign Date"
                value={assignDate}
                onChange={(date) => setAssignDate(date)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Finish Date"
                value={finishDate}
                onChange={(date) => setFinishDate(date)}
                minDate={assignDate}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Assigned To"
              onChange={(e) => {
                setAssignTo(e.target.value);
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              component="label"
              fullWidth
              style={{ backgroundColor: "#2c4532" }}
            >
              Upload
              <input
                onClick={() => handleError("picture", null)}
                onChange={handlePicture}
                type="file"
                hidden
                accept="images/*"
                multiple
              />
            </Button>
            {error.picture ? (
              <span
                style={{ fontFamily: "Kanit", color: "#d32f2f", fontSize: 13 }}
              >
                {error.picture}
              </span>
            ) : (
              <></>
            )}
          </Grid> 
          <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              style={{ width: "45px" }}
              alt="Remy Sharp"
              src={picture.file}
              variant="rounded"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Status of task
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <FormControlLabel
                  value="Complete"
                  control={<Radio />}
                  label="Complete"
                />
                <FormControlLabel
                  value="Pending"
                  control={<Radio />}
                  label="Pending"
                />
                <FormControlLabel
                  value="Not Completed"
                  control={<Radio />}
                  label="Not Completed"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button
              style={{ backgroundColor: "#2c4532" }}
              variant="contained"
              fullWidth
              onClick={handleSubmit}
            >
              Add Task
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              style={{ backgroundColor: "#2c4532" }}
              variant="contained"
              fullWidth
              onClick={handleSubmit}
            >
              Reset Task
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
