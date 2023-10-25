let searchGeoJSON = "../../../GeoJson/searchGeo.geojson";
let geoJSONPath = "../../../GeoJson/pharmacy.geojson";
let clinicGeoJSONPath = "../../../GeoJson/clinic.geojson";
let contPharmacy = 0;
let contDefaultPharmacy = 0;
let contClinic = 0;
let contDefaultClinic = 0;

let startPoint = null;
let endPoint = null;
let routingControl = null;
let routingControlClinic = null;

let flagRoutePharmacy = false;
let flagRouteClinica = false;

function requestNotification(){

  Notification.requestPermission().then(result =>{
    console.log("Respuesta: "+ result);
  })

}

function getDate() {
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


window.addEventListener("DOMContentLoaded", () => {
  getLocation();
  createMarkerClinic();
  createMarkerPharmacy();
  requestNotification();
});

function quitarTildes(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function deleteRoute() {
  if (routingControl) {
    map.removeControl(routingControl);
  }
}

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
      let circle = element.querySelector(".itemCircle");
      circle.querySelector(".fa-circle").classList.remove("fa-regular");
      circle.querySelector(".fa-circle").classList.add("fa-solid");
      
      setNotification();
      
      setTimeout(() => {
        circle.querySelector(".fa-circle").classList.add("fa-regular");
        circle.querySelector(".fa-circle").classList.remove("fa-solid");
      }, 1000);
    } else if (element.getAttribute("data-item") == 2) {
      let circle = element.querySelector(".itemCircle");
      circle.querySelector(".fa-circle").classList.remove("fa-regular");
      circle.querySelector(".fa-circle").classList.add("fa-solid");
      setTimeout(() => {
        circle.querySelector(".fa-circle").classList.add("fa-regular");
        circle.querySelector(".fa-circle").classList.remove("fa-solid");
      }, 1000);
    } else if (element.getAttribute("data-item") == 3) {
      let circle = element.querySelector(".itemCircle");
      circle.querySelector(".fa-circle").classList.remove("fa-regular");
      circle.querySelector(".fa-circle").classList.add("fa-solid");
      setTimeout(() => {
        circle.querySelector(".fa-circle").classList.add("fa-regular");
        circle.querySelector(".fa-circle").classList.remove("fa-solid");
      }, 1000);
    } else if (element.getAttribute("data-item") == 4) {
      let circle = element.querySelector(".itemCircle");
      circle.querySelector(".fa-circle").classList.remove("fa-regular");
      circle.querySelector(".fa-circle").classList.add("fa-solid");
      document.querySelector(".contentMap").style.top = "0%";
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

let buttonsGeneral = document
  .querySelector(".configGeneral")
  .querySelectorAll(".itemConfig");

buttonsGeneral.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.getAttribute("data-general") == "1") {
      let color = prompt("Digite algo");
      let root = document.documentElement;
      root.style.setProperty("--background_1", color);
    } else if (element.getAttribute("data-general") == "2") {
    } else if (element.getAttribute("data-general") == "3") {
    } else if (element.getAttribute("data-general") == "4") {
    }
  });
});

//Spawn Notificaciones

let map = L.map("map", {
  zoomControl: false
}).setView([0, 0], 13);

const customZoomControl = L.control.zoom({
  position: 'bottomright', // Cambiar la posición del control de zoom (también puedes usar 'topleft', 'bottomright', 'bottomleft', etc.)
});


customZoomControl.addTo(map);

L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}",
  {
    minZoom: 0,
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: "png",
  }
).addTo(map);

