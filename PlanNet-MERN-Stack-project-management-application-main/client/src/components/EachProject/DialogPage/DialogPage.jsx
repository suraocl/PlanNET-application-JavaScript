import * as React from 'react';
import "./dialog.css"
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import EachTask from '../../EachTask/EachTask';
import EachTaskListing from './EachTasksListing';



function SimpleDialog({ handleClose, open, projectId }) {

    const [tasks, settasks] = React.useState({});

    const fetchTasks = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/projects/getTasksOnProject/" + projectId)
            const data = await res.json()
            settasks(data.data)

        } catch (error) {
            console.log(error);
        }

    }
    console.log(tasks);

    React.useEffect(() => {
        fetchTasks()
    }, []);

    return (
        <Dialog maxWidth={"lg"} className='asd' onClose={handleClose} open={open}>

            <div style={{minWidth: "900px"}} className='d-flex flex-wrap justify-content-center'>
                    
                {tasks && tasks.length > 0  && tasks.map((element) => {
                    return (<EachTaskListing getTasks={fetchTasks} task={element} key={element.taskId}></EachTaskListing>)
                })}
            </div>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default SimpleDialog;