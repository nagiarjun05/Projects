var userEmail=document.getElementById('form2');
var userName=document.getElementById('form1');
var phoneNumber=document.getElementById('form3');
var userList=document.getElementById('users');
var submit=document.getElementById('sb');
var show=document.getElementById('shw');

show.addEventListener('click', showDetails);
submit.addEventListener('click', onClick);
userList.addEventListener('click', deleteUser);
// userList.addEventListener('click', editDetails);

function onClick(e){
    if (userEmail.value!=''||userName.value!=''||phoneNumber.value!=''){
        e.preventDefault();
        const  name=userName.value;
        const  email=userEmail.value;
        const  phone=phoneNumber.value;

        axios({
            method:'post',
            url:`http://localhost:3000/users/add-user`,
            data:{
                name: name,
                email: email,
                phonenumber: phone
                }
            }
        )
        .then(res=>{
            console.log(res);
        })
        .catch(err=>console.log(err));       
    }
};

// function editDetails(e){
//     e.preventDefault();
//     if (e.target.classList.contains('editbtn')){
//         userEmail.value=e.target.parentElement.innerHTML.split(' ')[0];
//         userName.value=e.target.parentElement.innerHTML.split(' ')[2];
//         phoneNumber.value=e.target.parentElement.innerHTML.split(' ')[4];
//         userList.removeChild(e.target.parentElement)
//         localStorage.removeItem(e.target.parentElement.innerHTML.split(' ')[2]);
//     }
// }


function deleteUser(e){
    e.preventDefault();
    if(e.target.classList.contains('dltbtn')){
        console.log(e.target.parentElement.value);
        axios({
            method:'delete',
            url:`http://localhost:3000/users/delete-user/${e.target.parentElement.value}`,  
        })
        .then((res)=>{
            userList.removeChild(e.target.parentElement)
        })
        .catch(err=console.log(err)) 
    }
}

function showDetails(e){
    e.preventDefault();
    axios({
        method:'get',
        url:"http://localhost:3000/users/get-users",
    })
    .then(res=>{
        console.log(res.data.allUsers)
        res.data.allUsers.forEach(element => {
            var li = document.createElement('li')
            li.className='user'
            li.value=element.id;
            li.innerHTML=`${element.name} - ${element.email} - ${element.phonenumber} `
            
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
        })
    })
    .catch(err=console.log(err));
};
