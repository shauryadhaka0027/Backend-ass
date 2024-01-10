const express=require("express")
const app=express();
const PORT=7070;
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("WELCOME TO BOOKSTORE MANAGEMENT SYSTEM")
})
let books=[];
app.get("/books",(req,res)=>{
    res.json(books)
})
const validator = (req, res, next) => {
    const { title, author, ISBN } = req.body;
    if (!title || !author || !ISBN) {
      return res.status(400).json({ error: "All book details are required." });
    }
    next();
  };
  app.post("/books/add",validator,(req,res)=>{
  let data=req.body;
  books.push(data)
  res.json({message:"books is added"})
  });
  app.get("/books/search",async(req,res)=>{
    const { query } = req.query;
    const filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    );
    res.json(filteredBooks)
  })
  app.patch("/books/update/:id", (req, res) => {
    const { id } = req.params;
    const updatedDetails = req.body;
    books = books.map((book) => (book.id === id ? { ...book, ...updatedDetails } : book));
    res.json({ message: "Book details updated successfully!" });
  });
  
 
  app.delete("/books/delete/:id", (req, res) => {
    const { id } = req.params;
    books = books.filter((book) => book.id !== id);
    res.json({ message: "Book deleted successfully!" });
  });
  
  
  app.use((req, res) => {
    res.status(404).send("Invalid endpoint. Please check the URL.");
  });
app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`)
})