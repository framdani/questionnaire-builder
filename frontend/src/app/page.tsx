'use client'
import Image from 'next/image'
import { useState } from 'react';
import { AppBar, Toolbar, List, ListItem, ListItemText, makeStyles, ListItemSecondaryAction, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { ReactQueryDevtools } from 'react-query/devtools';
import Button from '@mui/material/Button';


import { Add, Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

import { ApolloClient, ApolloProvider, InMemoryCache, gql, useMutation, useQuery } from '@apollo/client';
import { useIsMutating } from 'react-query';


const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});



interface Survey {
  id: number;
  name: string;
}

interface Section {
  id: number;
  name: string;
}

interface Question {
  id: number;
  text: string;
}

// GraphQl queries and mutations
const GET_ALL_QUESTIONNAIRES = gql`
  query {
    questionnaire {
      id
      name
    }
  }
`;

const CREATE_QUESTIONNAIRE = gql`
  mutation CreateQuestionnaire($name: String!) {
    createQuestionnaire(name: $name) {
      id
      name
    }
  }
`;

const UPDATE_QUESTIONNAIRE = gql`
  mutation UpdateQuestionnaire($id: Float!, $name: String!) {
    updateQuestionnaire(id: $id, name: $name)
  }
`;

const DELETE_QUESTIONNAIRE = gql`
  mutation DeleteQuestionnaire($id: Float!) {
    removeQuestionnaire(id: $id)
  }
`;

const CREATE_QUESTION = gql`
  mutation CreateQuestion($text: String!, $id: Float!) {
    createQuestion(text: $text, id: $id) {
      id
      text
    }
  }
`;
const GET_ALL_QUESTIONS = gql`
query question($id: Float!) {
  question(id: $id) {
    id
    text
  }
}
`;

const UPDATE_QUESTION = gql`
  mutation UpdateQuestion($id: Float!, $text: String!) {
    updateQuestion(id: $id, text: $text)
  }
`;

const DELETE_QUESTION = gql`
  mutation DeleteQuestion($id: Float!) {
    removeQuestion(id: $id)
  }
`;

const CREATE_SECTION = gql`
  mutation CreateSection($name: String!, $id: Float!) {
    createSection(name: $name, id: $id) {
      id
      name
    }
  }
`;
const GET_ALL_SECTIONS = gql`
  query section($id: Float!) {
    section(id: $id) {
      id
      name
    }
  }
`;

const UPDATE_SECTION = gql`
  mutation UpdateSection($name: String!,$id: Float!) {
    updateSection(name: $name, id: $id)
  }
`;

const DELETE_SECTION = gql`
  mutation DeleteSection($id: Float!) {
    removeSection(id: $id)
  }
`;

const Surveys = () => {
  const [openCreateQuestionDialog, setOpenCreateQuestionDialog] = useState(false);
  const [openEditQuestionDialog, setOpenEditQuestionDialog] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('')

  const [selectedSectionId, setSelectedSectionId] = useState(0);
  const [selectedSurveyId, setSelectedSurveyId] = useState(0);
  const [selectedQuestonId, setSelectedQuestionId] = useState(0)
  const { data, loading, error } = useQuery(GET_ALL_QUESTIONNAIRES);
  const [createQuestionnaire] = useMutation(CREATE_QUESTIONNAIRE,{
    refetchQueries: [{ query: GET_ALL_QUESTIONNAIRES}]});
  
    const [createSection] = useMutation(CREATE_SECTION, {
      refetchQueries: [
        { query: GET_ALL_SECTIONS, variables: { id: selectedSurveyId } },
      ],
    });
  
    const [createQuestion] = useMutation(CREATE_QUESTION, {
      refetchQueries: [
        { query: GET_ALL_QUESTIONS, variables: { id: selectedSectionId } },
      ],
    });

  const [updateQuestionnaire] = useMutation(UPDATE_QUESTIONNAIRE,
    {refetchQueries: [{ query: GET_ALL_QUESTIONNAIRES}]});

  const [updateSection] = useMutation(UPDATE_SECTION, {
    refetchQueries: [
      { query: GET_ALL_SECTIONS, variables: { id: selectedSurveyId } },
    ],
  });
  const [updateQuestion] = useMutation(UPDATE_QUESTION, { refetchQueries: [{ query: GET_ALL_QUESTIONS, variables: { id: selectedSectionId } },]});
  const [deleteQuestionnaire] = useMutation(DELETE_QUESTIONNAIRE,
    {refetchQueries: [{ query: GET_ALL_QUESTIONNAIRES}, {query: GET_ALL_QUESTIONS, variables: { id: selectedSectionId}},{query: GET_ALL_SECTIONS, variables: { id: selectedSurveyId }},]});
  
    const [deleteSection]= useMutation(DELETE_SECTION, {refetchQueries: [{ query: GET_ALL_SECTIONS, variables: { id: selectedSurveyId } }, {query: GET_ALL_QUESTIONS, variables: { id: selectedSectionId}},]});
    const [deleteQuestion]=useMutation(DELETE_QUESTION, { refetchQueries: [{ query: GET_ALL_QUESTIONS, variables: { id: selectedSectionId } },]});
    const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);

  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  const [openCreateSectionDialog, setOpenCreateSectionDialog] = useState(false);

  const [newSectionName, setNewSectionName] = useState('');
  const [openEditSectionDialog, setOpenEditSectionDialog]=useState(false)



  const { data: sectionsData, loading: sectionsLoading, error: sectionsError, refetch: refetchSections } = useQuery(GET_ALL_SECTIONS, {
    variables: { id: selectedSurveyId },

  });

  const { data: questionsData, loading: questionsLoading, error: questionsError } = useQuery(GET_ALL_QUESTIONS, {
    variables: { id: selectedSectionId },
  });
  


  const handleCreateQuestionnaire = async () => {
    try {
      await createQuestionnaire({ variables: { name: newName } });
      setOpen(false);
      setNewName('');
      
    } catch (error) {
      console.log('Error creating questionnaire:');
      console.log(error.status)
    }
  };

  const handleCreateSection = async () => {
  try {
    await createSection({
      variables: {
        name: newSectionName, 
        id: selectedSurveyId 
      }
    });

    setNewSectionName('')

    setOpenCreateSectionDialog(false);
  } catch (error) {
    console.log('Error creating section:', error);
  }
};

