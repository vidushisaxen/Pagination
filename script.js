const paginationItems = document.getElementById("pagination-items");
const paginationList = document.getElementById("pagination-list");
const items = paginationList.querySelectorAll("li");
const prevButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");

const paginationLimit = 10;

const pageCount = Math.ceil(items.length/paginationLimit);
let currentPage=1;

const addPageNumber= (index)=>{
    const pageNumber = document.createElement("button");
    pageNumber.className="pagination-number";
    pageNumber.innerHTML=index;
    pageNumber.setAttribute("page-index",index);
 
    paginationItems.appendChild(pageNumber);
};

const getPaginationNumbers=()=>{
    for(let i=1;i<=pageCount;i++){
        addPageNumber(i);
    }
};


const setCurrentPage=(pageNum)=>{
    currentPage=pageNum;

    handleactivePageNumber();
    handlePageButtonsStatus();

    const prevRange = (pageNum-1)*paginationLimit;
    const currRange = pageNum *paginationLimit;

    items.forEach((item,index)=>{
        item.classList.add("hidden");
        if(index>=prevRange && index<currRange){
            item.classList.remove("hidden");
        }
    });
};

const handleactivePageNumber=()=>{
    document.querySelectorAll(".pagination-number").forEach((button)=>{
        button.classList.remove("active");

        const pageIndex = Number(button.getAttribute("page-index"));
        if(pageIndex == currentPage){
            button.classList.add("active");
        }
    });
};


const disableButton=(button)=>{
    button.classList.add("disabled");
    button.setAttribute("disabled",true);
};

const enableButton=(button)=>{
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
};

const handlePageButtonsStatus=()=>{
    if(currentPage === 1){
        disableButton(prevButton);
    } else{
        enableButton(prevButton);
    }

    if(pageCount === currentPage){
        disableButton(nextButton);
    }else{
        enableButton(nextButton);
    }

}

window.addEventListener("load",()=>{
    getPaginationNumbers();
    setCurrentPage(1);

    prevButton.addEventListener("click",()=>{
        setCurrentPage(currentPage-1);
    })

    nextButton.addEventListener("click",()=>{
        setCurrentPage(currentPage+1);
    })

    document.querySelectorAll(".pagination-number").forEach((button)=>{
        const pageIndex = Number(button.getAttribute("page-index"));

        if(pageIndex){
            button.addEventListener("click",()=>{
                setCurrentPage(pageIndex);
            });
        }
    });
});




