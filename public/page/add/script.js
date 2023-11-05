const checkAudio = new Audio();

const soundFiles = [
  "../../../sound/sound.mp3",
  "../../../sound/sound2.mp3",
  "../../../sound/sound3.mp3",
  "../../../sound/sound4.mp3"
];

let timeReminder = {
  dataSpan: [],
  hour: [],
  minute: [],
};

let dateReminder = {
  dataSpan: [],
  day: [],
  month: [],
  year: [],
};

let dateReminderEnd = {
  dataSpan: [],
  day: [],
  month: [],
  year: [],
};

let contentReminder = {
  dataSpan: [],
  title: [],
  medicine: [],
  sound: [],
  soundDuration: [],
};

let reminder = {
  contentReminder: contentReminder,
  timeReminder: timeReminder,
  dateReminder: dateReminder,
  dateReminderEnd: dateReminderEnd,
};

let notifications = {
  dataNotification: [],
  type: [],
  name: [],
  hour: [],
  minute: []
};

function encryptData(data) {
  const key = "A1B2C3D4";
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), key);
  return encryptedData.toString();
}

function decryptData(encryptedData) {
  const key = "A1B2C3D4";
  const bytes = CryptoJS.AES.decrypt(encryptedData, key);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}

function getReminderLocalStorage() {
  const encryptedData = localStorage.getItem("reminders");
  if (encryptedData) {
    const decryptedData = decryptData(encryptedData);
    reminder = decryptedData;
    timeReminder = decryptedData.timeReminder;
    dateReminder = decryptedData.dateReminder;
    dateReminderEnd = decryptedData.dateReminderEnd;
    contentReminder = decryptedData.contentReminder;

    if(document.querySelectorAll(".itemReminder")){
      document.querySelectorAll(".itemReminder").forEach(element =>{
        element.remove();
      })
    }

    if(document.querySelectorAll(".input")){
      document.querySelectorAll(".input").forEach(element =>{
        element.remove();
      })
    }

    for(let i = 0; i < contentReminder.dataSpan.length; i++){

      if(document.querySelectorAll(".input")){
        document.querySelectorAll(".input").forEach(element =>{
          element.remove();
        })
      }
      let contDataSpan = 0;
      let dateInit = dateReminder.year[i]+"-"+dateReminder.month[i]+"-"+dateReminder.day[i];
      let dateEnd = dateReminderEnd.year[i]+"-"+dateReminderEnd.month[i]+"-"+dateReminderEnd.day[i];
      let inputsDateTime;

      for(let k = 0; k < timeReminder.dataSpan.length; k++){
        if(contentReminder.dataSpan[i] == timeReminder.dataSpan[k]){
          let inputHour = document.createElement("input");
          inputHour.type = "time";
          inputHour.className = "input";
          inputHour.value = timeReminder.hour[k]+":"+timeReminder.minute[k];
          inputHour.style.display = "none";
          document.querySelector(".contentView").appendChild(inputHour);
          inputsDateTime = document.querySelectorAll(".input");
        }
      }
      for(let j = 0; j < timeReminder.dataSpan.length;j++){
        if(contentReminder.dataSpan[i] == timeReminder.dataSpan[j]){
          contDataSpan++;
        }
      }
      createReminder(contentReminder.title[i], contentReminder.medicine[i], dateInit, dateEnd, contDataSpan, inputsDateTime, false);
    }

  }

  if(document.querySelectorAll(".input")){
    document.querySelectorAll(".input").forEach(element =>{
      element.remove();
    })
  }

  let indexSoundsFiles = soundFiles.indexOf(contentReminder.sound[0]);

  let checkSounds = document.querySelectorAll(".checkSound");

  checkSounds.forEach(element =>{
    if(element.getAttribute("data-check") == (indexSoundsFiles + 1).toString()){
      element.checked = true;
      checkSounds.forEach(elementRemove =>{
        if(elementRemove.getAttribute("data-check") != element.getAttribute("data-check")){
          elementRemove.checked = false;
        }
      });
    }
    
  });

}

