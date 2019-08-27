import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileAlt, faHome, faEnvelope, faMapMarkerAlt, faLink } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

import './index.css';


class Heading extends React.Component {
  EmailList(emails) {
    const listItem = emails.map((email) => 
      <span>
        <FontAwesomeIcon icon={faEnvelope} />
        <span id='email'> {email} | </span>
      </span>
    )

    return (<span id='emails>'> {listItem} </span>)
  } 

  render() {
    const firstname = 'Yan'
    const lastname = 'Zhang'
    const phone_num = '+1 (925)-494-3211'
    const address = '107 E State St, Ithaca, NY'
    const emails = ['663yan@gmail.com', 'yz2626@cornell.edu']
    const linkedin = '663yan'

    return (
      <div class='heading'>
        <div id='name'>
          <span id='firstname'>{firstname}</span>
          <span> </span>
          <span id='lastname'>{lastname}</span>
        </div>
        <div id='contacts'>
          <span>
            <FontAwesomeIcon icon={faMobileAlt} />
            <span id='phone_num'> {phone_num} | </span>
          </span>
          {this.EmailList(emails)}
          <span>
            <FontAwesomeIcon icon={faLinkedin} />
            <span id='linkedin'> {linkedin}</span>
          </span>
        </div>
      </div>
    )
  }
}

class Section extends React.Component {
  subsectionList(items) {
    const listItem = items.map((item) => <subsection data={item}/>)
    return (<div id='subsections'>{listItem}</div>)
  }
  render() {
    return (
      <div class='section'>
        <div class='section_title'>
          {this.props.info.title}
        </div>  
        {this.subsectionList(['sfsdfs', 'sfdsf'])}
      </div>
    );
  }
}
  
class Resume extends React.Component {
  sectionList(sections) {
    const listItem = sections.map((info) => <Section info={info}/>)
    return (<div id='sections'>{listItem}</div>)
  }
  render () {
    const sections = [
      {
        title: 'Education'
      },
      {
        title: 'Experiences'
      }
    ]

    return (
      <div>
        <Heading/>
        {this.sectionList(sections)}
      </div>
    );
  }
}
  
// ========================================

ReactDOM.render(
  <Resume />,
  document.getElementById('root')
);  