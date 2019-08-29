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
      gpa: 'Not Available',
      description: 'Courses: IoT',
      bulletpoints: ['sdfsdfs', 'sdfsdfsdf', 'dsfsdfds']
    // },
    // {
    //   institute: 'Rensselaer Polytechnic Institute (RPI)',
    //   location: 'Troy, NY',
    //   start_date: 'Aug. 2014',
    //   end_date: 'May. 2019',
    //   degree: 'Bachelor of Science',
    //   major: 'Computer and System Engineering & Electrical Engineering',
    //   gpa: 'Not Available',
    //   description: '',
    //   bulletpoints: []
    }
  ]

  experiences = [{
    orgnization: '',
    location: '',
    position: '',
    start_date: '',
    end_date: '',
    description: '',
    bulletpoints: [''],
    skills: ''
  }]

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