const btn=document.getElementById('btn');
const container=documetn.getElementById('container');


btn.addEventListener('click',()=>{
    createNotification();
});

function createNotification(){
    const notif=document.createElement('div');
    notif.classList.add('toast');

    notif.innerText='Hello There!!';
    container.appendchild(notif);
    setTimeout(()=>{
        notif.remove();
    },3000)
};