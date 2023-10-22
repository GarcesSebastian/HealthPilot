let searchGeoJSON = "../../../GeoJson/searchGeo.geojson";
let geoJSONPath = "../../../GeoJson/pharmacy.geojson";
let clinicGeoJSONPath = "../../../GeoJson/clinic.geojson";
let contPharmacy = 0;
let contDefaultPharmacy = 0;
let contClinic = 0;
let contDefaultClinic = 0;

let startPoint = null;
let endPoint = null;

window.addEventListener("DOMContentLoaded", () => {
  getLocation();
  createMarkerClinic();
  createMarkerPharmacy();
});

function quitarTildes(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// function setPushNotification(){
//   Push.create("Hello world!", {
//     body: "How's it hangin'?",
//     icon: '../../../img/logo_small_icon_only_inverted.png',
//     timeout: 4000,
//     onClick: function () {
//         window.focus();
//         this.close();
//     }
// });
// }

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
      setTimeout(() => {
        circle.querySelector(".fa-circle").classList.add("fa-regular");
        circle.querySelector(".fa-circle").classList.remove("fa-solid");
      }, 1000);
    } else if (element.getAttribute("data-item") == 2) {
      let circle = element.querySelector(".itemCircle");
      circle.querySelector(".fa-circle").classList.remove("fa-regular");
      circle.querySelector(".fa-circle").classList.add("fa-solid");

      // setPushNotification();

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

let map = L.map("map").setView([0, 0], 13);

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
            `<div>
            <h3>${feature.properties.name}</h3>
            <input type="button" value="Como llegar" class="buttonRoutePharmacy">
            </div>
            `
          );
          marker.addTo(map);

          marker.addEventListener("popupopen", () => {
            document
              .querySelector(".buttonRoutePharmacy")
              .addEventListener("click", () => {
                L.Routing.control({
                  waypoints: [
                    L.latLng(startPoint.lat, startPoint.lon),
                    L.latLng(latlng),
                  ],
                  routeWhileDragging: false,
                  show: false,
                })
                  .addTo(map)
                  .on("routesfound", function (e) {
                    let route = e.routes[0];
                    let distance = route.summary.totalDistance; // Distancia en metros
                    let time = route.summary.totalTime; // Tiempo en segundos

                    let distanceInKm = distance / 1000;
                    let timeInMinutes = time / 60;

                    console.log(`Distancia: ${distanceInKm} km`);
                    console.log(`Tiempo: ${timeInMinutes} minutos`);
                  });
              });
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
        L.geoJSON(filteredData, {
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, { icon: clinicIcon }).bindPopup(
              `<h3>${feature.properties.name}</h3>`
            );
          },
        }).addTo(map);
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
          return L.marker(latlng, { icon: clinicIcon }).bindPopup(
            `<h3>${feature.properties.name}</h3>`
          );
        },
      }).addTo(map);

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
        L.geoJSON(filteredData, {
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, { icon: pharmacyIcon }).bindPopup(
              `<h3>${feature.properties.name}</h3>`
            );
          },
        }).addTo(map);
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
        if (feature.properties.amenity == "clinic") {
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

let checkClinic = document.querySelector(".filterClinic");
let checkPharmacy = document.querySelector(".filterPharmacy");

checkClinic.addEventListener("change", () => {
  if (checkClinic.checked == true) {
    createMarkerClinic();
  } else {
    deleteMarkerClinic();
  }
});

checkPharmacy.addEventListener("change", () => {
  if (checkPharmacy.checked == true) {
    createMarkerPharmacy();
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