const handleCreateQuestion = async() =>{
  try{
    await createQuestion({
      variables:{
        text:newQuestionText,
        id:selectedSectionId
      }

    })
    setNewQuestionText('')
    setOpenCreateQuestionDialog(false);
  }catch(error){
    console.log('Error creating question', error);
  }
}

  const handleEditQuestionnaire = async () => {
    try {
 
      let convertedId = parseFloat(selectedQuestionnaire.id)
      await updateQuestionnaire({ variables: { id: convertedId, name: newName } });
      setOpen(false);
      setNewName('');
    } catch (error) {
      console.log('Error updating questionnaire:', error);
    }
  };

  const handleEditSection=async() =>{
   
    try {
      await updateSection({ variables: {  name: newSectionName ,id: selectedSectionId} });
  
      setNewSectionName('');
      setOpenEditSectionDialog(false);
    } catch (error) {
      console.log('Error updating questionnaire:', error);
    }
  };

  const handleEditQuestion=async() =>{
    try{
     
      await updateQuestion({variables:{text:newQuestionText, id:selectedQuestonId}})
      setNewQuestionText('');
      setOpenEditQuestionDialog(false)
    }catch(error){
      console.log('Error updating Question:', error);
    
  }
}

  const handleDeleteSection = async(id)=>{
    // setSelectedSectionId(parseFloat(id.toString()))
    let convertId = parseFloat(id.toString())
    try {
      await deleteSection({variables:{id:convertId}})
    }catch(error){
      console.log('Error deleting section', error);
    }
  }

  

  const handleDeleteQuestionnaire = async (id:number) => {
    try {
      let convertedId = parseFloat(id.toString())
      await deleteQuestionnaire({ variables: { id:convertedId } });
    } catch (error) {
      console.log('Error deleting questionnaire', error);
    }
  };

  const handleDeleteQuestion=async(id)=>{
    try{
   console.log(id)
    let  convertedId = parseFloat(id.toString())
    await deleteQuestion({variables:{id:convertedId}})
    }catch(error){
      console.log('Error deleting question', error);
    }
  }

  const handleSurveyClick = async (survey:Survey) => {
    setSelectedSurvey(survey)
    setSelectedSurveyId(parseFloat(survey.id.toString()))

  };

  const handleSectionClick = (section) => {
    setSelectedSection(section)
    setSelectedSectionId(parseFloat(section.id.toString()))

  };
  const handleQuestionClick = (question) =>{
    setSelectedQuestionId(parseFloat(question.id))

  }

  if (loading) {
    return <p>Loading questions...</p>;
  }

  if (error) {
    return <p>Error loading questions</p>;
  }

  const surveys = data.questionnaire;

  const handleOpen = (questionnaire:any) => {
    setSelectedQuestionnaire(questionnaire);
    setNewName(questionnaire.name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewName('');
    setSelectedQuestionnaire(null);
  };
  

  return (
    <main className="flex min-h-screen flex-row items-center justify-between">
      <div className='w-1/3 h-screen bg-white overflow-y-scrol border-r border-gray-300"'>
      <div className="flex justify-center mt-4">
        <Button className="flex justify-center mt-4" variant="outlined" startIcon={<Add />} onClick={() => setOpen(true)}>
          Create Questionnaire
        </Button>
      </div>

    <List component="nav">
      {surveys.map((survey:Survey) => (
        <ListItem key={survey.id} button onClick={() => handleSurveyClick(survey)}>
          <ListItemText primary={survey.name} />
          <ListItemSecondaryAction>
            <Button variant="outlined" startIcon={<Edit />} onClick={() => handleOpen(survey)}>
              Edit
            </Button>
            <Button variant="outlined" startIcon={<Delete />} onClick={() => handleDeleteQuestionnaire(survey.id)}>
              Delete
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>

    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{selectedQuestionnaire ? 'Edit Questionnaire' : 'Create Questionnaire'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Questionnaire Name"
          variant="outlined"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => {
              if (selectedQuestionnaire) {
                  handleEditQuestionnaire(selectedQuestionnaire.id, newName);
              } else {
                handleCreateQuestionnaire();
               }
            }} 
          variant="outlined" color="primary">
  {selectedQuestionnaire ? 'Save' : 'Create'}
  </Button>
      </DialogActions>
    </Dialog>
    </div>
    <div className='w-1/3 h-screen bg-white overflow-y-scrol border-r border-gray-300"'>
      {selectedSurvey && <div className="flex justify-center mb-4">
            <Button variant="outlined" startIcon={<Add />} onClick={() => setOpenCreateSectionDialog(true)} >
             
                Create Section
            </Button>
          </div>}
    {sectionsData && sectionsData.section.length === 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>No sections available</div>
            ) : (
          <>
          
            <List component="nav">
            {sectionsLoading && <div>Loading sections...</div>}
            {sectionsError && <div>Error fetching sections: {sectionsError.message}</div>}
              {sectionsData && sectionsData.section.map((section:Section) => (
                <ListItem key={section.id} button onClick={() => handleSectionClick(section)}>
                  <ListItemText primary={section.name} />
                  <ListItemSecondaryAction>
                    <Button variant="outlined" startIcon={<Edit />} onClick={() => setOpenEditSectionDialog(true)}>
                      Edit
                    </Button>
                    <Button variant="outlined" startIcon={<Delete />} onClick={() => handleDeleteSection(section.id)}>
                      Delete
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </>
        )}
        <Dialog open={openCreateSectionDialog} onClose={() => setOpenCreateSectionDialog(false)}>
        <DialogTitle>Create Section</DialogTitle>
        <DialogContent>
        <TextField
          label="Section Name"
          variant="outlined"
          value={newSectionName}
          onChange={(e) => setNewSectionName(e.target.value)}
        />
        </DialogContent>
        <DialogActions>
    <Button onClick={() => setOpenCreateSectionDialog(false)}>Cancel</Button>
    <Button onClick={handleCreateSection} variant="outlined" color="primary">
      Create
      </Button>
      </DialogActions>
    </Dialog>
      <Dialog open={openEditSectionDialog} onClose={() => setOpenEditSectionDialog(false)}>
          <DialogTitle>Edit Section</DialogTitle>
          <DialogContent>
            <TextField
              label='Section Name'
              variant='outlined'
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditSectionDialog(false)}>Cancel</Button>
            <Button onClick={handleEditSection} variant='outlined' color='primary'>
              Update
            </Button>
          </DialogActions>
        </Dialog>

    </div>
    <div className='w-1/3 h-screen bg-white overflow-y-scrol border-r border-gray-300"'>
    {selectedSection && <div className="flex justify-center mb-4">
            <Button variant="outlined" startIcon={<Add />} onClick={() => setOpenCreateQuestionDialog(true)} >
             
                Create Question
            </Button>
          </div>}
    {questionsData && questionsData.question.length === 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
              No Question available
            </div>
            ) : (
          <>
            <List component="nav">
            {questionsLoading && <div>Loading questions...</div>}
            {questionsError && <div>Error fetching questions: {questionsError.message}</div>}
              {questionsData && questionsData.question.map((question:Question) => (
                <ListItem key={question.id} button onClick={()=>handleQuestionClick(question)}>
                  <ListItemText primary={question.text} />
                  <ListItemSecondaryAction>
                    <Button variant="outlined" startIcon={<Edit />} onClick={()=>{setOpenEditQuestionDialog(true)}}>
                      Edit
                    </Button>
                    <Button variant="outlined" startIcon={<Delete />} onClick={() => {handleDeleteQuestion(question.id)}}>
                      Delete
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </>
        )}
        <Dialog open={openCreateQuestionDialog} onClose={() => setOpenCreateQuestionDialog(false)}>
          <DialogTitle>Create Question</DialogTitle>
          <DialogContent>
          <TextField
            label="Question Text"
             variant="outlined"
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
              />

            </DialogContent>
          
          <DialogActions>
            <Button onClick={() => setOpenCreateQuestionDialog(false)}>Cancel</Button>
              <Button onClick={handleCreateQuestion} variant="outlined" color="primary">
                Create
              </Button>
              </DialogActions>
              </Dialog>
              <Dialog open={openEditQuestionDialog} onClose={() => setOpenEditQuestionDialog(false)}>
          <DialogTitle>Edit Question</DialogTitle>
        <DialogContent>
        <TextField
          label="Question Text"
          variant="outlined"
          value={newQuestionText}
          onChange={(e) => setNewQuestionText(e.target.value)}
        />
        </DialogContent>
        <DialogActions>
    <Button onClick={() => setOpenCreateQuestionDialog(false)}>Cancel</Button>
    <Button onClick={handleEditQuestion} variant="outlined" color="primary">
      Edit
      </Button>
      </DialogActions>
    </Dialog>

        
    </div>

    </main>

  );
};

export default function Home() {
  

  return (
    <ApolloProvider client={client}>
    
        <Surveys />
  
    </ApolloProvider>
    
    

    
  )
}
