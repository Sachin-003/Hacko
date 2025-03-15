
const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getNewProjects,
  updateRequests,
  getMyProjects,
  remove_from_requests,
  add_members,
  remove_member,
} = require('../controllers/projectController'); 


router.get('/', getAllProjects);           
router.get('/:id', getProjectById);         
router.post('/', createProject);            
router.put('/:id', updateProject);         
router.delete('/:id', deleteProject);      
router.get('/user/:userId', getNewProjects);
router.put('/:projectId/request', updateRequests);
router.get('/user/:userId/projects',getMyProjects);
router.put('/:projectId/remove_request', remove_from_requests);
router.put('/:projectId/add_member',add_members);
router.put('/:projectId/remove_member',remove_member);

module.exports = router;
