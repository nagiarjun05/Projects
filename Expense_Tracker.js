var filled=document.getElementById("submit");
var eAmount=document.getElementById("amount");
var eDisc=document.getElementById("expense-type");
var eCat=document.getElementById("expense-catogary");
var expList=document.getElementById("exp-list");

filled.addEventListener('click',onAdd);

expList.addEventListener('click', removeExpense);
expList.addEventListener('click', editExpDetails);


var getMethod=function(){
    axios({
        method:'get',
        url:"https://crudcrud.com/api/26b00d7828d74d2da5efc8c2402a09fc/expensesData",
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
            eDisc.value="";
            eAmount.value="";
            eCat.value="";
        });
    }).catch(err=>console.log(err));
}   

getMethod();
function onAdd(e){
    e.preventDefault();
    if (filled.name){
        axios({
            method:'put',
            url:`https://crudcrud.com/api/26b00d7828d74d2da5efc8c2402a09fc/expensesData/${filled.name}`,
            data:{
                "amount":`${eAmount.value} `,
                "discr":`${eDisc.value} `,
                "catg":`${eCat.value} `
            }}).then(()=>{
                while(expList.hasChildNodes()){
                    expList.removeChild(expList.lastChild);    
                }

                filled.removeAttribute("name");
                getMethod();
            }).catch(err=>console.log(err))
    }else{ 
        axios({
            method:'post',
            url:`https://crudcrud.com/api/26b00d7828d74d2da5efc8c2402a09fc/expensesData`,
            data:{
                "amount":`${eAmount.value} `,
                "discr":`${eDisc.value} `,
                "catg":`${eCat.value} `
            }
        }).then(res=>{
            while(expList.hasChildNodes()){
                expList.removeChild(expList .lastChild);
            }
            getMethod();
        }).catch(err=>console.log(err));
    }
};
    

function removeExpense(e){
    e.preventDefault();
    if(e.target.classList.contains('dlt')){
        axios({
            method:'delete',
            url:`https://crudcrud.com/api/26b00d7828d74d2da5efc8c2402a09fc/expensesData/${e.target.parentElement.id}`,  
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