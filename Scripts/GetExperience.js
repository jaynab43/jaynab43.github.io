import { ConfigSingleton } from "./GetProfile.js";
// Usage
(async () => {
  try {
      const configInstance = await ConfigSingleton.getInstance();
      updateHTML(configInstance.getConfig());
    } catch (error) {
      console.error('Error:', error);
    }
})();
  
function updateHTML(configData) {
  document.querySelector("#pfThumbnail").src = "Content/".concat(configData.About.Thumbnail);
  document.querySelector("#pfLinkedIn").href = configData.Contact.LinkedIn;
  document.querySelector("#pfGitHub").href = configData.Contact.GitHub;

  // Page Detail
  document.querySelector("#pfExpText").innerHTML = configData.Experience.ExperienceText;

  document.querySelector("#expEdu>h2").innerHTML = "Education";
  document.querySelector("#pfSchool").innerHTML = configData.Experience.School;
  document.querySelector("#pfMajor").innerHTML = configData.Experience.Major;
  document.querySelector("#pfGraduation").innerHTML = configData.Experience.Graduation;
  document.querySelector("#pfEducationText").innerHTML = configData.Experience.EducationText;

  document.querySelector("#expEmp>h2").innerHTML = "Employment";
  document.querySelector("#pfEmployment").innerHTML = configData.Experience.Employment;
  document.querySelector("#pfRole").innerHTML = configData.Experience.Role;
  document.querySelector("#pfEmploymentText").innerHTML = configData.Experience.EmploymentText;

  if (configData.Experience.Employment2) {
    document.querySelector("#pfEmployment2").innerHTML = configData.Experience.Employment2;
    document.querySelector("#pfRole2").innerHTML = configData.Experience.Role2;
    document.querySelector("#pfEmploymentText2").innerHTML = configData.Experience.EmploymentText2;
  }

  document.querySelector("#expSkills>h2").innerHTML = "Skills";
  document.querySelector("#pfSkills").innerHTML = configData.Experience.Skills.toString();
  document.querySelector("#pfSkillsText").innerHTML = configData.Experience.SkillsText;

  // document.querySelector("#pfResume").href = "./Content/".concat(configData.Experience.Resume);
  // document.querySelector("#pfResume").href = "./Content/resume.pdf";
  document.querySelector("#pfResume").onclick = () => {
    let url = "./Content/".concat(configData.Experience.Resume);
    window.open(url, "_blank");
  }

}
