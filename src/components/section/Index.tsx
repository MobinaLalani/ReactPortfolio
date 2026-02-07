import React from 'react';
import HeroSectionIndex from './heroSection/Index';
import ContactIndex from './contact/Index';
import SkillsIndex from './skills/Index';
import ProjectIndex from './projects/Index';
import ContactForm from './contact/contactForm';

function Index() {
  return (
    <div>
      <HeroSectionIndex/>
      <ContactIndex/>
      <SkillsIndex/>
      <ProjectIndex/>
      <ContactForm/>
    </div>
  )
}

export default Index
