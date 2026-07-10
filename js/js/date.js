function greeting(){

    const hour=
        new Date().getHours();

    if(hour<12)
        return "Buenos días";

    if(hour<19)
        return "Buenas tardes";

    return "Buenas noches";

}

function loadHeader(){

    const options={

        weekday:"long",

        day:"numeric",

        month:"long"

    };

    const now=new Date();

    document.getElementById("today").innerHTML=

        greeting()+" Andrés<br>"+

        now.toLocaleDateString(

            "es-CO",

            options

        );

}
