import { openedNavbar , closedNavbar} from "./navbar.js";
openedNavbar()
closedNavbar()
/*                                             start section countdown                                                */
let countDown =new Date("jan,1 2024 24:00:00").getTime();
let count=setInterval(() => {
    let now=new Date().getTime();
    let differenceDate=countDown-now;
    let days=Math.floor(differenceDate/(24*60*60*1000));
    let hours=Math.floor(differenceDate % (24*60*60*1000) / (60*60*1000));
    let minutes=Math.floor(differenceDate % (60*60*1000) / (60*1000));
    let seconds=Math.floor(differenceDate % (60*1000) / (1000));
    document.getElementById("counter-days").innerHTML=days;
    document.getElementById("counter-hours").innerHTML=hours;
    document.getElementById("counter-minutes").innerHTML=minutes;
    document.getElementById("counter-seconds").innerHTML=seconds;
    
if(differenceDate < 0){
    clearInterval(count);
}
}, 1000);
/*                                             end section countdown                                                */
