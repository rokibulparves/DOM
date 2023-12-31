const milestonesData = JSON.parse(data).data;

// load course milestones data
function loadMilestones() {
  const milestones = document.querySelector(".milestones");

  milestones.innerHTML = `${milestonesData
    .map(function (milestone) {
      return `<div class="milestone border-b" id="${milestone._id}">
      <div class="flex">
        <div class="checkbox"><input onclick="finishedModule(this, ${milestone._id})" type="checkbox" /></div>
        <div onclick="openMilestone(this, ${milestone._id})">
          <p>
            ${milestone.name}
            <span><i class="fas fa-chevron-down"></i></span>
          </p>
        </div>
      </div>
      <div class="hidden_panel">
        ${milestone.modules
          .map(function (module) {
            return `<div class="showTemplate(this)" class="module border-b">
            <p>${module.name}</p>
          </div>`;
          })
          .join("")}
      </div>
    </div>`;
    })
    .join("")}`;

};


function openMilestone(milestoneElement, id){
  const currentPanel = milestoneElement.parentNode.nextElementSibling;
  const showPanel = document.querySelector(".show");
  const activePanel = document.querySelector(".active");
  
  if(activePanel && !milestoneElement.classList.contains("active")){
    activePanel.classList.remove("active");
  }
  milestoneElement.classList.toggle("active");

  if(showPanel && !currentPanel.classList.contains("show")){
    showPanel.classList.remove("show");
  }

  currentPanel.classList.toggle("show");


  loadImage(id);
};

function loadImage(id){
  const milestoneImage = document.querySelector(".milestoneImage");
  const title = document.querySelector(".title");
  const details = document.querySelector(".details");

  milestoneImage.style.opacity = "0";
  milestoneImage.src = milestonesData[id].image;
  details.innerText = milestonesData[id].description;
  title.innerText = milestonesData[id].name;
};

const milestoneImage = document.querySelector(".milestoneImage");
milestoneImage.onload = function(){
  this.style.opacity = "1";
};


function finishedModule(checkbox, id){
  const allMilestone = document.querySelector(".milestones");
  const doneMilestone = document.querySelector(".doneList");
  const item = document.getElementById(id);

  if(checkbox.checked){
    allMilestone.removeChild(item);
    doneMilestone.appendChild(item)
  } else {
    doneMilestone.removeChild(item);
    allMilestone.appendChild(item);
  }
}

loadMilestones();