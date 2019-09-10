import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileAlt, faEnvelope, faMapMarkerAlt, faGraduationCap, faFolderOpen, faSuitcase, faTools } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

import './resume.scss';

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


export default Resume