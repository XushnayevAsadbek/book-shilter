
function debounce(func, wait){

    let timeout



    return function(){
        
        let context = this;
        let args = arguments;
        
        clearTimeout(timeout);
        
        timeout = setTimeout(()=>{

            func.apply(context ,args)
        },wait)
    };
}




function searchElements(searchValue){
    

    // console.log(e.target.value); 

    let url = new URL(window.location.href)

    let query = new URLSearchParams();
    query.append("search" , searchValue);

    const URLSearchQuery = query.toString();

    url.search = URLSearchQuery;

    // window.location.replace(url);

    window.history.pushState({}, "", url.toString());

}



const debounceCHild = debounce(searchElements, 1000);

document.querySelector("input").addEventListener("input",(e) =>{

    debounceCHild(e.target.value)
});