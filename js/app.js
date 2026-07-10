/* ==========================================================
   Yuan Companion
   app.js
   v1.0 Alpha
========================================================== */

const BATTERY_CAPACITY = 60.48;      // kWh útiles
const AVG_CONSUMPTION = 15.0;        // kWh /100 km
const RING_LENGTH = 628;

const $ = (id) => document.getElementById(id);

/* ==========================
   Elementos
========================== */

const batteryPercent = $("batteryPercent");
const batteryEnergy = $("batteryEnergy");
const batteryRange = $("batteryRange");
const batteryRing = $("batteryRing");

const today = $("today");

const start = $("start");
const target = $("target");

const startValue = $("startValue");
const targetValue = $("targetValue");

const charger = $("charger");
const price = $("price");

const energyResult = $("energyResult");
const timeResult = $("timeResult");
const costResult = $("costResult");
const rangeResult = $("rangeResult");

const calculateBtn = $("calculate");
const statusMessage = $("statusMessage");

/* ==========================
   Inicio
========================== */

document.addEventListener("DOMContentLoaded", () => {

    loadDate();

    restoreSettings();

    updateDashboard(80);

    calculate();

    events();

});

/* ==========================
   Eventos
========================== */

function events(){

    start.addEventListener("input",()=>{

        startValue.textContent = start.value + "%";

        calculate();

    });

    target.addEventListener("input",()=>{

        targetValue.textContent = target.value + "%";

        calculate();

    });

    charger.addEventListener("change",calculate);

    price.addEventListener("input",calculate);

    calculateBtn.addEventListener("click",calculate);

}

/* ==========================
   Fecha
========================== */

function loadDate(){

    const now = new Date();

    const options = {

        weekday:"long",
        day:"numeric",
        month:"long"

    };

    today.textContent = now.toLocaleDateString("es-CO",options);

}

/* ==========================
   Dashboard
========================== */

function updateDashboard(percent){

    batteryPercent.textContent = percent + "%";

    const energy = BATTERY_CAPACITY * percent /100;

    const range = energy / (AVG_CONSUMPTION/100);

    batteryEnergy.textContent =
        energy.toFixed(2) + " kWh";

    batteryRange.textContent =
        Math.round(range) + " km";

   function updateRing(percent){

const offset =
RING_LENGTH*(1-percent/100);

batteryRing.animate(

[
{

strokeDashoffset:RING_LENGTH

},

{

strokeDashoffset:offset

}

],

{

duration:900,

fill:"forwards",

easing:"ease-out"

}

);

}

    updateStatus(range);

}

/* ==========================
   Indicador batería
========================== */

function updateRing(percent){

    const offset =
        RING_LENGTH * (1-percent/100);

    batteryRing.style.strokeDashoffset =
        offset;

}

/* ==========================
   Estado inteligente
========================== */

function updateStatus(range){

    if(range>250){

        statusMessage.textContent =
        "No necesitas cargar hoy. La autonomía disponible es suficiente para un uso normal.";

        return;

    }

    if(range>120){

        statusMessage.textContent =
        "Todavía puedes conducir con tranquilidad, pero conviene planear la próxima carga.";

        return;

    }

    statusMessage.textContent =
    "La batería está baja. Se recomienda realizar una carga antes de un recorrido largo.";

}

/* ==========================
   Calculadora
========================== */

function calculate(){

    let initial = Number(start.value);

    let objective = Number(target.value);

    if(objective<=initial){

        objective = initial+1;

        target.value = objective;

        targetValue.textContent = objective+"%";

    }

    const energy =
        ((objective-initial)/100)
        * BATTERY_CAPACITY;

    const power =
        Number(charger.value);

    const hours =
        energy/power;

    const h =
        Math.floor(hours);

    const m =
        Math.round((hours-h)*60);

    const cost =
        energy*Number(price.value);

    const range =
        energy/(AVG_CONSUMPTION/100);

    energyResult.textContent =
        energy.toFixed(2)+" kWh";

    timeResult.textContent =
        `${h} h ${m} min`;

    costResult.textContent =
        "$"+Math.round(cost).toLocaleString("es-CO");

    rangeResult.textContent =
        Math.round(range)+" km";

    saveSettings();

}

/* ==========================
   Guardar configuración
========================== */

function saveSettings(){

    const data={

        start:start.value,

        target:target.value,

        charger:charger.value,

        price:price.value

    };

    localStorage.setItem(

        "yuan-companion",

        JSON.stringify(data)

    );

}

/* ==========================
   Restaurar configuración
========================== */

function restoreSettings(){

    const data =
        localStorage.getItem("yuan-companion");

    if(!data) return;

    const settings = JSON.parse(data);

    start.value = settings.start;

    target.value = settings.target;

    charger.value = settings.charger;

    price.value = settings.price;

    startValue.textContent =
        settings.start+"%";

    targetValue.textContent =
        settings.target+"%";

}

/* ==========================
   API futura
========================== */

const YuanAPI = {

    batteryCapacity(){

        return BATTERY_CAPACITY;

    },

    consumption(){

        return AVG_CONSUMPTION;

    }

};

window.YuanAPI = YuanAPI;
