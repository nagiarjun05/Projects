window.addEventListener("DOMContentLoaded",()=>{
    showData()
});

function showData(){
    axios.get(`http://localhost:3000/orders`)
    .then((data)=>{
        const mainContainer=document.querySelector('#orders-content');
        mainContainer.innerHTML='';
        data.data.products.forEach(element => {
            const content=document.createElement('div')
            content.innerHTML=`<h2>Order ID is ${element.id}</h2>`
            content.classList.add('content');
            let total_amount_order=0;
            element.products.forEach(prod=>{
                console.log(prod.orderItem.quantity)
                const total_amount=(parseFloat(prod.orderItem.quantity)*parseFloat(prod.price).toFixed(2))
                const innerContent=document.createElement('div')
                innerContent.classList.add('inner-content');
                total_amount_order=total_amount_order+total_amount;
                innerContent.innerHTML=`
                <h3>${prod.title}</h3>
                <div class="prod-img">
                    <img class="prod-images" src="${prod.imageUrl}" alt="">
                </div>
                <div class="detail">
                    <span>$<span>${prod.price}</span></span>
                    <span> X ${prod.orderItem.quantity} = $<span> ${total_amount}</span></span>
                </div>`
                content.appendChild(innerContent);
            })
            const total=document.createElement('div');
            total.classList.add('total-order-amount');
            total.innerHTML=`<h2>Total Aount Due is ${total_amount_order}</h2>`
            content.appendChild(total);
            mainContainer.appendChild(content);
        });            
        })
        // pagination(data.data.currentPage,data.data.hasNextPage,data.data.nextPage,data.data.hasPreviousPage,data.data.previousPage)
    // })
    .catch(err=>console.log(err))
}