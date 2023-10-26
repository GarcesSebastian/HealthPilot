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

    console.log(arrayBooleanNotification);

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

    console.log(arrayBooleanNotification);

    if(flagGetNotification){
      document.querySelector(".stateToggleNotificaciones").textContent = "Activado";
    }else{
      document.querySelector(".stateToggleNotificaciones").textContent = "Desactivado";
    }
  }

});

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

const audio = new Audio("../../../sound/sound.mp3");
audio.addEventListener("loadedmetadata", () => {
  contentReminder.soundDuration[0] = audio.duration;
  contentReminder.sound[0] = audio;
});

function requestNotification() {
  Notification.requestPermission().then((result) => {
    console.log("Respuesta: " + result);
  });
}

function detenerAudio() {
  if (contentReminder.sound[0] && flagGetNotificationSound == true) {
    contentReminder.sound[0].pause();
    contentReminder.sound[0].currentTime = 0;
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

    const options = {
      body:
        contentReminder.title[indexSpan] +
        "\n" +
        "Recordatorio para dosis de la medicina " +
        contentReminder.medicine[indexSpan],
      icon: "../../../img/logo_small_icon_only_inverted.png",
    };

    if(flagGetNotificationSound == true){
      contentReminder.sound[0].play();
    }

    const notificacion = new Notification("HealthPilot", options);

    document.querySelector(".btnPauseNotification").addEventListener("click", () =>{
      detenerAudio();
      notificacion.close();
      clearTimeout(waitNotification);
      document.querySelector(".spawnPauseNotification").style.right = "-20%";
    });

    let waitNotification = setTimeout(() => {
      detenerAudio();
      notificacion.close();
    }, contentReminder.soundDuration[0] * 1000);
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

setInterval(() => {
  let timeNotification = getDateTime();
  let dateNotification = getDate();

  for (let i = 0; i < dateReminder.day.length; i++) {
    if (
      dateNotification.day == dateReminder.day[i] &&
      dateNotification.month == dateReminder.month[i] &&
      dateNotification.year == dateReminder.year[i]
    ) {
      for (let j = 0; j < timeReminder.dataSpan.length; j++) {
        if (
          timeNotification.hours === parseInt(timeReminder.hour[j]) &&
          timeNotification.minutes === parseInt(timeReminder.minute[j]) &&
          timeNotification.seconds === 0
        ) {
          if(flagGetNotificationReminder == true){
            if(flagGetNotificationSound == true){
              document.querySelector(".spawnPauseNotification").style.right = "4%";
            }
            setNotification(timeReminder.dataSpan[j]);
          }else{
            console.log("Notificacion");
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
//   console.log(flagGetNotificationSound);
// }, 5000);

let dateActuality = getDate();

let buttonsFooter = document.querySelectorAll(".buttonFooter");

buttonsFooter.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.getAttribute("data-id") == "1") {
      window.location.href = "../home/index.html";
    } else if (element.getAttribute("data-id") == "2") {
      window.location.href = "../add/index.html";
    } else if (element.getAttribute("data-id") == "3") {
      window.location.href = "../calendary/index.html";
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

let audioInput = document.querySelector(".inputSound");
let audioPlayer = document.querySelector(".audioPlayer");

audioInput.addEventListener("change", (event) => {
  let selectedFile = event.target.files[0];
  if (selectedFile) {
    let audioURL = URL.createObjectURL(selectedFile);
    audioPlayer.src = audioURL;
    contentReminder.sound[0] = audioPlayer;
    audioPlayer.addEventListener("loadedmetadata", () => {
      contentReminder.soundDuration[0] = audioPlayer.duration;
    });
  }
});

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
      hoursReminder,
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
    sTimeDate.textContent = hoursReminder[i];
    description.appendChild(pTimeDate);
    pTimeDate.appendChild(sTimeDate);
  }
  // Agregar el nuevo <li> a la lista
  listReminder.appendChild(newli);

  showReminder.addEventListener("click", function () {
    description.style.display =
      description.style.display === "block" ? "none" : "block";
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

        let nameMedicine = document.querySelector(".inputTimeInitEdit").value;
        if (nameMedicine.length <= 18 && nameMedicine.length > 0) {
          document.querySelector(".inputTimeInitEdit").style.animation =
            "none 0.3s";
          document.querySelector(".inputTimeInitEdit").style.border =
            "1px solid";
        } else {
          flagContinueAddEditReminder = false;
          document.querySelector(".inputTimeInitEdit").style.border =
            "2px solid tomato";
          document.querySelector(".inputTimeInitEdit").style.animation =
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

          // Ocultar la ventana de edición
          document.querySelector(".contentBlockPageEdit").style.top = "100%";

          item = null;
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

//Spawn Config Notifications
