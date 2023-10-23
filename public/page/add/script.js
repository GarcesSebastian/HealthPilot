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

function setReminderNotification() {
  window.setPushNotification("Hola mundo", "Esto es una notificacion push", "../../../img/logo_small_icon_only_inverted.png", 2000);
}

function getDateTime() {
  const fechaActual = new Date();
  const hour = fechaActual.getHours();
  const minute = fechaActual.getMinutes();
  const second = fechaActual.getSeconds();

  let dateTime = {
    hours: hour,
    minutes: minute,
    seconds: second
  }

  return dateTime;
}

setInterval(() => {
  let timeNotification = getDateTime();
  let dateNotification = getDate();
  let horas;
  let minutos;

  if (hoursReminder[0] != undefined) {
    [horas, minutos] = hoursReminder[0].split(':').map(Number);
  }

  if (dateNotification.day == 23 && dateNotification.month == 10 && dateNotification.year == 2023) {
    if (timeNotification.hours === horas && timeNotification.minutes === minutos && timeNotification.seconds === 0) {
      setReminderNotification();
    }
  }

}, 1000);



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

  if(document.querySelectorAll(".itemTimeDateEdit")) {
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

    // Almacenar la hora de recordatorio en el obje[i] = inputTimeDate;
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

  if (
    fechaEnd.getMonth() + 1 < dateActuality.month ||
    fechaInit.getDate() + 1 >= fechaEnd.getDate() + 1 ||
    fechaEnd.getFullYear() < dateActuality.year
  ) {
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
      hoursReminder
    );
    document.querySelector(".contentBlockPage").style.top = "100%";
    clearInputs();
  } else {
    console.log("Llenar bien los campos");
  }
});

let flagContinueAddEditReminder = true;

function createReminder(
  nameReminder,
  nameMedicine,
  timeInit,
  timeEnd,
  numberFrequency,
  hoursReminder
) {
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

  let reminders = document.querySelectorAll(".itemReminder");
  let contClicksReminders = 0;

  reminders.forEach((element) => {
    element.querySelector(".showReminder").addEventListener("click", () => {
      contClicksReminders++;
      if (contClicksReminders % 2 != 0) {
        element.querySelector(".description").style.display = "flex";
        element.querySelector("#eye").classList.add("fa-eye-slash");
        element.querySelector("#eye").classList.remove("fa-eye");
      } else {
        element.querySelector(".description").style.display = "none";
        element.querySelector("#eye").classList.add("fa-eye");
        element.querySelector("#eye").classList.remove("fa-eye-slash");
      }
    });

    element.querySelector(".clearReminder").addEventListener("click", () => {
      element.remove();


    });

    let editsReminder = document.querySelectorAll(".editReminder");
    let sendReminderEdit = document.querySelector(".inputConfirmEdit");

    editsReminder.forEach(reminders => {

      reminders.addEventListener("click", () => {

        let item = reminders.parentNode.parentNode;

        document.querySelector(".inputNameEdit").value = item.querySelector(".titleReminder").textContent;
        document.querySelector(".inputDescriptionEdit").value = item.querySelector(".nameMedicine").textContent;
        document.querySelector(".inputTimeInitEdit").value = item.querySelector(".timeInit").textContent;
        document.querySelector(".inputTimeEndEdit").value = item.querySelector(".timeEnd").textContent;
        document.querySelector(".inputNumberFrequencyEdit").value = item.querySelector(".numberFrequency").textContent;

        createHoursElementsEdit(document.querySelector(".inputNumberFrequencyEdit").value);

        let inputTimesDate = document.querySelectorAll(".inputTimeDateEdit");

        for (let i = 0; i < inputTimesDate.length; i++) {
          inputTimesDate.item(i).value = document.querySelectorAll(".pTimeDate").item(i).querySelector(".timeDate").textContent;
        }

        document.querySelector(".contentBlockPageEdit").style.top = "0%";

        let nameReminder = document.querySelector(".inputNameEdit");
        let nameMedicine = document.querySelector(".inputDescriptionEdit");
        let timeInit = document.querySelector(".inputTimeInitEdit");
        let timeEnd = document.querySelector(".inputTimeEndEdit");
        let numberFrequency = document.querySelector(".inputNumberFrequencyEdit");
        let inputsTimeDateEdit = document.querySelectorAll(".inputTimeDateEdit");

        inputsTimeDateEdit.forEach(element => {
          for (let i = 0; i < inputsTimeDateEdit.length; i++) {
            hoursReminder[i] = element.value;
          }
        });

        function clickSendEditReminders(){
          item.querySelector(".titleReminder").textContent = nameReminder.value;
          item.querySelector(".nameMedicine").textContent = "Ibuprofeno";
          item.querySelector(".timeInit").textContent = 20-10-2023;
          item.querySelector(".timeEnd").textContent = 20-10-2023;
          item.querySelector(".numberFrequency").textContent = 2;
        }        

        sendReminderEdit.addEventListener("click", () => {
  
          document.querySelector(".contentBlockPageEdit").style.top = "100%";

        });

      });

    })

  })
}

setInterval(() => {
  let numberReminder = document.querySelectorAll(".itemReminder").length;
  if (numberReminder <= 0) {
    document.querySelector(".itemReminderNone").style.display = "block";
  } else {
    document.querySelector(".itemReminderNone").style.display = "none";
  }

}, 100);


// let reminders = document.querySelectorAll(".itemReminder");
// let contClicksReminders = 0;

// reminders.forEach(element =>{
//     element.querySelector(".showReminder").addEventListener("click", () =>{
//         contClicksReminders++;
//         if(contClicksReminders % 2 != 0){
//             element.querySelector(".description").style.display = "flex";
//             element.querySelector("#eye").classList.add("fa-eye-slash");
//             element.querySelector("#eye").classList.remove("fa-eye");
//         }else{
//             element.querySelector(".description").style.display = "none";
//             element.querySelector("#eye").classList.add("fa-eye");
//             element.querySelector("#eye").classList.remove("fa-eye-slash");
//         }
//     });

//     element.querySelector(".clearReminder").addEventListener("click", () =>{
//       element.remove();
//     });
// })

//Reminder Form
