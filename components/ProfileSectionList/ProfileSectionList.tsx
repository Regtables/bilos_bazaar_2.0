import React, { Component } from 'react'

import styles from './ProfileSectionList.module.scss'

interface Section {
  section: string,
  icon: any
}

const ProfileSectionList = ({ sections, activeSection, setActiveSection } : { sections: any, activeSection: Section, setActiveSection: any }) => {
  return (
    <div className = {styles.container}>
      {sections.map((section: Section, i: number) => (
        <div 
          className= {`${styles.section} ${ section.section === activeSection.section ? styles.active : ''}`} 
          key = {i} 
          onClick = {() => setActiveSection(section)}
        >
          <p>{section.icon}</p>
          <h5>{section.section}</h5>
        </div>
      ))}
    </div>
  )
}

export default ProfileSectionList