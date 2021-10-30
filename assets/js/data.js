const STORAGE_KEY = "Bookshelf_Apps";

let books = [];
function refreshDataFromBooks() {
    const uncomplated_read = document.getElementById(UNCOMPLETED_READ);
    let list_Completed = document.getElementById(COMPLETED_READ);
  
  
    for(Book of books){
        const newBook = makeBookshelf(Book.titleBookshelf, Book.authorBookshelf, Book.yearBookshelf, Book.BookIsComplete);
        newBook[BOOK_ITEMID] = Book.id;
  
  
        if(Book.BookIsComplete){
            list_Completed.append(newBook);
        } else {
            uncomplated_read.append(newBook);
        }
    }
}

function isStorageExist() {
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
 }

function saveData(){
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));

}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(serializedData);

    
    if(data !== null)
        {books = data;}

    document.dispatchEvent(new Event("ondataloaded"));
 }

function updateDataToStorage() {
    if(isStorageExist())
        saveData();
 }
 
function composeBooksObject(titleBookshelf,authorBookshelf,yearBookshelf,BookIsComplete) {
    return {
        id: +new Date(),
        titleBookshelf,
        authorBookshelf,
        yearBookshelf,
        BookIsComplete
    };
}

function findBooks(BookId) {
    for(Book of books){
        if(Book.id === BookId)
            return Book;
    }
    return null;
}

function findBookIndex(BookId) {
    let index = 0
    for (Book of books) {
        if(Book.id === BookId)
            return index;
  
        index++;
    }
  
    return -1;
 }