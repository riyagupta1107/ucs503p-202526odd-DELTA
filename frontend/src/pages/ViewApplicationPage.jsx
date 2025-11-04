import React from 'react';
import { useParams } from 'react-router-dom';
function ViewApplicationPage() {
    const { projectId } = useParams();
    return <h2>View Applications for Project ID: {projectId}</h2>;
}
export default ViewApplicationPage;