var pharmacyIcon = L.icon({
  iconUrl: "../../../img/markets/marketFarmacia.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

var clinicIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/7987/7987089.png ",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

var clientIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/7291/7291700.png ",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

var transparentIcon = L.divIcon({
  className: 'transparent-icon', // Clase CSS para el icono
  iconSize: [0, 0], // Tamaño del icono
});


function createRouteToPlace(latlng) {
  if (routingControl) {
    map.removeControl(routingControl);
  }

  routingControl = L.Routing.control({
    waypoints: [
      L.latLng(startPoint.lat, startPoint.lon),
      L.latLng(latlng),
    ],
    routeWhileDragging: false,
    show: false
  }).addTo(map);

  const routingContainer = document.querySelector(".leaflet-routing-container");
  if (routingContainer) {
    routingContainer.style.display = "none";
  }
  

  routingControl.on("routesfound", function (e) {
    let route = e.routes[0];
    let distance = route.summary.totalDistance;
    let time = route.summary.totalTime;

    let distanceInKm = distance / 1000;
    let timeInMinutes = (time / 60) * 2;

    document.querySelector(".distanceLabel").textContent ="Distancia: "+ distanceInKm.toFixed(1) + "km";
    document.querySelector(".timeLabel").textContent ="Tiempo estimado: "+ timeInMinutes.toFixed(1) + " minutos";
  });
}

function createMarkerPharmacy() {
  fetch(geoJSONPath)
    .then((response) => response.json())
    .then((data) => {
      L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
          contPharmacy++;
          if (feature.properties.name == "default") {
            contDefaultPharmacy++;
          }
          const marker = L.marker(latlng, { icon: pharmacyIcon }).bindPopup(
            `<div class="contentRoutePharmacy">
              <h3>${feature.properties.name}</h3>
              <button class="buttonRoutePharmacy">Como llegar</button>
            </div>`
          );
          marker.addTo(map);

          marker.addEventListener("popupopen", () => {
            if(document.querySelector(".buttonRoutePharmacy")){
              document.querySelector(".buttonRoutePharmacy").addEventListener("click", () => {
                flagRoutePharmacy = true;
                flagRouteClinica = false;
                map.removeLayer(marker);
                createRouteToPlace(latlng);
                map.addLayer(marker);
              });
            }
          });

          return marker;
        },
      });

      console.log("Número total de farmacias: " + contPharmacy);
      console.log("Número de farmacias sin nombre: " + contDefaultPharmacy);
    })
    .catch((error) => {
      console.error("Error al cargar datos del GeoJSON: " + error);
    });
}


function deleteMarkerPharmacy() {
  fetch(clinicGeoJSONPath)
    .then((response) => response.json())
    .then((data) => {
      const filteredData = data.features.filter(
        (feature) => feature.properties.amenity == "clinic"
      );

      map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      if (checkClinic.checked != false) {
          createMarkerClinic();
          if(!flagRouteClinica){
            deleteRoute();
          }
      }
    })
    .catch((error) => {
      console.error("Error al cargar datos del GeoJSON: " + error);
    });
}

function createMarkerClinic() {
  fetch(clinicGeoJSONPath)
    .then((response) => response.json())
    .then((data) => {
      L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
          contClinic++;
          if (feature.properties.name == "default") {
            contDefaultClinic++;
          }
          const marker = L.marker(latlng, { icon: clinicIcon }).bindPopup(
            `<div class="contentRouteClinic">
            <h3>${feature.properties.name}</h3>
            <button class="buttonRouteClinic">Como llegar</button>
            </div>
            `
          );
          marker.addTo(map);

          marker.addEventListener("popupopen", () => {
            if(document.querySelector(".buttonRouteClinic")){
              document.querySelector(".buttonRouteClinic").addEventListener("click", () => {
                flagRoutePharmacy = false;
                flagRouteClinica = true;
                map.removeLayer(marker);
                createRouteToPlace(latlng);
                map.addLayer(marker);
              });
            }
          });
          

          return marker;
        },
      }).addTo(map);

      marker.addEventListener("popupopen", () => {
        document.querySelector(".buttonRouteClinic").addEventListener("click", () => {
          map.removeLayer(marker);
          createRouteToClinic(latlng);
        });
      });

      console.log("Número total de Hospitales: " + contClinic);
      console.log("Número de Hospitales sin nombre: " + contDefaultClinic);
    })
    .catch((error) => {
      console.error("Error al cargar datos del GeoJSON: " + error);
    });
}

function deleteMarkerClinic() {
  fetch(geoJSONPath)
    .then((response) => response.json())
    .then((data) => {
      // Filtrar las características que no tengan el nombre "default"
      const filteredData = data.features.filter(
        (feature) => feature.properties.amenity == "pharmacy"
      );

      // Limpiar todas las capas existentes
      map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      if (checkPharmacy.checked != false) {
          createMarkerPharmacy();
          if(!flagRoutePharmacy){
            deleteRoute();
          }
      }
    })
    .catch((error) => {
      console.error("Error al cargar datos del GeoJSON: " + error);
    });
}

// let contClicksDeleteMarker = 0;
// let buttonDeleteMarker = document.querySelector(".buttonDeleteMarker");
// buttonDeleteMarker.addEventListener("click", () =>{
//   contClicksDeleteMarker++;
//   if(contClicksDeleteMarker % 2 != 0){
//     deleteMarkerPharmacy();
//   }else{
//     createMarkerPharmacy();
//   }
// });

