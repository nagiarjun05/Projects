var filled=document.getElementById("submit");
var eAmount=document.getElementById("amount");
var eDisc=document.getElementById("expense-type");
var eCat=document.getElementById("expense-catogary");
var expList=document.getElementById("exp-list");

filled.addEventListener('click',onAdd);

expList.addEventListener('click', removeExpense);
expList.addEventListener('click', editExpDetails);


var getMethode=function(){
    axios({
        method:'get',
        url:"https://crudcrud.com/api/ea7bfcc5f3684fb6adb84ad3fe4c6f9f/expensesData",
    }).then(res=>{
        res.data.forEach(element => {
            var li = document.createElement('li');
            li.className='expenseDet';
            li.innerHTML=`${element.amount}-${element.discr}-${element.catg}-`;
            
            li.id=`${element._id}`;

            var deleteExpense=document.createElement('button');
            deleteExpense.className='dlt';
            deleteExpense.textContent='Delete Expense';
            deleteExpense.style.border='solid 2px red';
    
    
            var editExpense=document.createElement('button');
            editExpense.className='edt';
            editExpense.textContent='Edit Expense';
            editExpense.style.border='solid 2px green';
            li.appendChild(deleteExpense);
            li.appendChild(editExpense);
            
            expList.appendChild(li);
        });
    }).catch(err=>console.log(err));
}   

getMethode();

function onAdd(e){
    e.preventDefault();
    if (filled.name){
        console.log("if")
        axios({
            method:'put',
            url:`https://crudcrud.com/api/ea7bfcc5f3684fb6adb84ad3fe4c6f9f/expensesData/${filled.name}`,
            data:{
                "amount":`${eAmount.value} `,
                "discr":`${eDisc.value} `,
                "catg":`${eCat.value} `
            }
        }).then(res=>{console.log(res)}).catch(err=>console.log(err));
        while(expList.hasChildNodes()){
            expList.removeChild(expList.lastChild);
        }
        getMethode();
    }else{
        console.log("else")
        axios({
            method:'post',
            url:`https://crudcrud.com/api/ea7bfcc5f3684fb6adb84ad3fe4c6f9f/expensesData`,
            data:{
                "amount":`${eAmount.value} `,
                "discr":`${eDisc.value} `,
                "catg":`${eCat.value} `
            }
        }).then(res=>{console.log(res)}).catch(err=>console.log(err));
        while(expList.hasChildNodes()){
            expList.removeChild(expList.lastChild);
        }
        getMethode();
    }
    
}
    

function removeExpense(e){
    e.preventDefault();
    if(e.target.classList.contains('dlt')){
        axios({
            method:'delete',
            url:`https://crudcrud.com/api/ea7bfcc5f3684fb6adb84ad3fe4c6f9f/expensesData/${e.target.parentElement.id}`,  
        }).then(res=>console.log(res)).catch(err=>console.log(err))
        expList.removeChild(e.target.parentElement)
    }
}


function editExpDetails(e){
    e.preventDefault();
    if(e.target.classList.contains('edt')){
        var li = e.target.parentElement
        eAmount.value=parseInt(li.innerHTML.split('-')[0])
        eDisc.value=li.innerHTML.split('-')[1]
        eCat.value=li.innerHTML.split('-')[2]
        filled.name=li.id;
        expList.removeChild(li);

    }
}
