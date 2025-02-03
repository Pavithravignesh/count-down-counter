(function () {
    // gets the elements
    let hours = document.querySelector(".hours");
    let minutes = document.querySelector(".minutes");
    let seconds = document.querySelector(".seconds");
    let start = document.querySelector(".start");
    let stop = document.querySelector(".stop");
    let reset = document.querySelector(".reset");
    let stopWatch = document.querySelector(".stop-watch");

    let countDownCounter = null;

    // what if btn got clicked?
    // start
    start.addEventListener("click", function () {
        // change the btn start to pause
        start.style.display = "none";
        stop.style.display = "initial";
        stopWatch.style.display = "none";
        
        countDownCounter = setInterval(() => {
            timerStart();
        }, 1000);
    });

    function timerStart() {

        // over loaded values
        if (seconds.value > 60) {
            minutes.value++;
            seconds.value = parseInt(seconds.value) - 59;
        }

        if (minutes.value > 60) {
            hours.value++;
            minutes.value = parseInt(minutes.value) - 60;
        }

        // check if any of the field's got value's
        if (hours.value == 0 && minutes.value == 0 && seconds.value == 0) {
            // gets back to initial state
            hours.value = "";
            minutes.value = "";
            seconds.value = "";
            // switch the btn pause to start as it was in the initial
            stopSetInterval();
        } else if (seconds.value != 0) {
            seconds.value = `${seconds.value < 10 ? "0" : ""}${seconds.value - 1}`; // for each time execution of seconds.value--
        } else if (minutes.value != 0 && seconds.value == 0) {
            seconds.value = 59; // because 1 minutes = 60 seconds
            minutes.value = `${minutes.value < 10 ? "0" : ""}${minutes.value - 1}`; // for each time execution of minutes.value--
        } else if (hours.value != 0 && seconds.value == 0) {
            minutes.value = 60; // because 1 hour = 60 minutes
            hours.value = `${hours.value < 10 ? "0" : ""}${hours.value - 1}`; // for each time execution of hours.value--
        }

        return { hours: hours.value, minutes: minutes.value, seconds: seconds.value, };
    }

    // pause || starts again as in the initial
    function stopSetInterval(state) {
        // 1. for true of 1st condition, to change the start btn from pause to start
        // 2. for click of stop btn to pause the counter fn 
        start.innerHTML = state === "pause" ? "Continue" : "Start";

        start.style.display = "initial";
        stop.style.display = "none";

        // display of data's will be paused as setInterval is now remove or now yet to involve!
        clearInterval(countDownCounter);
    }

    // stop
    stop.addEventListener("click", function () {
        stopSetInterval("pause");
    });

    // reset
    reset.addEventListener("click", function () {
        // initial state
        hours.value = "";
        minutes.value = "";
        seconds.value = "";
        stopSetInterval();
    });

    // stop-watch
    stopWatch.addEventListener("click", function () {
        const output = timerStart();
        console.log(output);
    });

})();