var marker;

function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;

      startPoint = {
        lat: lat,
        lon: lon,
      };

      if (marker) {
        map.removeLayer(marker);
      }

      marker = L.marker([lat, lon], { icon: clientIcon }).addTo(map);
      var popupContent = `<h3>Ubicacion Actual</h3><p style="font-size:12px;">Lat:${lat} - Lon:${lon}</p>`;
      marker.bindPopup(popupContent);
      marker
        .getPopup()
        .setContent(
          `<div style="width:100%; height:100%; display:flex; flex-direction:colum; aling-items:center; justify-content:center;">${popupContent}</div>`
        );

      marker.addEventListener("mouseover", () => {
        marker.bindPopup(popupContent).openPopup();
      });

      marker.addEventListener("mouseout", () => {
        marker.bindPopup(popupContent).closePopup();
      });

      map.setView([lat, lon], 15);

      // Luego de obtener la ubicación actual, si tienes una coordenada de destino (endPoint), puedes crear la ruta:
      if (endPoint) {
        createRouteToPlace(endPoint);
      }
    });
  } else {
    alert("Tu navegador no admite la geolocalización.");
  }
}


let buttonLocation = document.querySelector(".location");
buttonLocation.addEventListener("click", getLocation);

map.on("click", onMapClick);

function onMapClick(e) {
  if (marker) {
    map.removeLayer(marker);
  }

  marker = L.marker(e.latlng, { icon: clientIcon }).addTo(map);
  var popupContent = `<h3>Ubicacion Actual</h3><p style="font-size:12px;">Lat:${e.latlng.lat.toFixed(
    5
  )} - Lon:${e.latlng.lng.toFixed(5)}</p>`;
  marker.bindPopup(popupContent);
  marker
    .getPopup()
    .setContent(
      `<div style="width:100%; height:100%; display:flex; flex-direction:colum; aling-items:center; justify-content:center;">${popupContent}</div>`
    );

  marker.addEventListener("mouseover", () => {
    marker.bindPopup(popupContent).openPopup();
  });

  marker.addEventListener("mouseout", () => {
    marker.bindPopup(popupContent).closePopup();
  });
  console.log(e.latlng.lng + " , " + e.latlng.lat);
}

let srchLocation = document.querySelector(".srchLocation");
let btnCoords = document.querySelector(".searchButtonLocation");

