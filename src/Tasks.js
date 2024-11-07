import { Component } from "react"; // Importing the base Component class from React.
// // usage  :Component is a base class provided by React for creating class-based components. When you extend Component, you can create your own React component classes.
import {
    addTask,  // function for adding tasks
    getTasks, // function for fetching tasks
    updateTask, // function for updating tasks
    deleteTask // function for deleting tasks
} from "./services/taskServices"; // importing task services
import { Paper, TextField, Button, Checkbox } from "@material-ui/core"; // Material-UI components

class Tasks extends Component { // creating userdefind component classes from Component class of hte react library
    state = {
        tasks: [],
        currentTask: "",
        editingTaskId: null, // Added for edit mode
        newTaskText: "", // For storing the updated text of the task being edited
    };

    async componentDidMount() {
        try {
            const { data } = await getTasks(); // API call to fetch tasks
            this.setState({ tasks: data });
        } catch (error) {
            console.log(error);
        }
    }

    handleChange = ({ currentTarget: input }) => {
        this.setState({ currentTask: input.value }); // Handle new task input change
    };

    handleSubmit = async (e) => {
        e.preventDefault(); // Add task submission
        const originalTasks = this.state.tasks;
        try {
            const { data } = await addTask({ task: this.state.currentTask });
            const tasks = originalTasks;
            tasks.push(data); // Add task to list
            this.setState({ tasks, currentTask: "" });
        } catch (error) {
            console.log(error);
        }
    };

    handleUpdate = async (currentTask) => {
        const originalTasks = this.state.tasks;
        try {
            const tasks = [...originalTasks];
            const index = tasks.findIndex((task) => task._id === currentTask);
            tasks[index] = { ...tasks[index] };
            tasks[index].completed = !tasks[index].completed; // Toggle completed status
            this.setState({ tasks });
            await updateTask(currentTask, { completed: tasks[index].completed });
        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };

    handleDelete = async (currentTask) => {
        const originalTasks = this.state.tasks;
        try {
            const tasks = originalTasks.filter(task => task._id !== currentTask);
            this.setState({ tasks });
            await deleteTask(currentTask);
        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };

    handleEdit = (task) => { // Set the editing task details
        this.setState({ editingTaskId: task._id, newTaskText: task.task });
    };

    handleEditChange = ({ currentTarget: input }) => {
        this.setState({ newTaskText: input.value }); // Update text for the editing task
    };

    handleEditSubmit = async (e) => {
        e.preventDefault(); // Edit task submission
        const { editingTaskId, newTaskText, tasks: originalTasks } = this.state;
        try {
            const tasks = [...originalTasks];
            const index = tasks.findIndex(task => task._id === editingTaskId);
            tasks[index] = { ...tasks[index], task: newTaskText }; // Update task with new text
            this.setState({ tasks, editingTaskId: null, newTaskText: "" });
            await updateTask(editingTaskId, { task: newTaskText });
        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };

    render() {
        const { tasks, currentTask, editingTaskId, newTaskText } = this.state;
        return (
            <div className="App flex">
                <Paper elevation={3} className="container">
                    <div className="heading">TO-DO</div>
                    <form
                        onSubmit={this.handleSubmit}
                        className="flex"
                        style={{ margin: "15px 0" }}
                    >
                        <TextField
                            variant="outlined"
                            size="small"
                            style={{ width: "80%" }}
                            value={currentTask}
                            required={true}
                            onChange={this.handleChange}
                            placeholder="Add New TO-DO"
                        />
                        <Button
                            style={{ height: "40px" }}
                            color="primary"
                            variant="outlined"
                            type="submit"
                        >
                            Add task
                        </Button>
                    </form>

                    {editingTaskId ? (
                        <form
                            onSubmit={this.handleEditSubmit}
                            className="flex"
                            style={{ margin: "15px 0" }}
                        >
                            <TextField
                                variant="outlined"
                                size="small"
                                style={{ width: "80%" }}
                                value={newTaskText}
                                required={true}
                                onChange={this.handleEditChange}
                                placeholder="Edit TO-DO"
                            />
                            <Button
                                style={{ height: "40px" }}
                                color="primary"
                                variant="outlined"
                                type="submit"
                            >
                                Save Changes
                            </Button>
                        </form>
                    ) : null}

                    <div>
                        {tasks.map((task) => (
                            <Paper key={task._id} className="flex task_container">
                                <Checkbox
                                    checked={task.completed}
                                    onClick={() => this.handleUpdate(task._id)}
                                    color="primary"
                                />
                                <div className={task.completed ? "task line_through" : "task"}>
                                    {task.task}
                                </div>
                                <Button onClick={() => this.handleEdit(task)} color="primary">
                                    Modify
                                </Button>
                                <Button onClick={() => this.handleDelete(task._id)} color="secondary">
                                    Delete
                                </Button>
                            </Paper>
                        ))}
                    </div>
                </Paper>
            </div>
        );
    }
}

export default Tasks;

