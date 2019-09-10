import React from 'react'

import './resumeBuilder.scss';

import Form from "react-jsonschema-form";

const schema = {
  type: "object",
  properties: {
    name: {type: "string", title: "Resume Name"},
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
  

const log = (type) => console.log.bind(console, type);
class ResumeBuilder extends React.Component {
  render = () => {
    const resume = this.props.resume
    return (
      <Form schema={schema}
        formData={resume}
        uiSchema={uiSchema}
        onChange={log("changed")}
        onSubmit={this.props.onSubmit}
        onError={log("errors")} />
    );
  }
}

export default ResumeBuilder