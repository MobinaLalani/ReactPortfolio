import React from "react";
import HeroSectionIndex from "../../components/section/heroSection/Index";
import ContactIndex from "../../components/section/contact/Index";
import SkillsIndex from "../../components/section/skills/Index";
import ProjectIndex from "../../components/section/projects/Index";
import ContactForm from "../../components/section/contact/contactForm";

function MainPageIndex() {
  return (
    <div>
      <HeroSectionIndex />
      <ContactIndex />
      <SkillsIndex />
      <ProjectIndex />
      <ContactForm />
    </div>
  );
}

export default MainPageIndex;