function getNotificationsLocalStorage() {
  const encryptedData = localStorage.getItem("notifications");
  if (encryptedData) {
    const decryptedData = decryptData(encryptedData);
    notifications = decryptedData.notifications;
    for (let i = 0; i < notifications.type.length; i++) {
      createNotificationAppNew(notifications.name[i], notifications.type[i], notifications.hour[i], notifications.minute[i]);
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  requestNotification();

  let contentFlagConfigNotificationGet = localStorage.getItem("notifConfig");

  if(contentFlagConfigNotificationGet){
    let arrayBooleanNotification = JSON.parse(contentFlagConfigNotificationGet);
    flagGetNotification = arrayBooleanNotification[0];
    flagGetNotificationReminder = arrayBooleanNotification[1];
    flagGetNotificationSound = arrayBooleanNotification[2];
    flagGetNotificationSpam = arrayBooleanNotification[3];

    document.querySelector(".reminderNotification").checked = flagGetNotificationReminder;
    document.querySelector(".soundNotification").checked = flagGetNotificationSound;
    document.querySelector(".spamNotification").checked = flagGetNotificationSpam;


  }else{
    let contentFlagConfigNotification = [true, true, true, true];
    localStorage.setItem("notifConfig", JSON.stringify(contentFlagConfigNotification));
  
    let contentFlagConfigNotificationGet = localStorage.getItem("notifConfig");
    let arrayBooleanNotification = JSON.parse(contentFlagConfigNotificationGet);
    flagGetNotification = arrayBooleanNotification[0];
    flagGetNotificationReminder = arrayBooleanNotification[1];
    flagGetNotificationSound = arrayBooleanNotification[2];
    flagGetNotificationSpam = arrayBooleanNotification[3];

    document.querySelector(".reminderNotification").checked = flagGetNotificationReminder;
    document.querySelector(".soundNotification").checked = flagGetNotificationSound;
    document.querySelector(".spamNotification").checked = flagGetNotificationSpam;


    if(flagGetNotification){
      document.querySelector(".stateToggleNotificaciones").textContent = "Activado";
    }else{
      document.querySelector(".stateToggleNotificaciones").textContent = "Desactivado";
    }
  }

  getReminderLocalStorage();
  getNotificationsLocalStorage();

  if(document.querySelector(".reminderNotification").checked == false && document.querySelector(".soundNotification").checked == false && document.querySelector(".spamNotification").checked == false){
    flagGetNotification = false;
    flagGetNotificationReminder = false;
    flagGetNotificationSound = false;
    flagGetNotificationSpam = false;
    document.querySelector(".stateToggleNotificaciones").textContent =
      "Desactivado";
  }

  if(document.querySelector(".reminderNotification").checked == true){
    flagGetNotificationReminder = true;
    document.querySelector(".stateToggleNotificaciones").textContent =
    "Activado";
  }else{
    flagGetNotificationReminder = false;
    flagGetNotificationSound = false;
    document.querySelector(".soundNotification").checked = false;
  }

});

function setReminderLocalStorage() {
  const encryptedData = encryptData({
    contentReminder: contentReminder,
    timeReminder: timeReminder,
    dateReminder: dateReminder,
    dateReminderEnd: dateReminderEnd,
  });
  localStorage.setItem("reminders", encryptedData);
}

function setNotificationsLocalStorage() {
  const encryptedData = encryptData({
    notifications: notifications
  });
  localStorage.setItem("notifications", encryptedData);
}

function requestNotification() {
  Notification.requestPermission().then((result) => {
    console.log("Respuesta: " + result);
  });
}

let audio = new Audio("../../../sound/sound.mp3");

function detenerAudio() {
  if(flagGetNotificationSound == true){
    if(contentReminder.sound[0] == undefined || contentReminder.sound[0] == null){
      audio.pause();
      audio.currentTime = 0;
    }else{
      checkAudio.src = contentReminder.sound[0];
      checkAudio.pause();
      checkAudio.currentTime = 0;
    }
  }
}

let contentFlagConfigNotification = []; 
let flagGetNotification = true;
let flagGetNotificationReminder = true;
let flagGetNotificationSound = true;
let flagGetNotificationSpam = true;

function setNotification(x) {
  if (Notification.permission === "granted") {
    let indexSpan = contentReminder.dataSpan.indexOf(x);
    let waitNotification;

    const options = {
      body:
        contentReminder.title[indexSpan] +
        "\n" +
        "Recordatorio para dosis de la medicina " +
        contentReminder.medicine[indexSpan],
      icon: "../../../img/logo_small_icon_only_inverted.png",
    };

    if(flagGetNotificationSound == true){
      if(contentReminder.sound[0] == undefined || contentReminder.sound[0] == null){
        audio.play();
      }else{
        checkAudio.src = contentReminder.sound[0];
        checkAudio.play();
      }
    }

    const notificacion = new Notification("HealthPilot", options);

    document.querySelector(".btnPauseNotification").addEventListener("click", () =>{
      detenerAudio();
      notificacion.close();
      clearTimeout(waitNotification);
      document.querySelector(".spawnPauseNotification").style.right = "-20%";
    });

    if(contentReminder.soundDuration[0] != null || contentReminder.soundDuration[0] != undefined){
      console.log("entro");
      waitNotification = setTimeout(() => {
        console.log("entro2");
        detenerAudio();
        notificacion.close();
        document.querySelector(".spawnPauseNotification").style.right = "-20%";
      }, contentReminder.soundDuration[0] * 1000);
    }else{
      audio.addEventListener("canplaythrough", function () {
        detenerAudio();
        notificacion.close();
        document.querySelector(".spawnPauseNotification").style.right = "-20%";
      });
    }

  } else if (Notification.permission === "denied") {
  } else if (Notification.permission === "default") {
  }
}


function getDate() {
  const fechaActual = new Date();
  const dia = fechaActual.getDate();
  const mes = fechaActual.getMonth() + 1;
  const anio = fechaActual.getFullYear();

  let date = {
    day: dia,
    month: mes,
    year: anio,
  };

  return date;
}

function getDateTime() {
  const fechaActual = new Date();
  const hour = fechaActual.getHours();
  const minute = fechaActual.getMinutes();
  const second = fechaActual.getSeconds();

  let dateTime = {
    hours: hour,
    minutes: minute,
    seconds: second,
  };

  return dateTime;
}

setInterval(()=>{
  console.log(document.querySelectorAll(".itemNotifications").length);
  if(document.querySelectorAll(".itemNotifications").length > 0){
    document.querySelector(".numberNotification").style.display = "block";
  }else{
    document.querySelector(".numberNotification").style.display = "none";
  }
},100);

function createNotificationApp(name) {

  if(name !== null || type !== null || hour !== null || minute !== null){

  let timeActuality = new Date();
  let hourActuality = timeActuality.getHours();
  let minuteActuality = timeActuality.getMinutes();
  let amPm = hourActuality >= 12 ? "p.m" : "a.m";

  if (hourActuality > 12) {
    hourActuality -= 12;
  }

  let listNotifications = document.querySelector(".listNotifications");

  let itemNotifications = document.createElement("li");
  itemNotifications.className = "itemNotifications";
  let newAttributeValue = (document.querySelectorAll(".itemNotifications").length + 1).toString();
  itemNotifications.setAttribute("data-notificacion", `${newAttributeValue}`);

  let infoNotifications = document.createElement("div");
  infoNotifications.className = "infoNotifications";

  let titleNotification = document.createElement("h4");
  titleNotification.className = "titleNotification";
  titleNotification.textContent = "Recordatorio";

  let descriptionNotification = document.createElement("p");
  descriptionNotification.className = "descriptionNotification";
  descriptionNotification.innerHTML = `Tienes un recordatorio de <strong class="addNotification"> ${name} </strong> pendiente, por favor confirme si ya lo recibio.`;
  
  let fechaNotification = document.createElement("h5");
  fechaNotification.className = "fechaNotification";
  fechaNotification.textContent = `${hourActuality}:${minuteActuality} ${amPm}`;

  let moreNotification = document.createElement("span");
  moreNotification.className = "moreNotification";

  let iMoreNotification = document.createElement("i");
  iMoreNotification.className = "fa-solid fa-check fa-lg";

  listNotifications.appendChild(itemNotifications);
  itemNotifications.appendChild(infoNotifications);
  itemNotifications.appendChild(moreNotification);
  moreNotification.appendChild(iMoreNotification  );
  infoNotifications.appendChild(titleNotification);
  infoNotifications.appendChild(descriptionNotification);
  infoNotifications.appendChild(fechaNotification);

  notifications.dataNotification.push(newAttributeValue);
  notifications.type.push("Recordatorio");
  notifications.name.push(name);
  notifications.hour.push(hourActuality);
  notifications.minute.push(minuteActuality);

  moreNotification.addEventListener("click", () => {
    itemNotifications.remove();
  
    for (let i = 0; i < notifications.dataNotification.length; i++) {
      if (notifications.dataNotification[i] === newAttributeValue) {
        notifications.dataNotification.splice(i, 1);
        notifications.type.splice(i, 1);
        notifications.name.splice(i, 1);
        notifications.hour.splice(i, 1);
        notifications.minute.splice(i, 1);
      }
    }

    setNotificationsLocalStorage();

  });

  }
}

function createNotificationAppNew(name, type, hour, minute) {
  if(name !== null || type !== null || hour !== null || minute !== null){
    let hourActuality = hour;
    let minuteActuality = minute;
    let amPm = hourActuality >= 12 ? "p.m" : "a.m";
  
    if (hourActuality > 12) {
      hourActuality -= 12;
    }
  
    let listNotifications = document.querySelector(".listNotifications");
  
    let itemNotifications = document.createElement("li");
    itemNotifications.className = "itemNotifications";
    let newAttributeValue = (document.querySelectorAll(".itemNotifications").length + 1).toString();
    itemNotifications.setAttribute("data-notificacion", `${newAttributeValue}`);
  
    let infoNotifications = document.createElement("div");
    infoNotifications.className = "infoNotifications";
  
    let titleNotification = document.createElement("h4");
    titleNotification.className = "titleNotification";
    titleNotification.textContent = type;
  
    let descriptionNotification = document.createElement("p");
    descriptionNotification.className = "descriptionNotification";
    descriptionNotification.innerHTML = `Tienes un recordatorio de <strong class="addNotification"> ${name} </strong> pendiente, por favor confirme si ya lo recibio.`;
    
    let fechaNotification = document.createElement("h5");
    fechaNotification.className = "fechaNotification";
    fechaNotification.textContent = `${hourActuality}:${minuteActuality} ${amPm}`;
  
    let moreNotification = document.createElement("span");
    moreNotification.className = "moreNotification";
  
    let iMoreNotification = document.createElement("i");
    iMoreNotification.className = "fa-solid fa-check fa-lg";
  
    listNotifications.appendChild(itemNotifications);
    itemNotifications.appendChild(infoNotifications);
    itemNotifications.appendChild(moreNotification);
    moreNotification.appendChild(iMoreNotification  );
    infoNotifications.appendChild(titleNotification);
    infoNotifications.appendChild(descriptionNotification);
    infoNotifications.appendChild(fechaNotification);
  
    
    moreNotification.addEventListener("click", () => {
      itemNotifications.remove();
    
      for (let i = 0; i < notifications.dataNotification.length; i++) {
        if (notifications.dataNotification[i] === newAttributeValue) {
          notifications.dataNotification.splice(i, 1);
          notifications.type.splice(i, 1);
          notifications.name.splice(i, 1);
          notifications.hour.splice(i, 1);
          notifications.minute.splice(i, 1);
        }
      }
  
      setNotificationsLocalStorage();
  
    });
  
  }  

}


setInterval(() => {
  let timeNotification = getDateTime();
  let dateNotification = getDate();
  let inputSpan;

  for (let i = 0; i < dateReminder.day.length; i++) {
    if (
      dateNotification.day == dateReminder.day[i] &&
      dateNotification.month == dateReminder.month[i] &&
      dateNotification.year == dateReminder.year[i]
    ) {
      inputSpan = dateReminder.dataSpan[i];
      for (let j = 0; j < timeReminder.dataSpan.length; j++) {
        if (
          timeNotification.hours === parseInt(timeReminder.hour[j]) &&
          timeNotification.minutes === parseInt(timeReminder.minute[j]) &&
          timeNotification.seconds === 0 && inputSpan === timeReminder.dataSpan[j]
        ) {
          if(flagGetNotificationReminder == true){
            if(flagGetNotificationSound == true){
              document.querySelector(".spawnPauseNotification").style.right = "4%";
            }
            createNotificationApp(contentReminder.title[i]);
            setNotificationsLocalStorage();
            setNotification(timeReminder.dataSpan[j]);
          }else{
            createNotificationApp(contentReminder.title[i]);
            setNotificationsLocalStorage();
          }
        }
      }
    }
  }

  for (let i = 0; i < dateReminderEnd.day.length; i++) {
    if (
      dateNotification.day == dateReminderEnd.day[i] &&
      dateNotification.month == dateReminderEnd.month[i] &&
      dateNotification.year == dateReminderEnd.year[i]
    ) {
      document.querySelectorAll(".itemReminder").forEach((element) => {
        if (element.getAttribute("data-span") == dateReminderEnd.dataSpan[i]) {
          element.remove();
        }
      });
    clearReminderFunc(dateReminderEnd.dataSpan[i]);
    }
  }
}, 1000);

// setInterval(() => {
//   console.log(reminder);
// }, 5000);

let dateActuality = getDate();

let buttonsFooter = document.querySelectorAll(".buttonFooter");

buttonsFooter.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.getAttribute("data-id") == "1") {
      window.location.href = "../home/index.php";
    } else if (element.getAttribute("data-id") == "2") {
      window.location.href = "../add/index.php";
    }
  });
});

