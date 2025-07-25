let API_KEY = "d9e5164ba4e64928b9524d4689bb5d85";
let url = "https://newsapi.org/v2/everything";
let searchInput = document.getElementById("searchInput");
let newsContainer=document.getElementById("news-container");
let loading=document.getElementById("loading")
let nodata=document.getElementById("nodata")

let DisplayNewsData = (data) => {
    let div=document.createElement("div")
    div.classList.add("cart")


let image=document.createElement("img");
    image.src=data.urlToimage
    image.style.width="100px"
    image.style.height="50px"
     div.appendChild(image)

let h3=document.createElement("h3")
    h3.innerHTML=data.author;
    h3.classList.add("author");
    div.appendChild(h3)

let p=document.createElement("p")
    p.innerHTML=data.content
    p.classList.add("content")
    div.appendChild(p)

 let a=document.createElement("a")
     a.innerHTML="view more";
     a.href=data.url;
     a.target="_blank";
     div.appendChild(a);
     
     
    newsContainer.appendChild(div)
}

let allNewsData = (data) => {
    
    if(data.length==0){
        nodata.style.display="block"
        
    }
    else{
    for (let item of data) {
        DisplayNewsData(item);
    }
}
};

let fetchData = async (search) => {
    try {
        loading.style.display="block"
        let data = await fetch(`${url}?q=${search}&apiKey=${API_KEY}`);
        let jsonData = await data.json();

        console.log(jsonData);
        
        allNewsData(jsonData.articles);
    } catch (error) {
        console.log("Error fetching news:", error);
    }
};


window.onload=()=>{
    fetchData("cinema");
}

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        newsContainer.innerHTML="";
        fetchData(searchInput.value);
        searchInput.value=""
    }
});
