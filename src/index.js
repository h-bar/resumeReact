import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileAlt, faEnvelope, faMapMarkerAlt, faGraduationCap, faFolderOpen, faSuitcase, faTools } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

import firebase from 'firebase';
import 'firebase/firestore'
import './index.scss';
import './rjsf.scss';

import Form from "react-jsonschema-form";

const schema = {
  type: "object",
  properties: {
    personal_info: {
      type: "object",
      title: "Personal Info",
      properties: {
        first_name: {type: "string", title: "First Name"},
        last_name: {type: "string", title: "Last Name"},
        emails: {
          type: "array",
          items: {
            type: "string"
          }
        },
        phone_number: {type: "string", title: "Phone Number"},
        linkedin: {type: "string", title: "LinkedIn"},
        summary: {type: "string", title: "Summary"},  
      }
    },
    educations: {
      type: "array",
      title: "Educations",
      items: {
        type: "object",
        properties: {
          institute: {type: "string", title: "Institute Name"},
          location: {type: "string", title: "Institute Location"},
          dates: {
            type: "object",
            title: "Dates",
            properties: {
              start: {type: "string", title: "From"},
              end: {type: "string", title: "To"},
            }
          },
          degree: {type: "string", title: "Degree"},
          major: {type: "string", title: "Major"},
          gpa: {type: "string", title: "GPA"},
          description: {type: "string", title: "Description"},
          details_list: {
            type: "array", 
            title: "Details",
            items: {
              type: "string",
            }
          } 
        } 
      }
    },
    experiences: {
      type: "array",
      title: "Experiences",
      items: {
        type: "object",
        properties: {
          organization: {type: "string", title: "Organization Name"},
          location: {type: "string", title: "Organization Location"},
          position: {type: "string", title: "Position"},
          dates: {
            type: "object",
            title: "Dates",
            properties: {
              start: {type: "string", title: "From"},
              end: {type: "string", title: "To"},
            }
          },
          skills: {type: "string", title: "Skill"},
          description: {type: "string", title: "Description"},
          details_list: {
            type: "array", 
            title: "Details",
            items: {
              type: "string",
            }
          }
        }
      }
    },
    projects: {
      type: "array",
      title: "Projects",
      items: {
        type: "object",
        properties: {
          name: {type: "string", title: "Project Name"},
          role: {type: "string", title: "Your Role"},
          note: {type: "string", title: "Some Notes"},
          skills: {type: "string", title: "Skill"},
          dates: {
            type: "object",
            title: "Dates",
            properties: {
              start: {type: "string", title: "From"},
              end: {type: "string", title: "To"},
            }
          },
          description: {type: "string", title: "Description"},
          details_list: {
            type: "array", 
            title: "Details",
            items: {
              type: "string",
            }
          }
        }
      }
    },
    skillsets: {
      title: "Skills",
      type: "array",
      items: {
        type: "object",
        properties: {
          category: {type: "string", title: "Skill Category"},
          skills: {type: "string", title: "Skill"}
        }
      }
    },
  }
};

const uiSchema = {
  personal_info: {
    summary: {
      "ui:widget": "textarea",
      "ui:options": {
        "rows": 3
      }
    }
  },
  educations: {
    items: {
      description: {
        "ui:widget": "textarea",
        "ui:options": {
          "rows": 6
        }
      },
      details_list: {
        items: {
          "ui:widget": "textarea",
          "ui:options": {
            "rows": 6
          }
        }
      }
    }
  },
  experiences :{
    items: {
      description: {
        "ui:widget": "textarea",
        "ui:options": {
          "rows": 6
        }
      },
      details_list: {
        items: {
          "ui:widget": "textarea",
          "ui:options": {
            "rows": 6
          }
        }
      }
    }
  },
  projects: {
    items: {
      description: {
        "ui:widget": "textarea",
        "ui:options": {
          "rows": 6
        }
      },
      details_list: {
        items: {
          "ui:widget": "textarea",
          "ui:options": {
            "rows": 6
          }
        }
      }
    }
  }
}
const educationHeading = (education) => (
  <div className='info'>
    <div className="info_left">
      <div className='info_top'>{education.institute}</div>
      <div className='info_buttom'>{education.degree + ' in ' + education.major}</div>
    </div>
    <div className="info_right">
      <div className='info_top'>
        <FontAwesomeIcon icon={faMapMarkerAlt}/>
        {education.location}
      </div>
      <div className='info_buttom'>{education.gpa}</div>
    </div>
  </div>
)

const experienceHeading = (experience) => (
  <div className='info'>
    <div className="info_left">
      <div className='info_top'>{experience.position}</div>
      <div className='info_buttom'>{experience.organization}</div>
    </div>
    <div className="info_right">
      <div className='info_top'>
        <FontAwesomeIcon icon={faMapMarkerAlt}/>
        {experience.location}
      </div>
      <div className='info_buttom'>{experience.skills}</div>
    </div>
  </div>
)

const projectHeading = (project) => (
  <div className='info'>
    <div className="info_left">
      <div className='info_top'>{project.name}</div>
      <div className='info_buttom'>{project.role}</div>
    </div>
    <div className="info_right">
      <div className='info_top'>
        {project.note}
      </div>
      <div className='info_buttom'>{project.skills}</div>
    </div>
  </div>
)