let buttonsContentPage = document.querySelectorAll(".item");

buttonsContentPage.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.getAttribute("data-item") == 1) {
      let circle = element.querySelector(".circle");
      circle.querySelector(".fa-circle").classList.remove("fa-regular");
      circle.querySelector(".fa-circle").classList.add("fa-solid");
      setTimeout(() => {
        circle.querySelector(".fa-circle").classList.add("fa-regular");
        circle.querySelector(".fa-circle").classList.remove("fa-solid");
      }, 1000);
    } else if (element.getAttribute("data-item") == 2) {
      let circle = element.querySelector(".circle");
      circle.querySelector(".fa-circle").classList.remove("fa-regular");
      circle.querySelector(".fa-circle").classList.add("fa-solid");
      setTimeout(() => {
        circle.querySelector(".fa-circle").classList.add("fa-regular");
        circle.querySelector(".fa-circle").classList.remove("fa-solid");
      }, 1000);
    } else if (element.getAttribute("data-item") == 3) {
      let circle = element.querySelector(".circle");
      circle.querySelector(".fa-circle").classList.remove("fa-regular");
      circle.querySelector(".fa-circle").classList.add("fa-solid");
      setTimeout(() => {
        circle.querySelector(".fa-circle").classList.add("fa-regular");
        circle.querySelector(".fa-circle").classList.remove("fa-solid");
      }, 1000);
    } else if (element.getAttribute("data-item") == 4) {
      let circle = element.querySelector(".circle");
      circle.querySelector(".fa-circle").classList.remove("fa-regular");
      circle.querySelector(".fa-circle").classList.add("fa-solid");
      setTimeout(() => {
        circle.querySelector(".fa-circle").classList.add("fa-regular");
        circle.querySelector(".fa-circle").classList.remove("fa-solid");
      }, 1000);
    }
  });
});

let buttonConfig = document.querySelector(".configSpan");
let buttonBackConfig = document.querySelector(".backContent");
let buttonNotification = document.querySelector(".notificationSpan");
let buttonBackNotification = document.querySelector(
  ".backContentNotificaciones"
);

buttonConfig.addEventListener("click", () => {
  document.querySelector(".spawnConfiguracion").style.left = "0%";
});

buttonNotification.addEventListener("click", () => {
  document.querySelector(".spawnNotificaciones").style.right = "0%";
});

buttonBackNotification.addEventListener("click", () => {
  document.querySelector(".spawnNotificaciones").style.right = "-100%";
});

buttonBackConfig.addEventListener("click", () => {
  document.querySelector(".spawnConfiguracion").style.left = "-100%";
});

//Spawn Notificaciones

let buttonsTrayNotifications = document.querySelectorAll(".itemTray");
let contClicksTrayNotifications = 0;

buttonsTrayNotifications.forEach((element) => {
  if (!element.classList.contains("liActive")) {
    element.addEventListener("click", () => {
      buttonsTrayNotifications.forEach((element) => {
        element.style.backgroundColor = "rgb(255, 255, 255, .2)";
      });

      element.style.backgroundColor = "rgba(69, 69, 69, 0.5)";
    });
  } else {
    element.addEventListener("click", () => {
      contClicksTrayNotifications++;
      if (contClicksTrayNotifications % 2 != 0) {
        element.querySelector(".arrow").style.transform = "rotate(-180deg)";
      } else {
        element.querySelector(".arrow").style.transform = "rotate(0deg)";
      }
    });
  }
});

let root = document.documentElement;
let buttonsGeneral = document
  .querySelector(".configGeneral")
  .querySelectorAll(".itemConfig");

buttonsGeneral.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.getAttribute("data-general") == "1") {
      document.querySelector('.color-input').click();
      document.querySelector(".color-input").addEventListener("change", () =>{
        let colorInput = document.querySelector('.color-input').value;
        root.style.setProperty("--background_1", colorInput);
      });
    } else if (element.getAttribute("data-general") == "2") {
    } else if (element.getAttribute("data-general") == "3") {

      document.querySelector(".spawnConfigCuenta").style.left = "0%";
    
    }
  });
});


//Reminder Form

let addReminder = document.querySelector(".contentAddReminder");
let closeAddReminder = document.querySelector(".closeReminder");

addReminder.addEventListener("click", () => {
  document.querySelector(".contentBlockPage").style.top = "0%";
});

closeAddReminder.addEventListener("click", () => {
  document.querySelector(".contentBlockPage").style.top = "100%";
});

let closeEditReminder = document.querySelector(".closeEditReminder");

closeEditReminder.addEventListener("click", () => {
  document.querySelector(".contentBlockPageEdit").style.top = "100%";
});

let sendReminder = document.querySelector(".inputConfirm");
let inputNumberFrequency = document.querySelector(".inputNumberFrequency");
let inputNumberFrequencyEdit = document.querySelector(
  ".inputNumberFrequencyEdit"
);
let hoursReminder = {};

