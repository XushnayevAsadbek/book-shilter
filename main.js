let books = [];


function getAllBooks(){

    // loaderforBooks(true);
    fetch('https://book-shelter-d1515-default-rtdb.firebaseio.com/books.json')
    .then(res =>{
        if(!res.ok) throw new Error("Something wrong ");
        return res.json();

     })
     .then((res) =>{

       books = Object.keys(res || {}).map((item)=>{
        return{
            ...res[item],
            id:item,
            ok: +Math.random().toFixed(8)
        };
       });

       console.log(books);
       renderHtmlElements(books);
     })
     .catch((err)=>{
        console.log(err);
     })
      .finally(()=>{
        // loaderforBooks(false)
      })
}
getAllBooks()

const elements = document.getElementById("elements");
const cards =document.querySelector(".saqlangan_books");

let step = 3;
let page = 1;


function choppedBookItems(books){
    let star = page*step-step;
    let end = star+step ;
    return books.slice(star, end);
}

renderHtmlElements(choppedBookItems(books));
function renderHtmlElements(allBook) {
    let result = allBook.map((item, index) => {
        let element = `
     
        <div class="right-box_movies--card" id="elements">
                     
        <img src="${item.img_url}" width="201.4" height="202.8" alt=""> 
          <div class="card">
    <h2 class="right-box_movies--card-heading2">${item.title_book}</h2>
    <p class="right-box_movies--card-author">${item.author}</p>
    <p class="right-box_movies--card-year">${item.data_publish}</p>
 
    

    <div>
        <button onclick="bookmarkFunc(${item.ok})" id="add-btn" > Bookmark</button>
        <button class="more-btn" >More Info </button>
    </div>
    <div>
        <button class="read-btn">Read</button>
    </div>
    </div>
</div>
        `
        return element;
    }).join(" ");

    elements.innerHTML = result;
}

let bookmarArray = [];
function bookmarkFunc(imdbId) {
    let findedElement = books.find((item,index) => {
        console.log(item.ok, imdbId);
        return  item.ok == imdbId;
    })
    if (!bookmarArray.includes(findedElement)) {
        bookmarArray.push(findedElement);
    }
   
console.log(bookmarArray);
renderRemove();
renderPageinationNumbers(bookmarArray.length);
}

function renderRemove(){
    let result = bookmarArray.map((item, index) => {
        
        let element = `
        
        <div class="saqlangan_books">
        <h3 class="right-box_movies--card-heading2">${item.title_book}</h3>
    <p class="right-box_movies--card-author">${item.author}</p>
        <button type='button' onclick='deleteTitle(${index})' id="edit-btn">Remove </button>
     </div>
        `
        return element;
    }).join(" ");
    cards.innerHTML = result;



    
}
function deleteTitle(id){
    bookmarArray = bookmarArray.filter((item, index) =>{
        return index !== id;
    })
    renderRemove();
}



const loginBtn = document.querySelector(".header-login_btn");

loginBtn.addEventListener("click",()=>{
    window.location.replace("./HTML/login.html");
});


function renderPageinationNumbers(lenght){
    let  pageNumber = Math.ceil(lenght / step);
    let result = ""
    for (let i=0; i< pageNumber; i++){
        result+= `
        <li>
                    <button class="page-btn ${page == i +1 ? "active" : ""}">${i+1}</button>
                </li>
        `
    }

    for(let i = 0; i < Array.from(document.querySelectorAll('.pagination span')).length; i++){
        document.querySelectorAll('.pagination span').forEach(item => {
          item.classList.remove('page-active');
        })
        Array.from(document.querySelectorAll('.pagination span'))[page - 1].classList.add('page-active');
      }
    document.querySelector("#page-list").innerHTML = result;
    console.log(document.querySelector(".page-btn"));

    document.querySelectorAll(".page-btn").forEach((item) => {
        item.addEventListener("click", (e) => {

            page = e.target.innerHTML;
            renderHtmlElements(choppedBookItems(books));
            renderPageinationNumbers(books.length)
        })
        console.log("click");
        
    });
}
console.log(books.length);
renderPageinationNumbers(books.length);

