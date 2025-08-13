import Sidebar from './components/Sidebar';
import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';
import { useState } from 'react';
import SelectedProject from './components/SelectedProject';
function App() {

    const [projectState, setProjectState] = useState({
        selectedProjectId: undefined,
        projects: [],
        tasks: []
    });

    function handleAddTask(text) {
        setProjectState((prevState) => {
            const taskId = Math.random();
            const newTask = {
                text: text,
                projectId: prevState.selectedProjectId,
                id: taskId
            }

            return {
                ...prevState,
                tasks: [...prevState.tasks, newTask]
            }
        });
    }

    function handleDeleteTask(taskId) {
       setProjectState((prevState) => {
            return {
                ...prevState,
                // selectedProjectId: undefined,
                tasks: prevState.tasks.filter(
                    (task) => task.id !== taskId)
            }
       });
    }

    function handleSelectProject(projectId) {
        // console.log("Selected project ID:", projectId);
        setProjectState((prevState) => ({
            ...prevState,
            selectedProjectId: projectId
        }));
    }

    function handleStartAddProject() {

        // console.log("Start adding project");
        setProjectState((prevState) => ({
            ...prevState,
            selectedProjectId: null
        }));
    }

    function handleCancelAddProject() {
        setProjectState((prevState) => ({
            ...prevState,
            selectedProjectId: undefined
        }));
    }

    function handleDeleteProject() {
        setProjectState((prevState) => ({
            ...prevState,
            selectedProjectId: undefined,
            projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
        }));
    }

    function handleAddProject(projectData) {
        const projectId = Math.random();
        const newProject = {
            ...projectData,
            id: projectId
        }

        setProjectState((prevState) => ({
            ...prevState,
            selectedProjectId: undefined,
            projects: [...prevState.projects, newProject]
        }));
    }

    const selectedProject = projectState.projects.find((project) => project.id === projectState.selectedProjectId);

    let content = <SelectedProject
        project={selectedProject}
        onDeleteProject={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        tasks={projectState.tasks}
    />;

    if (projectState.selectedProjectId === null) {
        content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />;
    } else if (projectState.selectedProjectId === undefined) {
        content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
    }

    // console.log("Project State:", projectState);

    return (
        <main className="h-screen my-8 flex gap-8" >
            <Sidebar
                onStartAddProject={handleStartAddProject}
                projects={projectState.projects}
                onSelectProject={handleSelectProject}
                selectedProjectId={projectState.selectedProjectId}

            />
            {content}
        </main>
    );
}

export default App;
