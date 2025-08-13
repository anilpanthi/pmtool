import Sidebar from './components/Sidebar';
import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';
import { useState } from 'react';
function App() {

    const [projectState, setProjectState] = useState({
        selectedProjectId: undefined,
        projects: []
    });


    function handleStartAddProject() {

        // console.log("Start adding project");
        setProjectState((prevState) => ({
            ...prevState,
            selectedProjectId: null
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
    

    let content;

    if (projectState.selectedProjectId === null) {
        content = <NewProject onAdd={handleAddProject}/>;
    } else if (projectState.selectedProjectId === undefined) {
        content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
    }

    // console.log("Project State:", projectState);

    return (
        <main className="h-screen my-8 flex gap-8" >
            <Sidebar onStartAddProject={handleStartAddProject} projects={projectState.projects} />
            {content}
        </main>
    );
}

export default App;
