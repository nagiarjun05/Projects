const btn=document.getElementById("btn");
const containe=document.getElementById("container");


btn.addEventListener('click',()=>{
    createNotification();
});

function createNotification(){
    const notif=document.createElement('div');
    notif.classList.add('toast');

    notif.innerText='Hello There!!';
    container.appendChild(notif);
    setTimeout(()=>{
        notif.remove();
    },3000)
};