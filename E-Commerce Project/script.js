const cart_items=document.querySelector('#cart .cart-items');

const parent_element=document.querySelector('body');

const pages=document.querySelector('.pagination');
console.log(pages)
parent_element.addEventListener('click',(e)=>{
    if(e.target.className==='card-btn'){
        const id=e.target.parentNode.parentNode.id;
        // console.log(e.target.parentNode.parentNode.children[2].children[0].children[0].innerText);
        const name=e.target.parentNode.parentNode.children[0].innerText;
        const img_src=e.target.parentNode.parentNode.children[1].children[0].src;
        const price=e.target.parentNode.parentNode.children[2].children[0].children[0].innerText;
        if(document.querySelector(`#in-cart-${id}`)){
            alert('You have already selected this item!!!')
            return
        };
        axios({
            method:'post',
            url:`http://localhost:3000/cart`,
            data:{
                "id":`${id}`,
                "title":`${name} `,
                "img_src":`${img_src}`,
                "price":`${price} `
            }
        }).then(res=>console.log(res)).catch(err=>console.log(err));
        
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
        while(cart_items.firstChild){
            cart_items.removeChild(cart_items.lastChild)
        }
        document.querySelector('#total-value').innerText='0';
        
        axios.get('http://localhost:3000/cart')
        .then((data)=>{            
            data.data.products.forEach((element)=>{
            const id=element.id;
            const name=element.title;
            const img_src=element.imageUrl;
            const price=element.price;
            const qt=element.cartItem.quantity
            let total_price=document.querySelector('#total-value').innerText;
            // total_price='0';
            // document.querySelector('.cart-qnty').innerText=parseInt(document.querySelector('.cart-qnty').innerText)+1;
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
            <input type='text' value='${qt}'>
            <button class='remove' >REMOVE</button>
            </span>
            `
            cart_items.appendChild(cart_item);
            })
        })
        .catch(err=>console.log(err)) 
        document.querySelector('#cart').style="display:block;"
    }
    if(e.target.className==='cancel'){
        document.querySelector('#cart').style="display:none;"
    }
    if(e.target.className==='remove'){
        console.log(cart_items)
        // axios({
        //     method:'post',
        //     url:`http:/localhost:3000/cart-delete-item/${e.target.parentNode.parentNode.id}`  
        // }).then(res=>console.log(res)).catch(err=>console.log(err))
        // // let total_cart_price=document.querySelector('#total-value').innerText;
        // total_cart_price=parseFloat(total_cart_price).toFixed(2)-parseFloat(document.querySelector(`#${e.target.parentNode.parentNode.id} .cart-price`).innerText).toFixed(2);
        // document.querySelector('.cart-qnty').innerText=parseInt(document.querySelector('.cart-qnty').innerText)-1
        // document.querySelector('#total-value').innerText=`${total_cart_price.toFixed(2)}`
        // e.target.parentNode.parentNode.remove()
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


function showData(page){
    axios.get(`http://localhost:3000/products/?page=${page}`)
    .then((data)=>{
        // console.log(document.querySelector('#music-content').remove());
        data.data.products.forEach(element => {
            const mainContainer=document.querySelector('#music-content');
            const content=document.createElement('div')
            content.classList.add('content');
            content.id=element.id;
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
        });
        pagination(data.data.currentPage,data.data.hasNextPage,data.data.nextPage,data.data.hasPreviousPage,data.data.previousPage)
    })
    .catch(err=>console.log(err))
}

function pagination(currentPage,hasNextPage,nextPage,hasPreviousPage,previousPage){
    pages.innerHTML='';
    if (hasPreviousPage){
        const prevBtn=document.createElement('button')
        prevBtn.innerHTML=previousPage;
        pages.appendChild(prevBtn);
        prevBtn.addEventListener('click',()=>{
            showData(previousPage)
            });
    }

    const curBtn=document.createElement('button')
    curBtn.innerHTML=currentPage;
    pages.appendChild(curBtn);
    curBtn.addEventListener('click',()=>{
        showData(currentPage)
        });
    

    if (hasNextPage){
        const nexBtn=document.createElement('button')
        nexBtn.innerHTML=nextPage;
        pages.appendChild(nexBtn);
        nexBtn.addEventListener('click',()=>{
            showData(nextPage)
            });
    }
}

window.addEventListener("DOMContentLoaded",()=>{
    const page=1;
    showData(page)
});