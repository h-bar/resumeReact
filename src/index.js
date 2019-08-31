import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileAlt, faEnvelope, faMapMarkerAlt, faGraduationCap, faFolderOpen, faSuitcase } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

import './index.scss';

class resumeData {
  info = {
    firstname: 'Yan',
    lastname: 'Zhang',
    phone_num: '+1 (925)494-3211',
    emails: ['663yan@gmail.com', 'yz2626@cornell.edu'],
    linkedin: '663yan',
    links: [],
    address: '107 E State St, Ithaca, NY',

    summary: '',
    objective: ''
  }

  educations = [
    {
      institute: 'Cornell University',
      location: 'Ithaca, NY',
      start_date: 'Aug 2019',
      end_date: 'May 2020',
      degree: 'Master of Engineering',
      major: 'Electrical and Computer Engineering',
      gpa: '',
      description: '',
      bulletpoints: []
    },
    {
      institute: 'Rensselaer Polytechnic Institute (RPI)',
      location: 'Troy, NY',
      start_date: 'Aug. 2014',
      end_date: 'May. 2019',
      degree: 'Bachelor of Science',
      major: 'Computer and System Engineering & Electrical Engineering',
      gpa: '3.5/4.0',
      description: '',
      bulletpoints: []
    }
  ]

  experiences = [
    {
      orgnization: 'Hasbro',
      location: 'Pawtucket, RI',
      position: 'Electronic Engineer Intern',
      start_date: 'Jan 2018',
      end_date: 'Jul 2018',
      description: '',
      bulletpoints: [
        'Built 10+ toy prototypes by bare-metal implementations on 8-bit microcontrollers interfacing with accelerometers, LEDs, and Speakers using vendor specific programming languages. Developed the firmware base on interruptions and debugged the design with benchtop tools',
        'Evaluated the feasibility and difficulty of upgrading an EOL accelerometer. Built test board to assess different upgrading options and analyzed datasheets for potential issues. Filed a detailed report resulting in a 1-year extended supply for this accelerometer',
        "Developed wrapper functions for microcontrollers' I2C and SPI interface. Handled timing critical conditions using assembly language",
        'Created python scripts to automatically import sound libraries into firmware code'
        ],
      skills: '8-bit Microcontroller, Sensors, Soldering, Assembly, Python' 
    },
    {
      orgnization: 'National Center for Adaptive Neurotechnologies (NCAN)',
      location: 'Albany, NY',
      position: 'Web Developer Intern',
      start_date: 'May 2017',
      end_date: 'Nov 2017',
      description: '',
      bulletpoints: [
        'Constructed a RESTful API service using python-flask providing neurotechnology data analysis functionalities with Matlab scripts',
        'Responsible for maintaining and optimizing two websites. Performed a DNS server switch. Organized data and data structure to reduce storage usage by 40%',
        ],
      skills: 'Python, RestFul API, Drupal, Matlab, Google API' 
    },
    
    {
      orgnization: 'National Center for Adaptive Neurotechnologies (NCAN)',
      location: 'Albany, NY',
      position: 'Web Developer Intern',
      start_date: 'May 2017',
      end_date: 'Nov 2017',
    description: '',
      bulletpoints: [
        'Constructed a RESTful API service using python-flask providing neurotechnology data analysis functionalities with Matlab scripts',
        'Responsible for maintaining and optimizing two websites. Performed a DNS server switch. Organized data and data structure to reduce storage usage by 40%',
        ],
      skills: 'Python, RestFul API, Drupal, Matlab, Google API' 
    }
  ]

  projects = [{
    name: '',
    start_date: '',
    end_date: '',
    note: '',
    description: '',
    bulletpoints: [''],
    skills: ''
  }]

  skills = [{
    category: '',
    skill: []
  }]
}

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
          <span id='firstname'>{this.props.info.firstname}</span>
          <span> </span>
          <span id='lastname'>{this.props.info.lastname}</span>
        </div>
        <div id='contacts'>
          <span>
            <FontAwesomeIcon icon={faMobileAlt} />
            <span id='phone_num'> {this.props.info.phone_num} | </span>
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
    return (
      <div className='subsection'>
        <div className="date">
          <span>{this.props.info.end_date}</span>
          <span>{this.props.info.start_date}</span>
        </div>
        <div className="decorator"></div>
        <div className="details">
          <div className="info_left">
            <div className='info_top'>{this.props.info.upper_left}</div>
            <div className='info_button'>{this.props.info.lower_left}</div>
          </div>
          <div className="info_right">
            <div className='info_top'>
              <FontAwesomeIcon icon={faMapMarkerAlt}/>
              {this.props.info.upper_right}
            </div>
            <div className='info_button'>{this.props.info.lower_right}</div>
          </div>
          <div className="description">{this.props.info.description}</div>
          <div className="bps">
            <ul>{this.bpList(this.props.info.bulletpoints)}</ul>
          </div>
        </div>
      </div>
    )
  }
}

class Section extends React.Component {
  subsectionList(items) {
    return items.map((item, idx) => <Subsection key={item.id} info={item}/>)
  }
  render() {  
    return (
      <div className='section'>
        <div className='section_title'>
          <FontAwesomeIcon icon={this.props.icon} />
          <span > {this.props.title}</span>
        </div>
        <div className='subsections'>
          {this.subsectionList(this.props.info)}
        </div>
      </div>
    );
  }
}
  
class Resume extends React.Component {
  render () {
    const resume = new resumeData()

    resume.educations.forEach((education) => {
      education.id = education.institute
      education.upper_left = education.institute
      education.lower_left = education.degree + ' in ' + education.major
      education.upper_right = education.location
      education.lower_right = education.gpa
    })

    resume.experiences.forEach((experience) => {
      experience.id = experience.orgnization
      experience.upper_left = experience.position
      experience.lower_left = experience.orgnization
      experience.upper_right = experience.location
      experience.lower_right = experience.skills
    })

    return (
      <div className='resume'>
        <Heading info={resume.info}/>
        <Section icon={faGraduationCap} title={'Educations'} info={resume.educations} />
        <Section icon={faSuitcase} title={'Experiences'} info={resume.experiences} />
        <Section icon={faFolderOpen} title={'Projects'} info={resume.projects} />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Resume />,
  document.getElementById('root')
);  