function createHoursElements(number) {
  if (document.querySelectorAll(".itemTimeDate")) {
    let hoursTimeDate = document.querySelectorAll(".itemTimeDate");
    hoursTimeDate.forEach((element) => {
      element.remove();
    });
  }

  for (let i = 1; i <= number; i++) {
    let listTimeDate = document.querySelector(".listTimeDate");

    let liTimeDate = document.createElement("li");
    liTimeDate.className = "itemTimeDate";

    let labelTimeDate = document.createElement("label");
    labelTimeDate.textContent = "Hora del recordatorio ";

    let sNumberTimeDate = document.createElement("strong");
    sNumberTimeDate.className = "numberTimeDate";
    sNumberTimeDate.textContent = i;
    sNumberTimeDate.style.fontWeight = "lighter";

    let inputTimeDate = document.createElement("input");
    inputTimeDate.type = "time";
    inputTimeDate.name = "inputTimeDate";
    inputTimeDate.className = "inputTimeDate";

    listTimeDate.appendChild(liTimeDate);

    liTimeDate.appendChild(labelTimeDate);
    labelTimeDate.appendChild(sNumberTimeDate);
    liTimeDate.appendChild(inputTimeDate);
  }
}

function createHoursElementsEdit(number) {
  if (document.querySelectorAll(".itemTimeDateEdit")) {
    let hoursTimeDate = document.querySelectorAll(".itemTimeDateEdit");
    hoursTimeDate.forEach((element) => {
      element.remove();
    });
  }

  for (let i = 1; i <= number; i++) {
    let listTimeDate = document.querySelector(".listTimeDateEdit");

    let liTimeDate = document.createElement("li");
    liTimeDate.className = "itemTimeDateEdit";

    let labelTimeDate = document.createElement("label");
    labelTimeDate.textContent = "Hora del recordatorio ";

    let sNumberTimeDate = document.createElement("strong");
    sNumberTimeDate.className = "numberTimeDate";
    sNumberTimeDate.textContent = i;
    sNumberTimeDate.style.fontWeight = "lighter";

    let inputTimeDate = document.createElement("input");
    inputTimeDate.type = "time";
    inputTimeDate.name = "inputTimeDateEdit";
    inputTimeDate.className = "inputTimeDateEdit";

    listTimeDate.appendChild(liTimeDate);

    liTimeDate.appendChild(labelTimeDate);
    labelTimeDate.appendChild(sNumberTimeDate);
    liTimeDate.appendChild(inputTimeDate);
  }
}

function clearInputs() {
  let spawnPopup = document.querySelector(".spawnPopupNewReminder");
  let allInputs = spawnPopup.querySelectorAll(".clear");

  for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].value = "";
  }

  document.querySelectorAll(".itemTimeDate").forEach((element) => {
    element.remove();
  });
}

inputNumberFrequency.addEventListener("keyup", () => {
  createHoursElements(inputNumberFrequency.value);
});

inputNumberFrequencyEdit.addEventListener("keyup", () => {
  createHoursElementsEdit(inputNumberFrequencyEdit.value);
});

let flagContinueAddReminder = true;

sendReminder.addEventListener("click", () => {
  let nameReminder = document.querySelector(".inputName").value;
  flagContinueAddReminder = true;

  if (nameReminder.length <= 18 && nameReminder.length > 0) {
    document.querySelector(".inputName").style.border = "1px solid";
    document.querySelector(".inputName").style.animation = "none 0.3s";
  } else {
    flagContinueAddReminder = false;
    document.querySelector(".inputName").style.border = "2px solid tomato";
    document.querySelector(".inputName").style.animation = "errInput 0.3s";
  }

  let nameMedicine = document.querySelector(".inputDescription").value;
  if (nameMedicine.length <= 18 && nameMedicine.length > 0) {
    document.querySelector(".inputDescription").style.animation = "none 0.3s";
    document.querySelector(".inputDescription").style.border = "1px solid";
  } else {
    flagContinueAddReminder = false;
    document.querySelector(".inputDescription").style.border =
      "2px solid tomato";
    document.querySelector(".inputDescription").style.animation =
      "errInput 0.3s";
  }

  let inputTimeInit = document.querySelector(".inputTimeInit").value;

  let fechaInit = new Date(inputTimeInit);

  if (
    fechaInit.getMonth() + 1 < dateActuality.month ||
    fechaInit.getDate() + 1 < dateActuality.day ||
    fechaInit.getFullYear() < dateActuality.year
  ) {
    flagContinueAddReminder = false;
    document.querySelector(".inputTimeInit").style.border = "2px solid tomato";
    document.querySelector(".inputTimeInit").style.animation = "errInput 0.3s";
  } else if (inputTimeInit == "") {
    flagContinueAddReminder = false;
    document.querySelector(".inputTimeInit").style.border = "2px solid tomato";
    document.querySelector(".inputTimeInit").style.animation = "errInput 0.3s";
  } else {
    document.querySelector(".inputTimeInit").style.animation = "none 0.3s";
    document.querySelector(".inputTimeInit").style.border = "1px solid";
  }

  let inputTimeEnd = document.querySelector(".inputTimeEnd").value;

  let fechaEnd = new Date(inputTimeEnd);

  if (fechaEnd <= fechaInit) {
    flagContinueAddReminder = false;
    document.querySelector(".inputTimeEnd").style.border = "2px solid tomato";
    document.querySelector(".inputTimeEnd").style.animation = "errInput 0.3s";
  } else if (inputTimeEnd == "") {
    flagContinueAddReminder = false;
    document.querySelector(".inputTimeEnd").style.border = "2px solid tomato";
    document.querySelector(".inputTimeEnd").style.animation = "errInput 0.3s";
  } else {
    document.querySelector(".inputTimeEnd").style.animation = "none 0.3s";
    document.querySelector(".inputTimeEnd").style.border = "1px solid";
  }

  let inputNumberFrequency = document.querySelector(
    ".inputNumberFrequency"
  ).value;
  if (inputNumberFrequency <= 0) {
    flagContinueAddReminder = false;
    document.querySelector(".inputNumberFrequency").style.border =
      "2px solid tomato";
    document.querySelector(".inputNumberFrequency").style.animation =
      "errInput 0.3s";
  } else {
    document.querySelector(".inputNumberFrequency").style.animation =
      "none 0.3s";
    document.querySelector(".inputNumberFrequency").style.border = "1px solid";
  }

  let inputTimeDate = document.querySelectorAll(".inputTimeDate");

  if (inputNumberFrequency > 0) {
    inputTimeDate.forEach((element) => {
      if (element.value <= 0) {
        flagContinueAddReminder = false;
        element.style.border = "2px solid tomato";
        element.style.animation = "errInput 0.3s";
      } else {
        element.style.animation = "none 0.3s";
        element.style.border = "1px solid";
      }
    });
  }

  for (let i = 0; i < inputTimeDate.length; i++) {
    hoursReminder[i] = inputTimeDate.item(i).value;
  }

  if (flagContinueAddReminder) {
    createReminder(
      nameReminder,
      nameMedicine,
      inputTimeInit,
      inputTimeEnd,
      inputNumberFrequency,
      inputTimeDate,
      false
    );
    document.querySelector(".contentBlockPage").style.top = "100%";
    dateReminder.day.push(fechaInit.getDate() + 1);
    dateReminder.month.push(fechaInit.getMonth() + 1);
    dateReminder.year.push(fechaInit.getFullYear());
    dateReminderEnd.day.push(fechaEnd.getDate() + 1);
    dateReminderEnd.month.push(fechaEnd.getMonth() + 1);
    dateReminderEnd.year.push(fechaEnd.getFullYear());
    contentReminder.title.push(nameReminder);
    contentReminder.medicine.push(nameMedicine);
    clearInputs();
  }

  let attributeItem = createReminder("", "", "", "", "", "", true);
  contentReminder.dataSpan.push(attributeItem);
  dateReminder.dataSpan.push(attributeItem);
  dateReminderEnd.dataSpan.push(attributeItem);

  for (let i = 0; i < inputTimeDate.length; i++) {
    timeReminder.dataSpan.push(attributeItem);
    hoursReminder[i] = inputTimeDate.item(i).value;
    let [hora, minutos] = hoursReminder[i].split(":");
    timeReminder.hour.push(hora);
    timeReminder.minute.push(minutos);
  }

  if(flagContinueAddReminder){
    setReminderLocalStorage();
  }
});


