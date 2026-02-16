import React from "react";
import HeroSectionIndex from "../../components/section/heroSection/Index";
import ContactIndex from "../../components/section/contact/Index";
import SkillsIndex from "../../components/section/skills/Index";
import ProjectIndex from "../../components/section/projects/Index";
import ContactForm from "../../components/section/contact/contactForm";

function MainPageIndex() {
  return (
    <>
      <section id="about" className="scroll-mt-28">
        <HeroSectionIndex />
      </section>
      <ContactIndex />
      <SkillsIndex />
      <section id="projects" className="scroll-mt-28">
        <ProjectIndex />
      </section>
      <section id="contact" className="scroll-mt-28">
        <ContactForm />
      </section>
    </>
  );
}

export default MainPageIndex;
