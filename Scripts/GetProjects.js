import { ConfigSingleton } from "./GetProfile.js";

let configData;

(async () => {
  try {
      const configInstance = await ConfigSingleton.getInstance();
      configData = configInstance.getConfig();
      updateHTML(configData);
    } catch (error) {
      console.error('Error:', error);
    }
  })();
  
function updateHTML(configData) {
  document.querySelector("#pfThumbnail").src = "Content/".concat(configData.About.Thumbnail);
  document.querySelector("#pfLinkedIn").href = configData.Contact.LinkedIn;
  document.querySelector("#pfGitHub").href = configData.Contact.GitHub;
  
  for (let n = 1; n <= 5; n++) {
    const proj = configData["Project" + n];
    if (proj && proj.Title) {
      const img = document.querySelector("#pfProject" + n + "Img");
      if (proj.Video) {
        img.style.display = "none";
        img.parentNode.insertBefore(buildVideo(proj.Video), img.nextSibling);
      } else {
        img.src = "Content/".concat(proj.MainImage);
      }
      document.querySelector("#pfProject" + n + "Title").innerHTML = proj.Title;
      document.querySelector("#pfProject" + n + "Desc").innerHTML = proj.Desc;
      document.querySelector("#pfProject" + n + "Repo").href = proj.GitHubRepo;
      if (!proj.GitHubRepo) {
        document.querySelector("#pfProject" + n + "Repo").style.display = "none";
      }
      if (proj.DetailImages.length < 1) {
        document.querySelector("#openProject" + n).style.display = "none";
      }
    } else {
      document.querySelector("#project" + n).style.display = "none";
    }
  }
}

// builds a video element from a YouTube link, Google Drive link, or a video file in Content
function buildVideo(url) {
  if (/\.(mp4|webm|mov)$/i.test(url)) {
    const v = document.createElement("video");
    v.src = url.startsWith("http") ? url : "Content/".concat(url);
    v.controls = true;
    v.style.width = "100%";
    return v;
  }
  let src = url;
  let m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (m) src = "https://www.youtube.com/embed/" + m[1];
  m = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  if (m) src = "https://drive.google.com/file/d/" + m[1] + "/preview";
  const f = document.createElement("iframe");
  f.src = src;
  f.allowFullscreen = true;
  f.style.width = "100%";
  f.style.aspectRatio = "16 / 9";
  f.style.border = "0";
  return f;
}

function addImages(imgs) {
  // First remove any existing images
  let il = document.querySelector("#imgList");
  while(il.firstChild) il.removeChild(il.firstChild);

  // Then add them in from the profile
  for (let i = 0; i < imgs.length; i++) {
    addListItem(imgs[i])
  }
}

function addListItem(newImg) {
  const newElem = document.createElement("img");
  newElem.setAttribute("src", "Content/".concat(newImg));
  const il = document.querySelector("#imgList");
  il.appendChild(newElem);
}

/* Handle the Carousel */
let slideIdx = 1;

document.querySelector("#next").onclick = () => {
  showImages(++slideIdx);
}

document.querySelector("#prev").onclick = () => {
  showImages(--slideIdx);
}

function showImages(n) {
  const slides = document.querySelectorAll("#imgList>img");
  if (n > slides.length) { slideIdx = 1 }
  if (n < 1) { slideIdx = slides.length }
  for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIdx - 1].style.display = "block";
}

for (let n = 1; n <= 5; n++) {
  document.querySelector("#openProject" + n).onclick = () => {
    addImages(configData["Project" + n].DetailImages);
    document.querySelector("#modalPage").style.display = "block";
    slideIdx = 1;
    showImages(slideIdx);
  }
}

document.querySelector("#XOut").onclick = () => {
  document.querySelector("#modalPage").style.display = "none";
}

window.onclick = (event) => {
  if (event.target == document.querySelector("#modalPage")) {
      document.querySelector("#modalPage").style.display = "none";
  }
}