let flagContinueAddEditReminder = false;

function clearReminderFunc(attributeItemNewLi) {
  for (let i = timeReminder.dataSpan.length - 1; i >= 0; i--) {
    if (timeReminder.dataSpan[i] === attributeItemNewLi) {
      timeReminder.dataSpan.splice(i, 1);
      timeReminder.hour.splice(i, 1);
      timeReminder.minute.splice(i, 1);
    }
  }

  for (let i = dateReminder.dataSpan.length - 1; i >= 0; i--) {
    if (dateReminder.dataSpan[i] === attributeItemNewLi) {
      dateReminder.dataSpan.splice(i, 1);
      dateReminder.day.splice(i, 1);
      dateReminder.month.splice(i, 1);
      dateReminder.year.splice(i, 1);
    }
  }

  for (let i = dateReminderEnd.dataSpan.length - 1; i >= 0; i--) {
    if (dateReminderEnd.dataSpan[i] === attributeItemNewLi) {
      dateReminderEnd.dataSpan.splice(i, 1);
      dateReminderEnd.day.splice(i, 1);
      dateReminderEnd.month.splice(i, 1);
      dateReminderEnd.year.splice(i, 1);
    }
  }

  for (let i = contentReminder.dataSpan.length - 1; i >= 0; i--) {
    if (contentReminder.dataSpan[i] === attributeItemNewLi) {
      contentReminder.dataSpan.splice(i, 1);
      contentReminder.medicine.splice(i, 1);
      contentReminder.title.splice(i, 1);
    }
  }

  setReminderLocalStorage();
}


