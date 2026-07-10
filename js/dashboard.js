/* ==========================================
   Yuan Companion Dashboard
   v1.1
========================================== */

const Dashboard = {

    battery:80,

    capacity:60.48,

    consumption:15,

    animate(){

        let value=0;

        const timer=setInterval(()=>{

            value++;

            updateBattery(value);

            if(value>=Dashboard.battery){

                clearInterval(timer);

            }

        },12);

    }

}

function updateBattery(percent){

    const energy=
        Dashboard.capacity*percent/100;

    const range=
        energy/(Dashboard.consumption/100);

    batteryPercent.textContent=
        percent+"%";

    batteryEnergy.textContent=
        energy.toFixed(2)+" kWh";

    batteryRange.textContent=
        Math.round(range)+" km";

    const offset=
        597*(1-percent/100);

    batteryRing.style.strokeDashoffset=
        offset;

}
