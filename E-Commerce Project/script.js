const cart_items=document.querySelector('#cart .cart-items');

const parent_element=document.querySelector('body');

parent_element.addEventListener('click',(e)=>{
    if(e.target.className==='card-btn'){
        const id=e.target.parentNode.parentNode.className;
        const name=document.querySelector(`.${id} h3`).innerText;
        const img_src=document.querySelector(`.${id} img`).src;
        const price=e.target.parentNode.children[1].innerText;
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
        <button>REMOVE</button>
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
    if(e.target.innerText='REMOVE'){
        let total_cart_price=document.querySelector('#total-value').innerText;
        total_cart_price=parseFloat(total_cart_price).toFixed(2)-parseFloat(document.querySelector(`#${e.target.parentNode.parentNode.id} .cart-price`).innerText).toFixed(2);
        document.querySelector('.cart-number').innerText=parseInt(document.querySelector('.cart-number').innerText)-1
        document.querySelector('#total-value').innerText=`${total_cart_price.toFixed(2)}`
        e.target.parentNode.parentNode.remove()
    }
})