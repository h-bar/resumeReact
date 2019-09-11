import React from 'react';
import ReactDOM from 'react-dom'
import firebase from 'firebase';
import 'firebase/firestore'


import Resume from './resume.js'
import ResumeBuilder from './resumeBuilder.js'

const onSubmit = ({formData}) => {
  uploadResume(formData)
}

const uploadResume = (resume) => {
  db.collection('resumes').doc(resume.name).set(resume);
}

const fetchResume = async (name) => {
  let res = await db.collection('resumes').doc(name).get()
  let resume = res.data()

  return resume
}

const listResumes = async () => {
  let res = await db.collection('resumes').get()
  let resume_list = []
  res.forEach(function(doc) {
    resume_list.push(doc.data())
  })

  return resume_list
}

const firebaseConfig = {
  apiKey: "AIzaSyCoZfD861oMY6yhCMglf4yy1lSUohNGxgU",
  authDomain: "resumebuilder-1fd38.firebaseapp.com",
  databaseURL: "https://resumebuilder-1fd38.firebaseio.com",
  projectId: "resumebuilder-1fd38",
  storageBucket: "resumebuilder-1fd38.appspot.com",
  messagingSenderId: "248096012054",
  appId: "1:248096012054:web:f57dfa700f6191f8"
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore()


const switchResume = (e) => {
  resumeIdx = e.target.id
  ReactDOM.render(
    <div>
      {routing()}
      <ResumeBuilder resume={resumes[resumeIdx]} onSubmit={onSubmit}/>
    </div>,
    document.getElementById('root')
  )
}

const printResume = (e) => {
  console.log(resumes[resumeIdx])
  ReactDOM.render(
    <Resume resume={resumes[resumeIdx]}/>,
    document.getElementById('root')
  )
}

const ResumeList = () => {
  const options = resumes.map((resume, idx) => 
    <button onClick={switchResume} id={idx} >{resume.name}</button>
  )

  return (<ul id='resume_selector>'> {options} </ul>)
}

const routing = () => {
  return (
    <div>
      <ResumeList/>
      <button onClick={printResume}>Print Resume</button>
    </div>
  )
}

const main = async () => {
  resumes = await listResumes()
  ReactDOM.render(
    <div>
      {routing()}
    </div>,
    document.getElementById('root')
  )
}

var resumes = []
var resumeIdx = 0
main()
ReactDOM.render(
  <div>loading...</div>,
  document.getElementById('root')
);  