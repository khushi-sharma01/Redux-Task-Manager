import MaterialTable from "@material-table/core";
import {useSelector} from 'react-redux';
import {useStyles} from "./CSSDisplayTask";
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
import { Dialog,DialogContent,DialogActions,DialogTitle } from "@mui/material";

export default function DisplayTask (){
  var data =useSelector(state=>state.data)
 
  var employee=Object.values(data)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [taskId, setTaskId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [assignDate, setAssignDate] = useState(dayjs()); // Assuming initial value is current date
  const [finishDate, setFinishDate] = useState(dayjs()); // Assuming initial value is current date
  // Changed to null as initial state
  const [assignTo, setAssignTo] = useState("");
  const [status, setStatus] = useState("");
  const classes = useStyles();
  const [open,setOpen]=useState(false)
  const [refresh,setRefresh]=useState(false)
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
      title: "Task added successfully"
    });
    
  
    dispatch({
      type: "EDIT_TASK",
      payload: [taskId, body],
    });
  };
   
  const handlePicture = (event) => {
    setPicture({
      file: URL.createObjectURL(event.target.files[0]),
    
    });
  };
  const handleError = (label, msg) => {
    setError((prev) => ({ ...prev, [label]: msg }));
  };

const handleEdit=(rowData)=>{
  setOpen(true)
  setTaskId(rowData.taskid)
  setTaskName(rowData.taskname)
  setAssignDate(dayjs(rowData.assigndate));
  setFinishDate(dayjs(rowData.finishdate));
  
  setAssignTo(rowData.assignto)
  setStatus(rowData.status);
  // Also, ensure you're setting the state variable picture, not calling a function named picture
  setPicture({ file: rowData.picture });

}

const handleDelete=(rowData)=>{

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      setRefresh(!refresh)
      dispatch({
        type: "DELETE_TASK",
        payload: [rowData.taskid],
        
      });
      Swal.fire({
        title: "Deleted!",
        text: "Your task has been deleted.",
        icon: "success"
      });
    }
  });
  
}
  function EditTaskDialog(){
    
    return(
      <Dialog open={open}>
      <DialogTitle>Edit Assigned Task</DialogTitle>
      <DialogContent>
       
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
          <Grid item xs={12}>
            <div>
              <h2>Add Task</h2>
            </div>
            <div
              style={{ cursor: "pointer", marginLeft: "auto" }}
              onClick={() => navigate("/displaytask")}
            >
              <ReceiptLongIcon width="30" />
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              onChange={(e) => {
                setTaskId(e.target.value);
              }}
              value={taskId}
              label="Task id"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              onChange={(e) => {
                setTaskName(e.target.value);
              }}
              value={taskName}
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
            value={assignTo}
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
         
        </Grid>
      </div>

      </DialogContent>
      <DialogActions>
        <Button onClick={(event)=>handleSubmit()}>Edit</Button>
        <Button onClick={(e)=>setOpen(false)}>Close</Button>
      </DialogActions>
      </Dialog>
    )
  }  

    function ShowTask() {
        return (
          
          <MaterialTable
            title="Assigned Task List"
            columns={[
              { title: 'Task ID', field: 'taskid' },
              { title: 'Task Name', field: 'taskname' },
              { title: 'Assigned Date', field: 'assigndate' },
              { title: 'Finish Date', field: 'finishdate' },
              { title: 'Assigned To', field: 'assignto' },
              { title: 'Status', field: 'status' },
              { title: 'Picture', render:(rowData) =><img src={`${rowData.picture}`} style={{width:70, borderRadius:'5'}}></img>},
            ]}
            data={employee}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Eit task',
                onClick: (event, rowData) => handleEdit(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete task',
                onClick: (event, rowData) => handleDelete(rowData)
              },{
                icon:'add',
                isFreeAction:true,
                onClick:(event)=>navigate('/addtask')
              }
            ]}
          />
        )
      }
    return (<div className={classes.root}>
      <div className={classes.table}>{ShowTask()}{EditTaskDialog()}</div></div>)
}