function createReminder(
  nameReminder,
  nameMedicine,
  timeInit,
  timeEnd,
  numberFrequency,
  hoursReminder,
  flagReturn
) {
  if (flagReturn == true) {
    let newAttributeValue = document
      .querySelectorAll(".itemReminder")
      .length.toString();
    return newAttributeValue;
  }

  let listReminder = document.querySelector(".listReminder");

  let newli = document.createElement("li");
  newli.className = "itemReminder";

  let contentTopReminder = document.createElement("div");
  contentTopReminder.className = "contentTopReminder";

  let titleReminder = document.createElement("h3");
  titleReminder.className = "titleReminder";
  titleReminder.textContent = nameReminder;

  let showReminder = document.createElement("span");
  showReminder.className = "showReminder";

  let eyeReminder = document.createElement("i");
  eyeReminder.className = "fa-solid fa-eye fa-lg";
  eyeReminder.id = "eye";

  let clearReminder = document.createElement("span");
  clearReminder.className = "clearReminder";

  let trashReminder = document.createElement("i");
  trashReminder.className = "fa-solid fa-trash fa-lg";

  let editReminder = document.createElement("span");
  editReminder.className = "editReminder";
  let newAttributeValue = (
    document.querySelectorAll(".itemReminder").length + 1
  ).toString();
  newli.setAttribute("data-span", newAttributeValue);

  let iEditReminder = document.createElement("i");
  iEditReminder.className = "fa-solid fa-pen-to-square fa-lg";

  let description = document.createElement("div");
  description.className = "description";

  let pNameMedicine = document.createElement("p");
  pNameMedicine.className = "pNameMedicine";
  pNameMedicine.textContent = "Medicina: ";
  let sNameMedicine = document.createElement("strong");
  sNameMedicine.className = "nameMedicine";
  sNameMedicine.textContent = nameMedicine;

  let pTimeInit = document.createElement("p");
  pTimeInit.className = "pTimeInit";
  pTimeInit.textContent = "Fecha de inicio: ";
  let sTimeInit = document.createElement("strong");
  sTimeInit.className = "timeInit";
  sTimeInit.textContent = timeInit;

  let pTimeEnd = document.createElement("p");
  pTimeEnd.className = "pTimeEnd";
  pTimeEnd.textContent = "Fecha de finalizacion: ";
  let sTimeEnd = document.createElement("strong");
  sTimeEnd.className = "timeEnd";
  sTimeEnd.textContent = timeEnd;

  let pNumberFrequency = document.createElement("p");
  pNumberFrequency.className = "pNumberFrequency";
  pNumberFrequency.textContent = "Frecuencia por dia del recordatorio: ";
  let sNumberFrequency = document.createElement("strong");
  sNumberFrequency.className = "numberFrequency";
  sNumberFrequency.textContent = numberFrequency;

  // Construir la jerarquía de elementos
  editReminder.appendChild(iEditReminder);
  showReminder.appendChild(eyeReminder);
  clearReminder.appendChild(trashReminder);
  contentTopReminder.appendChild(titleReminder);
  contentTopReminder.appendChild(editReminder);
  contentTopReminder.appendChild(showReminder);
  contentTopReminder.appendChild(clearReminder);
  newli.appendChild(contentTopReminder);
  newli.appendChild(description);
  description.appendChild(pNameMedicine);
  description.appendChild(pTimeInit);
  description.appendChild(pTimeEnd);
  pNameMedicine.appendChild(sNameMedicine);
  pTimeInit.appendChild(sTimeInit);
  pTimeEnd.appendChild(sTimeEnd);
  description.appendChild(pNumberFrequency);
  pNumberFrequency.appendChild(sNumberFrequency);
  for (let i = 0; i < numberFrequency; i++) {
    let pTimeDate = document.createElement("p");
    pTimeDate.className = "pTimeDate";
    pTimeDate.textContent = `Hora del recordatorio ${i + 1}: `;
    let sTimeDate = document.createElement("strong");
    sTimeDate.className = "timeDate";
      sTimeDate.textContent = hoursReminder.item(i).value;
    description.appendChild(pTimeDate);
    pTimeDate.appendChild(sTimeDate);
  }
  // Agregar el nuevo <li> a la lista
  listReminder.appendChild(newli);

  showReminder.addEventListener("click", function () {
    description.style.display =
      description.style.display === "flex" ? "none" : "flex";
    eyeReminder.classList.toggle("fa-eye-slash");
    eyeReminder.classList.toggle("fa-eye");
  });

  clearReminder.addEventListener("click", function () {
    let attributeItemNewLi = newli.getAttribute("data-span");
    clearReminderFunc(attributeItemNewLi);
    newli.remove();
  });

  editReminder.addEventListener("click", function () {
    let item = newli; // El elemento "li" que se va a editar

    if (item != null) {
      // Obtener los valores actuales del recordatorio
      const currentNameReminder =
        item.querySelector(".titleReminder").textContent;
      const currentNameMedicine =
        item.querySelector(".nameMedicine").textContent;
      const currentTimeInit = item.querySelector(".timeInit").textContent;
      const currentTimeEnd = item.querySelector(".timeEnd").textContent;
      const currentNumberFrequency =
        item.querySelector(".numberFrequency").textContent;

      // Ventana de edición con campos prellenados
      const editForm = document.querySelector(".spawnEditReminder");
      editForm.querySelector(".inputNameEdit").value = currentNameReminder;
      editForm.querySelector(".inputDescriptionEdit").value =
        currentNameMedicine;
      editForm.querySelector(".inputTimeInitEdit").value = currentTimeInit;
      editForm.querySelector(".inputTimeEndEdit").value = currentTimeEnd;
      editForm.querySelector(".inputNumberFrequencyEdit").value =
        currentNumberFrequency;

      createHoursElementsEdit(
        editForm.querySelector(".inputNumberFrequencyEdit").value
      );

      let inputTimesDate = editForm.querySelectorAll(".inputTimeDateEdit");

      for (let i = 0; i < inputTimesDate.length; i++) {
        inputTimesDate.item(i).value = item
          .querySelectorAll(".pTimeDate")
          .item(i)
          .querySelector(".timeDate").textContent;
      }

      // Manejar la edición y actualización de los datos
      const editSubmitButton = editForm.querySelector(".inputConfirmEdit");
      editSubmitButton.addEventListener("click", function () {
        let nameReminder = document.querySelector(".inputNameEdit").value;
        flagContinueAddEditReminder = true;

        if (nameReminder.length <= 18 && nameReminder.length > 0) {
          document.querySelector(".inputNameEdit").style.border = "1px solid";
          document.querySelector(".inputNameEdit").style.animation =
            "none 0.3s";
        } else {
          flagContinueAddEditReminder = false;
          document.querySelector(".inputNameEdit").style.border =
            "2px solid tomato";
          document.querySelector(".inputNameEdit").style.animation =
            "errInput 0.3s";
        }

        let nameMedicine = document.querySelector(".inputDescriptionEdit").value;
        if (nameMedicine.length <= 18 && nameMedicine.length > 0) {
          document.querySelector(".inputDescriptionEdit").style.animation =
            "none 0.3s";
          document.querySelector(".inputDescriptionEdit").style.border =
            "1px solid";
        } else {
          flagContinueAddEditReminder = false;
          document.querySelector(".inputDescriptionEdit").style.border =
            "2px solid tomato";
          document.querySelector(".inputDescriptionEdit").style.animation =
            "errInput 0.3s";
        }

        let inputTimeInit = document.querySelector(".inputTimeInitEdit").value;

        let fechaInit = new Date(inputTimeInit);

        if (
          fechaInit.getMonth() + 1 < dateActuality.month ||
          fechaInit.getDate() + 1 < dateActuality.day ||
          fechaInit.getFullYear() < dateActuality.year
        ) {
          flagContinueAddEditReminder = false;
          document.querySelector(".inputTimeInitEdit").style.border =
            "2px solid tomato";
          document.querySelector(".inputTimeInitEdit").style.animation =
            "errInput 0.3s";
        } else if (inputTimeInit == "") {
          flagContinueAddEditReminder = false;
          document.querySelector(".inputTimeInitEdit").style.border =
            "2px solid tomato";
          document.querySelector(".inputTimeInitEdit").style.animation =
            "errInput 0.3s";
        } else {
          document.querySelector(".inputTimeInitEdit").style.animation =
            "none 0.3s";
          document.querySelector(".inputTimeInitEdit").style.border =
            "1px solid";
        }

        let inputTimeEnd = document.querySelector(".inputTimeEndEdit").value;

        let fechaEnd = new Date(inputTimeEnd);

        if (fechaEnd <= fechaInit) {
          flagContinueAddEditReminder = false;
          document.querySelector(".inputTimeEndEdit").style.border =
            "2px solid tomato";
          document.querySelector(".inputTimeEndEdit").style.animation =
            "errInput 0.3s";
        } else if (inputTimeEnd == "") {
          flagContinueAddEditReminder = false;
          document.querySelector(".inputTimeEndEdit").style.border =
            "2px solid tomato";
          document.querySelector(".inputTimeEndEdit").style.animation =
            "errInput 0.3s";
        } else {
          document.querySelector(".inputTimeEndEdit").style.animation =
            "none 0.3s";
          document.querySelector(".inputTimeEndEdit").style.border =
            "1px solid";
        }

        let inputNumberFrequency = document.querySelector(
          ".inputNumberFrequencyEdit"
        ).value;
        if (inputNumberFrequency <= 0) {
          flagContinueAddEditReminder = false;
          document.querySelector(".inputNumberFrequencyEdit").style.border =
            "2px solid tomato";
          document.querySelector(".inputNumberFrequencyEdit").style.animation =
            "errInput 0.3s";
        } else {
          document.querySelector(".inputNumberFrequencyEdit").style.animation =
            "none 0.3s";
          document.querySelector(".inputNumberFrequencyEdit").style.border =
            "1px solid";
        }

        let inputTimeDate = document.querySelectorAll(".inputTimeDateEdit");

        if (inputNumberFrequency > 0) {
          inputTimeDate.forEach((element) => {
            if (element.value <= 0) {
              flagContinueAddEditReminder = false;
              element.style.border = "2px solid tomato";
              element.style.animation = "errInput 0.3s";
            } else {
              element.style.animation = "none 0.3s";
              element.style.border = "1px solid";
            }
          });
        }

        if (flagContinueAddEditReminder && item != null) {
          // Obtener los nuevos valores de edición
          const newNameReminder =
            editForm.querySelector(".inputNameEdit").value;
          const newNameMedicine = editForm.querySelector(
            ".inputDescriptionEdit"
          ).value;
          const newTimeInit =
            editForm.querySelector(".inputTimeInitEdit").value;
          const newTimeEnd = editForm.querySelector(".inputTimeEndEdit").value;
          const newNumberFrequency = editForm.querySelector(
            ".inputNumberFrequencyEdit"
          ).value;

          // Actualizar los valores en el elemento del recordatorio
          item.querySelector(".titleReminder").textContent = newNameReminder;
          item.querySelector(".nameMedicine").textContent = newNameMedicine;
          item.querySelector(".timeInit").textContent = newTimeInit;
          item.querySelector(".timeEnd").textContent = newTimeEnd;
          item.querySelector(".numberFrequency").textContent =
            newNumberFrequency;

          item
            .querySelector(".description")
            .querySelectorAll(".pTimeDate")
            .forEach((timeDate) => {
              timeDate.remove();
            });

          let inputTimeEdit = document.querySelectorAll(".inputTimeDateEdit");

          for (
            let i = 0;
            i < document.querySelector(".inputNumberFrequencyEdit").value;
            i++
          ) {
            let pTimeDate = document.createElement("p");
            pTimeDate.className = "pTimeDate";
            pTimeDate.textContent = `Hora del recordatorio ${i + 1}: `;
            let sTimeDate = document.createElement("strong");
            sTimeDate.className = "timeDate";
            sTimeDate.textContent = inputTimeEdit.item(i).value;
            item.querySelector(".description").appendChild(pTimeDate);
            pTimeDate.appendChild(sTimeDate);
          }

          let attributeItem = item.getAttribute("data-span");

          for (let i = dateReminder.dataSpan.length - 1; i >= 0; i--) {
            if (dateReminder.dataSpan[i] === attributeItem) {
              dateReminder.dataSpan.splice(i, 1);
              dateReminder.day.splice(i, 1);
              dateReminder.month.splice(i, 1);
              dateReminder.year.splice(i, 1);
            }
          }
          dateReminder.dataSpan.push(attributeItem);
          dateReminder.day.push(fechaInit.getDate() + 1);
          dateReminder.month.push(fechaInit.getMonth() + 1);
          dateReminder.year.push(fechaInit.getFullYear());

          for (let i = dateReminderEnd.dataSpan.length - 1; i >= 0; i--) {
            if (dateReminderEnd.dataSpan[i] === attributeItem) {
              dateReminderEnd.dataSpan.splice(i, 1);
              dateReminderEnd.day.splice(i, 1);
              dateReminderEnd.month.splice(i, 1);
              dateReminderEnd.year.splice(i, 1);
            }
          }
          dateReminderEnd.dataSpan.push(attributeItem);
          dateReminderEnd.day.push(fechaEnd.getDate() + 1);
          dateReminderEnd.month.push(fechaEnd.getMonth() + 1);
          dateReminderEnd.year.push(fechaEnd.getFullYear());

          for (let i = timeReminder.dataSpan.length - 1; i >= 0; i--) {
            if (timeReminder.dataSpan[i] === attributeItem) {
              timeReminder.dataSpan.splice(i, 1);
              timeReminder.hour.splice(i, 1);
              timeReminder.minute.splice(i, 1);
            }
          }

          for (
            let i = 0;
            i < document.querySelector(".inputNumberFrequencyEdit").value;
            i++
          ) {
            timeReminder.dataSpan.push(attributeItem);
            // contentReminder.dataSpan.push(attributeItem);
            let [hora, minutos] = inputTimeEdit.item(i).value.split(":");
            timeReminder.hour.push(hora);
            timeReminder.minute.push(minutos);
          }

          for (let i = contentReminder.dataSpan.length - 1; i >= 0; i--) {
            if (contentReminder.dataSpan[i] === attributeItem) {
              contentReminder.dataSpan.splice(i, 1);
              contentReminder.title.splice(i, 1);
              contentReminder.medicine.splice(i, 1);
            }
          }
          contentReminder.dataSpan.push(attributeItem);
          contentReminder.title.push(nameReminder);
          contentReminder.medicine.push(nameMedicine);
          
          // Ocultar la ventana de edición
          document.querySelector(".contentBlockPageEdit").style.top = "100%";

          item = null;

          setReminderLocalStorage();

        }
      });

      // Mostrar la ventana de edición
      document.querySelector(".contentBlockPageEdit").style.top = "0%";
    }
  });
}