function findLocation(name) {
  fetch(searchGeoJSON)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar el archivo GeoJSON");
      }
      return response.json();
    })
    .then((geojsonData) => {
      geojsonData.features.forEach((feature) => {
        if (feature.properties.amenity == "hospital") {
          if (checkClinic.checked == true) {
            if (quitarTildes(feature.properties.name).toLowerCase() == name) {
              let lat = feature.geometry.coordinates[1];
              let lon = feature.geometry.coordinates[0];
              map.setView([lat, lon], 18);
            }
          }
        } else if (feature.properties.amenity == "pharmacy") {
          if (checkPharmacy.checked == true) {
            if (quitarTildes(feature.properties.name).toLowerCase() == name) {
              let lat = feature.geometry.coordinates[1];
              let lon = feature.geometry.coordinates[0];
              map.setView([lat, lon], 18);
            }
          }
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

btnCoords.addEventListener("click", () => {
  findLocation(quitarTildes(srchLocation.value).toLowerCase());
});

let inputSearchLocation = document.querySelector(".srchLocation");
let contentSearchJSON = document.querySelector(".contentSearchJSON");

// inputSearchLocation.addEventListener("mouseenter", () => {
//   contentSearchJSON.style.display = "block";
//   inputSearchLocation.style.borderRadius = "initial";
//   inputSearchLocation.style.borderTopLeftRadius = "5px"
//   inputSearchLocation.style.borderTopRightRadius = "5px"
// });

contentSearchJSON.addEventListener("mouseleave", () => {
  contentSearchJSON.style.display = "none";
  inputSearchLocation.style.borderRadius = "5px";
});


// Función para obtener los datos limitados a 3 elementos
function fetchData(inputValue) {

  inputValue = quitarTildes(inputValue).toLowerCase();

  let splitInputValue = inputValue.split('');
  let placeContent = {
    amenity: [],
    name: [],
    coordsLat: [],
    coordsLon: [],
    id: []
  };
  let count = 0; // Variable de conteo

  return fetch(searchGeoJSON)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar el archivo GeoJSON");
      }
      return response.json();
    })
    .then((geojsonData) => {
      geojsonData.features.forEach((feature) => {
        if(count < 4){
          let flagSearch = true;
          let name = quitarTildes(feature.properties.name).toLowerCase();
          let splitName = name.split('');

          for(let i = 0; i < splitInputValue.length; i++){
            if(splitInputValue[i] != splitName[i]){
              flagSearch = false;
              break;
            }
          }

          if(flagSearch == true){
            placeContent.amenity.push(feature.properties.amenity);
            placeContent.name.push(feature.properties.name);
            placeContent.coordsLat.push(feature.geometry.coordinates[0]);
            placeContent.coordsLon.push(feature.geometry.coordinates[1]);
            placeContent.id.push(feature.id);
            count++;
          }
        }

      });

      return placeContent;
    })
    .catch((error) => {
      console.error(error);
    });
}

// Evento cuando se escribe en el input
inputSearchLocation.addEventListener("input", (event) => {
  contentSearchJSON.style.display = "block";
  inputSearchLocation.style.borderRadius = "initial";
  inputSearchLocation.style.borderTopLeftRadius = "5px"
  inputSearchLocation.style.borderTopRightRadius = "5px"
  
  let inputValue = event.target.value;

  fetchData(inputValue).then((placeContent) => {

    let length = placeContent.amenity.length;

    if(document.querySelector(".itemSearch")){
      document.querySelectorAll(".itemSearch").forEach(element =>{
        element.remove();
      });
    }
    for(let i = 0; i < length; i++){
      let listSearch = document.querySelector(".listSearch");

      let itemSearch = document.createElement("li");
      itemSearch.className = "itemSearch"
      itemSearch.setAttribute("data-search", placeContent.id[i].toString());
    
      let iconSearch = document.createElement("span");
      iconSearch.className = "iconSearch";

      let iconSearchi = document.createElement("i");
      if(placeContent.amenity[i] == "hospital"){
        iconSearch.className = "fa-solid fa-hospital fa-lg";
      }else if(placeContent.amenity[i] == "pharmacy"){
        iconSearch.className = "fa-solid fa-prescription-bottle-medical fa-lg";
      }

      let labelSearch = document.createElement("label");
      labelSearch.className = "labelSearch";
      labelSearch.textContent = placeContent.name[i];

      listSearch.appendChild(itemSearch);
      itemSearch.appendChild(iconSearch);
      itemSearch.appendChild(labelSearch);
      iconSearch.appendChild(iconSearchi);

      let itemsSearch = document.querySelectorAll(".itemSearch");

      itemsSearch.forEach(element =>{
        element.addEventListener("click", () =>{
          for(let i = 0; i < placeContent.id.length; i++){
            if(placeContent.id[i] == element.getAttribute("data-search")){
              map.setView([placeContent.coordsLon[i], placeContent.coordsLat[i]], 18);
              contentSearchJSON.style.display = "none";
              inputSearchLocation.style.borderRadius = "5px";
              inputSearchLocation.value = placeContent.name[i];
            }
          }
        });
      })
    }

  });
});




let checkClinic = document.querySelector(".filterClinic");
let checkPharmacy = document.querySelector(".filterPharmacy");

checkClinic.addEventListener("change", () => {
  if (checkClinic.checked == true) {
    createMarkerClinic();
  }else if(checkClinic.checked == false && checkPharmacy.checked == false){
    deleteRoute();
    deleteMarkerClinic();
  }else {
    deleteMarkerClinic();
  }
});

checkPharmacy.addEventListener("change", () => {
  if (checkPharmacy.checked == true) {
    createMarkerPharmacy();
  }else if(checkClinic.checked == false && checkPharmacy.checked == false){
    deleteRoute();
    deleteMarkerPharmacy();
  } else {
    deleteMarkerPharmacy();
  }
});

let buttonCloseFilter = document.querySelector(".closeFilterChecks");
let contClicksCloseFilter = 0;

buttonCloseFilter.addEventListener("click", () => {
  contClicksCloseFilter++;
  if (contClicksCloseFilter % 2 != 0) {
    document.querySelector(".filterMap").style.right = "-29%";
  } else {
    document.querySelector(".filterMap").style.right = "0%";
  }
});


