import { Router } from "express";
import { BookModel } from "../models/bookModel.js";

const router = Router();



//? Route Get All Books
router.get('/', async (req, res) => {
    try {
        const allBooks = await BookModel.find();
        if (allBooks.length === 0) {
            return res.status(404).send("No books found")
        }
        return res.status(200).send({
            count: allBooks.length,
            data: allBooks
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ error: e.message });
    }

}

);


//? Route Create New Book
router.post('/', async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;
        if (!title || !author || !publishYear) {
            return res.status(404).send({ message: "Send all the required fields: title,author,publishYear" });
        }

        const newBook = {
            title: title,
            author: author,
            publishYear: publishYear
        };

        const createdBook = await BookModel.create(newBook);
        res.status(200).send(createdBook);
    } catch (e) {
        console.log(e);
        return res.status(500).send({ error: e.message })
    }

})

//? Find Book By ID

router.get('/:id', async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(404).send("Id is required for search")
    }
    try {
        //? You can use also findOne({_id:id})
        const searchedBook = await BookModel.findById(id);
        if (!searchedBook) {
            return res.status(404).send("Book not found")
        }
        return res.status(200).send({
            data: searchedBook
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ error: e.message });
    }

})

//? Route Update Book By ID

router.put('/:id', async (req, res) => {

    const { author, publishYear, title } = req.body;

    if (!author || !publishYear || !title) {

        return res.status(404).send({ message: "Send all the required fields: title,author,publishYear" });
    }

    const { id } = req.params;

    if (!id) {
        return res.status(404).send("Id is required for update")
    }

    //? the "new:true" to return the modified Book
    const updatedBook = await BookModel.findByIdAndUpdate(id, req.body, { new: true })

    return res.status(201).send({ newBook: updatedBook });

});


//? Route Delete Book By ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(404).send("Id is required for delete")
    }
    try {
        //? You can use also findOne({_id:id})
        const deletedBook = await BookModel.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).send("Book ")
        }
        return res.status(200).send({
            deletedBook: deletedBook
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ error: e.message });
    }

})


export default router;