setInterval(() => {
  let numberReminder = document.querySelectorAll(".itemReminder").length;
  if (numberReminder <= 0) {
    document.querySelector(".itemReminderNone").style.display = "block";
  } else {
    document.querySelector(".itemReminderNone").style.display = "none";
  }
}, 100);

//Reminder Form

//Spawn Config Notifications

function setKeyLocalStorage(){
  contentFlagConfigNotification = [flagGetNotification, flagGetNotificationReminder, flagGetNotificationSound, flagGetNotificationSpam];
  localStorage.setItem("notifConfig", JSON.stringify(contentFlagConfigNotification));  
}
let contentConfiguracion = document.querySelector(".contentConfiguracion");
let spawnConfigNotifications = document.querySelector(".spawn");
let btnSpawnConfigNotifications =
  contentConfiguracion.querySelector(".itemConfig");

let contentNavConfig = document.querySelector(".contentNavConfig");
let btnBackSpawnConfigNotifications =
  contentNavConfig.querySelector(".backContent");

btnSpawnConfigNotifications.addEventListener("click", () => {
  spawnConfigNotifications.style.left = "0%";
});

btnBackSpawnConfigNotifications.addEventListener("click", () => {
  spawnConfigNotifications.style.left = "-100%";
});

//Variables

let configGeneral = document.querySelector(".configGeneralNotification");
let btnActiveNotificationPush = configGeneral.querySelector(".itemConfig");

btnActiveNotificationPush.addEventListener("click", () => {
  if (flagGetNotification) {
    flagGetNotification = false;
    flagGetNotificationReminder = false;
    flagGetNotificationSound = false;
    flagGetNotificationSpam = false;
    document.querySelector(".stateToggleNotificaciones").textContent =
      "Desactivado";
      document.querySelectorAll(".itemNotif").forEach(element =>{
        element.querySelector(".checkNotification").checked = false;
      });
    } else {
    flagGetNotification = true;
    flagGetNotificationReminder = true;
    flagGetNotificationSound = true;
    flagGetNotificationSpam = true;
    document.querySelector(".stateToggleNotificaciones").textContent =
      "Activado";
      document.querySelectorAll(".itemNotif").forEach(element =>{
        element.querySelector(".checkNotification").checked = true;
      });
  }
  setKeyLocalStorage();
});

document.querySelector(".reminderNotification").addEventListener("change", () =>{
  if(document.querySelector(".reminderNotification").checked == false && document.querySelector(".soundNotification").checked == false && document.querySelector(".spamNotification").checked == false){
    flagGetNotification = false;
    flagGetNotificationReminder = false;
    flagGetNotificationSound = false;
    flagGetNotificationSpam = false;
    document.querySelector(".stateToggleNotificaciones").textContent =
      "Desactivado";
  }

  if(document.querySelector(".reminderNotification").checked == true){
    flagGetNotificationReminder = true;
    document.querySelector(".stateToggleNotificaciones").textContent =
    "Activado";
  }else{
    flagGetNotificationReminder = false;
    flagGetNotificationSound = false;
    document.querySelector(".soundNotification").checked = false;
  }
  setKeyLocalStorage();
});

document.querySelector(".soundNotification").addEventListener("change", () =>{
  if(document.querySelector(".reminderNotification").checked == false && document.querySelector(".soundNotification").checked == false && document.querySelector(".spamNotification").checked == false){
    flagGetNotification = false;
    flagGetNotificationReminder = false;
    flagGetNotificationSound = false;
    flagGetNotificationSpam = false;
    document.querySelector(".stateToggleNotificaciones").textContent =
      "Desactivado";
  }

  if(document.querySelector(".soundNotification").checked == true){
    flagGetNotificationSound = true;
    flagGetNotificationReminder = true;
    document.querySelector(".reminderNotification").checked = true;
    document.querySelector(".stateToggleNotificaciones").textContent =
    "Activado";
  }else{
    flagGetNotificationSound = false;
  }
  setKeyLocalStorage();
});

document.querySelector(".spamNotification").addEventListener("change", () =>{
  if(document.querySelector(".reminderNotification").checked == false && document.querySelector(".soundNotification").checked == false && document.querySelector(".spamNotification").checked == false){
    flagGetNotification = false;
    flagGetNotificationReminder = false;
    flagGetNotificationSound = false;
    flagGetNotificationSpam = false;
    document.querySelector(".stateToggleNotificaciones").textContent =
      "Desactivado";
  }

  if(document.querySelector(".spamNotification").checked == true){
    flagGetNotificationSpam = true;
    document.querySelector(".stateToggleNotificaciones").textContent =
    "Activado";
  }else{
    flagGetNotificationSpam = false;
  }
  setKeyLocalStorage();
});


//Sound

let allItemConfig = document.querySelectorAll(".itemConfig");

let sounds = Array.from(allItemConfig).filter(element => {
  const soundNumber = element.getAttribute("data-sound");
  return soundNumber === "1" || soundNumber === "2" || soundNumber === "3" || soundNumber === "4";
});

let audioSounds = [null, null, null, null];

sounds.forEach(element => {
  let iconPlaySound = element.querySelector(".iconPlaySound");
  let soundNumber = parseInt(element.getAttribute("data-sound"));

  iconPlaySound.addEventListener("click", () => {
    if (audioSounds[soundNumber - 1] === null) {
      for (let i = 0; i < audioSounds.length; i++) {
        if (audioSounds[i]) {
          const previousIcon = sounds[i].querySelector(".iconPlaySound").getElementsByTagName("i").item(0);
          previousIcon.className = "fa-regular fa-circle-play fa-lg"; // Cambiar el icono de sonido activo previo
          audioSounds[i].pause();
          audioSounds[i].removeEventListener("ended", endedHandler);
          audioSounds[i] = null;
        }
      }
      audioSounds[soundNumber - 1] = new Audio(soundFiles[soundNumber - 1]); // Asignar el sonido correcto
      audioSounds[soundNumber - 1].addEventListener("ended", endedHandler);
      const currentIcon = iconPlaySound.getElementsByTagName("i").item(0);
      currentIcon.className = "fa-regular fa-circle-pause fa-lg"; // Cambiar el icono
      audioSounds[soundNumber - 1].play();
    } else {
      const currentIcon = iconPlaySound.getElementsByTagName("i").item(0);
      currentIcon.className = "fa-regular fa-circle-play fa-lg";
      audioSounds[soundNumber - 1].pause();
      audioSounds[soundNumber - 1].removeEventListener("ended", endedHandler);
      audioSounds[soundNumber - 1] = null;
    }
  });

  function endedHandler() {
    const currentIcon = iconPlaySound.getElementsByTagName("i").item(0);
    currentIcon.className = "fa-regular fa-circle-play fa-lg";
  }
});

