var userEmail=document.getElementById('form1');
var userName=document.getElementById('form2');
var phoneNumber=document.getElementById('form3');
var userList=document.getElementById('users');
var submit=document.getElementById('sb');
var show=document.getElementById('shw');

show.addEventListener('click', showDetails);
submit.addEventListener('click', onClick);
userList.addEventListener('click', deleteUser);
userList.addEventListener('click', editDetails);

function onClick(e){
    if (userEmail.value!=''||userName.value!=''||phoneNumber.value!=''){
        e.preventDefault();
        var li = document.createElement('li')
        li.className='user'
        li.innerHTML=`${userName.value} - ${userEmail.value} - ${phoneNumber.value} `
        
        var deleteButton=document.createElement('button');
        deleteButton.className='dltbtn';
        deleteButton.style.border='solid 3px red';
        deleteButton.appendChild(document.createTextNode('Delete'));
        li.appendChild(deleteButton);

        var editButton=document.createElement('button');
        editButton.className='editbtn';
        editButton.style.border='solid 3px green';
        editButton.appendChild(document.createTextNode('Edit'));
        li.appendChild(editButton);

        localStorage.setItem(userEmail.value,`${userName.value} - ${userEmail.value} - ${phoneNumber.value}`)
        userList.appendChild(li);
    }
}

function editDetails(e){
    e.preventDefault();
    if (e.target.classList.contains('editbtn')){
        userEmail.value=e.target.parentElement.innerHTML.split(' ')[0];
        userName.value=e.target.parentElement.innerHTML.split(' ')[2];
        phoneNumber.value=e.target.parentElement.innerHTML.split(' ')[4];
        userList.removeChild(e.target.parentElement)
        localStorage.removeItem(e.target.parentElement.innerHTML.split(' ')[2]);
    }
}


function deleteUser(e){
    e.preventDefault();
    if(e.target.classList.contains('dltbtn')){
        userList.removeChild(e.target.parentElement);
        localStorage.removeItem(e.target.parentElement.innerHTML.split(' ')[2]);
    }
}



function showDetails(e){
    e.preventDefault();
    Object.values(localStorage).forEach((value) => {
        console.log(value)
        let li=document.createElement('li');
        li.className='user';
        li.innerHTML=`${value} `;
        
        
        var deleteButton=document.createElement('button');
        deleteButton.className='dltbtn';
        deleteButton.style.border='solid 3px red';
        deleteButton.appendChild(document.createTextNode('Delete'));
        li.appendChild(deleteButton);
         
        var editButton=document.createElement('button');
        editButton.className='editbtn';
        editButton.style.border='solid 3px green';
        editButton.appendChild(document.createTextNode('Edit'));
        li.appendChild(editButton);

        userList.appendChild(li);
    }
    )
}