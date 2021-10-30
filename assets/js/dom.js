const UNCOMPLETED_READ = "uncomplated"; //belum selesai di baca
const COMPLETED_READ = "complated"; // selesai dibaca
const BOOK_ITEMID = "itemId";

function makeBookshelf(titleBookshelf,authorBookshelf,yearBookshelf,BookIsComplete){

    console.log("makeBookshelf = "+BookIsComplete);

    const textTitle = document.createElement("h2");
    textTitle.classList.add("judul");
    textTitle.innerText = titleBookshelf

    const textauthor = document.createElement("h3");
    textauthor.innerText = authorBookshelf;

    const textyear = document.createElement("p");
    textyear.innerText =  yearBookshelf;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner");
    textContainer.append(textTitle,textauthor,textyear);
    
    const container = document.createElement("div");
    container.classList.add("item","shadow");
    container.append(textContainer);
    
    if(BookIsComplete){
        container.append(createUndoButton(),createTrashButton());

    }else{
        container.append(cerateCheckButton(),createTrashButton());
    }
    return container;
}

function createUndoButton() {
    return createButton("undo-button", function(event){
        undoTaskFromCompleted(event.target.parentElement);
    });
}

function createTrashButton(){
    return createButton("trash-button", function(event){
        removeBookFromCompleted(event.target.parentElement);
    });
}
function cerateCheckButton(){
    return createButton("check-button", function(event){
        addReadToCompleted(event.target.parentElement);
    });
}
function createButton(buttonTypeClass, eventListener){
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function(event){
        eventListener(event);
    });
    return button;
}

function addBookshelf(){
    const uncomplated_read = document.getElementById(UNCOMPLETED_READ);
    const list_Completed = document.getElementById(COMPLETED_READ);
    
    const titleBookshelf = document.getElementById("title").value;
    const authorBookshelf = document.getElementById("author").value;
    const yearBookshelf = document.getElementById("year").value;
    let BookIsComplete =document.getElementById("BookIsComplete").checked;
   
    if(BookIsComplete){
        const Book = makeBookshelf(titleBookshelf,authorBookshelf,yearBookshelf,BookIsComplete);
        
        const bookObject = composeBooksObject(titleBookshelf,authorBookshelf,yearBookshelf,BookIsComplete);
        Book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);
        list_Completed.append(Book);
        updateDataToStorage();

    }else{
        const Book = makeBookshelf(titleBookshelf,authorBookshelf,yearBookshelf,BookIsComplete);
        const bookObject = composeBooksObject(titleBookshelf,authorBookshelf,yearBookshelf,BookIsComplete);
        Book[BOOK_ITEMID]=bookObject.id;
        books.push(bookObject);
        uncomplated_read.append(Book);
        updateDataToStorage();

    }
    
}
function addReadToCompleted(bookElement){
    const listCompleted = document.getElementById(COMPLETED_READ);
    const complatedTitle= bookElement.querySelector(".inner > h2").innerText;
    const complatedAuthor= bookElement.querySelector(".inner > h3").innerText;
    const complatedYear= bookElement.querySelector(".inner > p").innerText;

    const newBook = makeBookshelf(complatedTitle,complatedAuthor,complatedYear,BookIsComplete=true);
    const Book = findBooks(bookElement[BOOK_ITEMID]);
    Book.BookIsComplete = true;
    newBook[BOOK_ITEMID] = Book.id;

    listCompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}


function removeBookFromCompleted(bookElement){
    
    const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);
    
    alert("Apakah Kamu ingin menghapus Data Buku")
    bookElement.remove();
    updateDataToStorage();
}


function undoTaskFromCompleted(bookElement){
    const listUncompleted = document.getElementById(UNCOMPLETED_READ);
    const complatedTitle= bookElement.querySelector(".inner > h2").innerText;
    const complatedAuthor= bookElement.querySelector(".inner > h3").innerText;
    const complatedYear= bookElement.querySelector(".inner > p").innerText;
    
    const newBook = makeBookshelf(complatedTitle, complatedAuthor,complatedYear,BookIsComplete=false);
    
    const Book = findBooks(bookElement[BOOK_ITEMID]);
    Book.BookIsComplete = false;
    newBook[BOOK_ITEMID] = Book.id;

    listUncompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

