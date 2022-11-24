// // function simple(){
// //     console.log(this.table);
// // }
// // simple();

// // const simple2={
// //     table:"Table",
// //     method(){
// //         console.log(this);
// //     },
// //     arrfunc:()=>{
// //         console.log(this)
// //     }
// // };
// // simple2.method()
// // simple2.arrfunc();

// // const meth=simple.bind(simple2);
// // // meth();


// // class reg{
// //     constructor(n){
// //         this.n=n;
// //     }
// //     text(){
// //         console.log(this.n)
// //     }
// // }

// // const re={
// //     n:"simran"
// // }

// // const reg1=new reg("Arjun")

// // console.log(typeof(reg1.text.bind(re)));

// // const res=reg1.text.bind(re);
// // res();

// function first(){
//     console.log("First");
// }

// function second(){
//     setTimeout(()=>{
//         console.log("second");
//     },2000)
// }

// function third(){
//     Promise.resolve().then(res=>{
//         setTimeout(()=>{console.log("Third")},2  000)
//     })
// }

// function fourth(){
//     console.log("Fourth");
// }

// first();
// second();
// third();
// fourth();

// async function add(){
//     const first=new Promise((res,rej)=>{
//         setTimeout(() => {
//             res("1")
//         });
//     })
//     const second=new Promise((_,rej)=>{
//         setTimeout(()=>{
//             rej("2")
//         });
//     });

//     const result=[await first,await second];
// };
// add().catch(()=>{});

function resolveAfter2Sec(){
    console.log("Starting slow promise")
    return new Promise((res)=>{
            setTimeout(()=>{
            res("slow")
            console.log(`slow promise is done`)
        },2000);
    });
};

function resolveAfter1sec(){
    console.log("Starting fast promise")
    return new Promise((res)=>{
        setTimeout(()=>{
            res("fast")
            console.log("fast promise is done")
        },3000);
    });
};

//CONCURRENT START WITH Promise.all
async function conCurrent(){
    return Promise.all([resolveAfter2Sec(),resolveAfter1sec()]).then((message)=>{
        console.log(message[0]);
        console.log(message[1]);
    })
}

conCurrent();






//CONCURRENT START
// async function conStart(){
//     const slow=resolveAfter2Sec();
//     const fast=resolveAfter1sec();

//     await slow;
//     await fast;
// }

// conStart();

// function sample(){
//     resolveAfter2Sec();
//     console.log("1");
//     resolveAfter1sec();
//     console.log("2");
// }

// sample();

//SEQUENTIAL START
// async function seqStart(){
//     const slow=await resolveAfter2Sec();
//     console.log("slow");
//     const fast=await resolveAfter1sec();
//     console.log("fast")
// }

// seqStart();
