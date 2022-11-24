var filled=document.getElementById("submit");
var eAmount=document.getElementById("amount");
var eDesc=document.getElementById("expense-type");
var eCat=document.getElementById("expense-category");
var expList=document.getElementById("exp-list");

filled.addEventListener('click',onAdd);

expList.addEventListener('click', removeExpense);
expList.addEventListener('click', editExpDetails);


var getMethod=function(){
    axios({
        method:'get',
        url:"http://localhost:3000/expenses/get-expenses",
    }).then(res=>{
        res.data.allExpenses.forEach(element => {
            var li = document.createElement('li');
            li.className='expenseDet';
            li.innerHTML=`${element.amount}-${element.description}-${element.category}-`;
            
            li.value=`${element.id}`;
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
            eDesc.value="";
            eAmount.value="";
            eCat.value="";
        });
    }).catch(err=>console.log(err));
}   

getMethod();

function onAdd(e){
    e.preventDefault();
    // axios({
    //     method:'post',
    //     url:`http://localhost:3000/expenses/add-expense`,
    //     data:{
    //         amount:`${eAmount.value} `,
    //         description:`${eDesc.value} `,
    //         category:`${eCat.value} `
    //     }
    // }).then(res=>{
    //     while(expList.hasChildNodes()){
    //         expList.removeChild(expList .lastChild);
    //     }
    //     getMethod();
    // }).catch(err=>console.log(err));
    if (filled.name){

        console.log(filled.name);
        axios({
            method:'put',
            url:`http://localhost:3000/expenses/update-expense/${e.target.parentElement.value}`,
            data:{
                id:`${filled.name}`,
                amount:`${eAmount.value} `,
                description:`${eDesc.value} `,
                category:`${eCat.value} `
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
            url:`http://localhost:3000/expenses/add-expense`,
            data:{
                amount:`${eAmount.value} `,
                description:`${eDesc.value} `,
                category:`${eCat.value} `
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
            url:`http://localhost:3000/expenses/delete-expense/${e.target.parentElement.value}`,  
        }).then(res=>console.log(res)).catch(err=>console.log(err))
        expList.removeChild(e.target.parentElement)
    }
}


function editExpDetails(e){
    e.preventDefault();
    if(e.target.classList.contains('edt')){
        var li = e.target.parentElement
        eAmount.value=parseInt(li.innerHTML.split('-')[0])
        eDesc.value=li.innerHTML.split('-')[1]
        eCat.value=li.innerHTML.split('-')[2]
        filled.name=li.value;
        expList.removeChild(li);

    }
}