let checkSounds = document.querySelectorAll(".checkSound");
let flagActiveCheckSounds = true;

checkSounds.forEach(element =>{
  element.addEventListener('change',function(){

    if(element.checked == false){
      element.checked = true;
      let routeSound = soundFiles[parseFloat(element.getAttribute("data-check")) - 1];
      contentReminder.sound[0] = routeSound.toString();
      checkAudio.src = contentReminder.sound[0];
      checkAudio.addEventListener("loadedmetadata", () =>{
        contentReminder.soundDuration[0] = checkAudio.duration;    
      });
      
    }else{

      let dataCheck = element.getAttribute("data-check");
      let routeSound = soundFiles[parseFloat(dataCheck) - 1];
      contentReminder.sound[0] = routeSound.toString();
      checkAudio.src = contentReminder.sound[0];
      checkAudio.addEventListener("loadedmetadata", () =>{
        contentReminder.soundDuration[0] = checkAudio.duration;  
        setReminderLocalStorage(); 
      });

      checkSounds.forEach(checkSound =>{
        if(checkSound.getAttribute("data-check") != dataCheck){
          checkSound.checked = false;
        }
      });
    }
    setReminderLocalStorage(); 
  });
});

//Sound

//Spawn Config Notifications

if(contentReminder.sound[0] == null || contentReminder.sound[0] == undefined){
  
  checkAudio.src = "../../../sound/sound.mp3";
  contentReminder.sound[0] = checkAudio.src;
  checkAudio.addEventListener("loadedmetadata", () =>{
    if(contentReminder.soundDuration[0] == null || contentReminder.soundDuration[0] == undefined){
      contentReminder.soundDuration[0] = checkAudio.duration;
      setReminderLocalStorage();
    }
  });
}

//Spawn config cuenta

document.querySelector(".backContentCuenta").addEventListener("click", ()=>{
  document.querySelector(".spawnConfigCuenta").style.left = "-100%";
});

//Spawn config cuenta

//Spawn almacenar info medica

let btnItemConfigDataMedical = document.querySelector(".configDatosMedicos").querySelectorAll(".itemConfig");

btnItemConfigDataMedical.forEach(element =>{
  element.addEventListener("click", () =>{
    if(element.getAttribute("data-dataMedical") == "1"){

      document.querySelector(".spawnAlmacenar").style.left = "0%";
    
    }else if(element.getAttribute("data-dataMedical") == "2"){
  
      document.querySelector(".spawnConsultar").style.left = "0%";

    }
  })
});

document.querySelector(".backContentAlmacenar").addEventListener("click", ()=>{
  document.querySelector(".spawnAlmacenar").style.left = "-100%";
});

document.querySelector(".backContentConsultar").addEventListener("click", ()=>{
  document.querySelector(".spawnConsultar").style.left = "-100%";
});


let contentMedicineActuality = document.querySelector(".medicineActuality");

let numbersMedicine = contentMedicineActuality.querySelector(".listMedicine");

numbersMedicine.addEventListener("input", (event) =>{
  
  let number = event.target.value;

  if(document.querySelector(".itemConfigAntecedentes")){
    document.querySelectorAll(".itemConfigAntecedentes").forEach(element =>{
      element.remove();
    });
  }

  if((number != null || number != undefined) && parseFloat(number) <= 20){
    for(let i = 0; i < number; i++){

      let listConfig = contentMedicineActuality.querySelector(".listConfig");

      let newLi = document.createElement("li");
      newLi.className = "itemConfigAntecedentes";

      let textMedicine = document.createElement("h5");
      textMedicine.className = "textMedicine";
      textMedicine.textContent = "Medicina "+(i+1)+"";

      let nameMedicine = document.createElement("input");
      nameMedicine.type = "text";
      nameMedicine.className = "nameMedicine";
      nameMedicine.name = "nameMedicine";
      nameMedicine.placeholder = "Nombre del medicamento";

      let numberDosis = document.createElement("input");
      numberDosis.type = "number";
      numberDosis.className = "numberDosis";
      numberDosis.name = "numberDosis";
      numberDosis.placeholder = "Numero de dosis por semana";

      listConfig.appendChild(newLi);
      newLi.appendChild(textMedicine);
      newLi.appendChild(nameMedicine);
      newLi.appendChild(numberDosis);
      

    }
  }

});

//Spawn almacenar info medica

//Spawn password and security

let itemCuenta2 = document.querySelectorAll(".itemCuentaConfig");

itemCuenta2.forEach(element =>{
  element.addEventListener("click", () =>{
    if(element.getAttribute("data-cuenta") == "1"){
      document.querySelector(".spawnPasswordAndSecurity").style.left = "0%";
    }else if(element.getAttribute("data-cuenta") == "2"){
      document.querySelector(".spawnDataPersonal").style.left = "0%";
    }
  });
});

document.querySelector(".backPasswordAndSecurity").addEventListener("click", ()=>{
  document.querySelector(".spawnPasswordAndSecurity").style.left = "-100%";
});

let closeSpawnResetPassword = document.querySelector(".closePopupPassword");

closeSpawnResetPassword.addEventListener("click", () =>{
  document.querySelector(".spawnPopupPassword").style.display = "none";
  document.querySelector(".contentPasswordBlock").style.display = "none";
});

let btnResetPassword = document.querySelectorAll(".itemPasswordReset");

btnResetPassword.forEach(element =>{

  element.addEventListener("click", () =>{
    if(element.getAttribute("data-resetpassword") === "1"){
      document.querySelector(".spawnPopupPassword").style.display = "flex";
      document.querySelector(".contentPasswordBlock").style.display = "flex";
    }
  });

});

let codeResetPassword = document.querySelector(".codeResetPassword");

codeResetPassword.addEventListener("input", () => {
  let valueCode = codeResetPassword.value;
  let lenCode = valueCode.length;
  if (lenCode > 6) {
    codeResetPassword.value = valueCode.slice(0, 6);
  }
});


//Spawn password and security


//Spawn informacion personal

let backDataPersonal = document.querySelector(".backDataPersonal");

backDataPersonal.addEventListener("click", () =>{
  document.querySelector(".spawnDataPersonal").style.left = "-100%";
});

function spawNotificationAlert(){
  document.querySelector(".spawnNotificationAlert").style.top = "0%";

  setTimeout(() => {
    document.querySelector(".spawnNotificationAlert").style.top = "-40%";
  }, 4000);
}


setInterval(()=>{
  if(document.querySelector(".reminderNotification").checked == false && document.querySelector(".soundNotification").checked == false && document.querySelector(".spamNotification").checked == false){
    flagGetNotification = false;
    flagGetNotificationReminder = false;
    flagGetNotificationSound = false;
    flagGetNotificationSpam = false;
    document.querySelector(".stateToggleNotificaciones").textContent =
      "Desactivado";
  }
},100)