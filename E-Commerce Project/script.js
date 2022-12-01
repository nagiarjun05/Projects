const cart_items=document.querySelector('#cart .cart-items');

const parent_element=document.querySelector('body');

parent_element.addEventListener('click',(e)=>{
    if(e.target.className==='card-btn'){
        const id=e.target.parentNode.parentNode.id;
        const name=document.querySelector(`#${id} h3`).innerText;
        const img_src=document.querySelector(`#${id} img`).src;
        const price=e.target.parentNode.children[0].children[0].innerText;
        let total_price=document.querySelector('#total-value').innerText;
        if(document.querySelector(`#in-cart-${id}`)){
            alert('You have already selected this item!!!')
            return
        };
        document.querySelector('.cart-qnty').innerText=parseInt(document.querySelector('.cart-qnty').innerText)+1;
        const cart_item=document.createElement('div')
        cart_item.classList.add('cart-row');
        cart_item.id=`in-cart-${id}`;
        total_cart_price=parseFloat(total_price)+parseFloat(price);
        total_cart_price=total_cart_price.toFixed(2);
        document.querySelector('#total-value').innerText=`${total_cart_price}`
        cart_item.innerHTML=`
        <span class='cart-item cart-column'>
        <img class=cart-img src='${img_src}'  alt='' >
        <span>${name}</span></span>
        <span class='cart-price cart-column'>
        <span>${price}</span></span>
        <span class='cart-quantity cart-column'>
        <input type='text' value='1'>
        <button class='remove' >REMOVE</button>
        </span>
        `
        cart_items.appendChild(cart_item);
        const notify=document.getElementById('notify');
        const notification=document.createElement('div');
        notification.classList.add('notification');
        notification.innerHTML=`<h4>Your Product : <span>${name}<span> is added to the cart</h4>`;
        notify.appendChild(notification);
        setTimeout(()=>{
            notification.remove()
        },2500);
    }
    if(e.target.className==='cart-btn'||e.target.className==='cart-btn-bottom'||e.target.className==='cart-bottom'){
        document.querySelector('#cart').style="display:block;"
    }
    if(e.target.className==='cancel'){
        document.querySelector('#cart').style="display:none;"
    }
    if(e.target.className==='remove'){
        let total_cart_price=document.querySelector('#total-value').innerText;
        total_cart_price=parseFloat(total_cart_price).toFixed(2)-parseFloat(document.querySelector(`#${e.target.parentNode.parentNode.id} .cart-price`).innerText).toFixed(2);
        document.querySelector('.cart-qnty').innerText=parseInt(document.querySelector('.cart-qnty').innerText)-1
        document.querySelector('#total-value').innerText=`${total_cart_price.toFixed(2)}`
        e.target.parentNode.parentNode.remove()
    }
    if (e.target.className=='purchase-btn'){
        if (parseInt(document.querySelector('.cart-qnty').innerText) === 0){
            alert('You have Nothing in Cart , Add some products to purchase !');
            return
        }
        alert('Thanks for the purchase')
        cart_items.innerHTML = ""
        document.querySelector('.cart-qnty').innerText = 0
        document.querySelector('#total-value').innerText = `0`;
    }
})

window.addEventListener("DOMContentLoaded",()=>{
    axios.get('http://localhost:3000/products')
    .then((data)=>{

        data.data.products.forEach(element => {
            // console.log(element.id)
            // console.log(element.title)
            // console.log(element.price)
            // console.log(element.imageUrl)
            const mainContainer=document.querySelector('#music');
            // console.log(mainContainer)
            const content=document.createElement('div')
            content.classList.add('content');
            content.id=`content${element.id}`;
            content.innerHTML=`
            <h3>${element.title}</h3>
            <div class="prod-img">
                <img class="prod-images" src="${element.imageUrl}" alt="">
            </div>
            <div class="detail">
                <span>$<span>${element.price}</span></span>
                <button class="card-btn" type='button'>ADD TO CART</button>
            </div>`
            mainContainer.appendChild(content);
            console.log(content);
        });
        

    })
    .catch(err=>console.log(err))
})




// <div id="merch-content">
//             <div id="t-shirt">
//                 <h3>T-Shirt</h3>
//                 <div class="prod-img">
//                     <img class="prod-images" src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80" alt="">
//                 </div>
//                 <div class="detail">
//                     <span>$<span>19.99</span></span>
//                     <button class="card-btn" type='button'>ADD TO CART</button>
//                 </div>
//             </div>