const skillHeading = (skillset) => (
  <div className='info'>
    <div className="info_left">
      <div className='info_top'>{skillset.category}</div>
    </div>
    <div className="info_right">
      <div className='info_top'>{skillset.skills}</div>
    </div>
  </div>
)

class Heading extends React.Component {
  EmailList(emails) {
    const listItem = emails.map((email, idx) => 
      <span key={idx}>
        <FontAwesomeIcon icon={faEnvelope} />
        <span id='email'> {email} | </span>
      </span>
    )

    return (<span id='emails>'> {listItem} </span>)
  } 

  render() {
    return (
      <div className='heading'>
        <div id='name'>
          <span id='firstname'>{this.props.info.first_name}</span>
          <span> </span>
          <span id='lastname'>{this.props.info.last_name}</span>
        </div>
        <div id='contacts'>
          <span>
            <FontAwesomeIcon icon={faMobileAlt} />
            <span id='phone_number'> {this.props.info.phone_number} | </span>
          </span>
          {this.EmailList(this.props.info.emails)}
          <span>
            <FontAwesomeIcon icon={faLinkedin} />
            <span id='linkedin'> {this.props.info.linkedin}</span>
          </span>
        </div>
      </div>
    )
  }
}

class Subsection extends React.Component {
  bpList(items) {
    return items.map((item, idx) => <li key={idx} className='bp'>{item}</li>)
  }

  render() {
    let data = this.props.data

    let dateDom = <div className="date"></div>
    if (data.dates != null) {
      dateDom = <div className="date">
                  <span>{data.dates.end}</span>
                  <span>{data.dates.start}</span>
                </div>
    }

    let bpDom = null
    if (data.details_list != null) {
      bpDom = <div className="bps">
                <ul>{this.bpList(data.details_list)}</ul>
              </div>
    }

    return (
      <div className='subsection'>
        {dateDom}
        <div className="decorator"></div>
        <div className="details">
          {this.props.headingFn(data)}
          <div className='detail'>
            <div className="description">{data.description}</div>
            {bpDom}
          </div>
        </div>
      </div>
    )
  }
}

class Section extends React.Component {
  subsectionList(headingFn, data) {
    return data.map((item) => <Subsection key={item.id} headingFn={headingFn} data={item}/>)
  }
  render() {  
    return (
      <div className='section'>
        <div className='section_title'>
          <FontAwesomeIcon icon={this.props.icon} />
          <span > {this.props.title}</span>
        </div>
        <div className='subsections'>
          {this.subsectionList(this.props.headingFn, this.props.data)}
        </div>
      </div>
    );
  }
}

class Resume extends React.Component {
  render = () => {
    const resume = this.props.resume
    return (
      <div className='resume'>
        <Heading info={resume.personal_info}/>
        <Section icon={faGraduationCap} title={'Educations'} headingFn={educationHeading} data={resume.educations} />
        <Section icon={faSuitcase} title={'Experiences'} headingFn={experienceHeading} data={resume.experiences} />
        <Section icon={faFolderOpen} title={'Projects'} headingFn={projectHeading} data={resume.projects} />
        <Section icon={faTools} title={'Skills'} headingFn={skillHeading} data={resume.skillsets} />
      </div>
    );
  }
}

const onSubmit = ({formData}) => {
  uploadResume(formData)
}

const log = (type) => console.log.bind(console, type);
class ResumeBuilder extends React.Component {
  render = () => {
    const resume = this.props.resume
    return (
      <Form schema={schema}
        formData={resume}
        uiSchema={uiSchema}
        onChange={log("changed")}
        onSubmit={onSubmit}
        onError={log("errors")} />
    );
  }
}

const uploadResume = (resume) => {
  console.log("Uploading resume...", resume)
  db.collection('personal_info').doc(resume.personal_info.first_name+resume.personal_info.last_name).set(resume.personal_info)
  resume.educations.forEach((education) => {
    db.collection('educations').doc(education.institute+education.degree+education.majors).set(education)
  });
  resume.experiences.forEach((experience) => {
    db.collection('experiences').doc(experience.organization+experience.position).set(experience)
  });
  resume.projects.forEach((project) => {
    db.collection('projects').doc(project.name).set(project)
  });
  resume.skillsets.forEach((skillset) => {
    db.collection('skillsets').doc(skillset.category).set(skillset)
  });
}

const fetchResume = async () => {
  let getResumeData = async (collection) => {
    let res = await db.collection(collection).where("active", "==", true).get()
    let data = []
    res.forEach((doc) => {
      data.push(doc.data())
    });
  
    return data
  }

  let resume = {}
  resume.personal_info = (await getResumeData('personal_info'))[0]
  resume.educations = await getResumeData('educations')
  resume.experiences = await getResumeData('experiences')
  resume.projects = await getResumeData('projects')
  resume.skillsets = await getResumeData('skillsets')

  return resume
}


// ========================================
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
var db = firebase.firestore()

const main = async () => {
  const resume = await fetchResume()
  ReactDOM.render(
    <div>
      <ResumeBuilder resume={resume} />
      <Resume resume={resume} />
    </div>,
    document.getElementById('root')
  )
}

main()
ReactDOM.render(
  <div>
    <div>loading...</div>
  </div>,
  document.getElementById('root')
);  