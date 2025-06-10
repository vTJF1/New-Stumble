
//this sets up the google map and centers it on Manchester 
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 53.4808, lng: -2.2426 },
        zoom: 13,
    });
}





//Applys users settings
function applySettings(settings) {
  const isAuthPage = window.location.pathname.includes('login') || window.location.pathname.includes('sign');

  if (!isAuthPage) {
    //Background colours
    if (settings.darkMode) {
      document.body.style.background = "#121212";
    } else {
      document.body.style.background = "linear-gradient(135deg, #ff9a8b, #6C63FF)";
    }
  }

  //Text color 
  document.body.style.color = settings.darkMode ? "#000000" : "#333333";

  //Text size
  document.body.style.fontSize =
    settings.textSize === "small" ? "14px" :
    settings.textSize === "large" ? "18px" :
    "16px"; 
}









// Load saved settings from LocalStorage and applies them 
  function loadSettings() {
    const saved = localStorage.getItem("userSettings");
    if (!saved) return;
  
    const settings = JSON.parse(saved);
    applySettings(settings);


  //updates UI to match saved settings 
    const notifications = document.getElementById("notifications");
    if (notifications) notifications.checked = settings.notifications;
  
    const vibration = document.getElementById("vibration");
    if (vibration) vibration.checked = settings.vibration;
  
    const darkMode = document.getElementById("darkMode");
    if (darkMode) darkMode.checked = settings.darkMode;
  
    const textSize = document.getElementById("textSize");
    if (textSize) textSize.value = settings.textSize;
  
    const feedSort = document.getElementById("feedSort");
    if (feedSort) feedSort.value = settings.feedSort;
  
    const language = document.getElementById("language");
    if (language) language.value = settings.language;
  
    const usernameInput = document.getElementById("username");
    if (usernameInput) usernameInput.value = settings.username;
  
    const usernameDisplay = document.getElementById("username-placeholder");
    if (usernameDisplay && settings.username) {
      usernameDisplay.textContent = settings.username;
    }
    
    //changes colour of fonts on the map page
    const infoSections = document.querySelectorAll(".info-section");
    infoSections.forEach(section => {
    section.style.color = settings.darkMode ? "#ffffff" : "#333333";
    });

  }
  
  window.addEventListener("DOMContentLoaded", loadSettings);