<?php

namespace app\Controllers;

use app\Models\Book;

class BookController extends \Phalcon\Mvc\Controller
{
    public function  indexAction()
    {
        $books = Book::find();
        echo json_encode($books);
    }
    public function  findAllAction()
    {
        $books = Book::find();
        echo json_encode($books);
    }
    public function  findByIdAction($id)
    {
        $book = Book::findById($id);
        echo json_encode($book);
    }
    public function createAction()
    {
        $input = json_decode(file_get_contents("php://input"));
        $book = new Book();
        foreach ($input as $key => $value)
        {
            $book->$key = $value;
        }
        if ($book->save() == false) {
            $response = "Umh, We can't store book right now: \n";
            foreach ($book->getMessages() as $message) {
                $response += $message . "\n";
            }
        } else {
            $response = "Great, a new book was saved successfully!";
        }
        echo json_encode(array(
            'message'=>$response
        ));
    }
    public function  updateAction($id)
    {
        $input = json_decode(file_get_contents("php://input"));

        $book = Book::findById($id);
        foreach ($input as $key => $value)
        {
            if($key == '_id' or $key == 'id') continue;
            $book->$key = $value;
        }
        if ($book->save() == false) {
            $response = "Umh, We can't update book right now: \n";
            foreach ($book->getMessages() as $message) {
                $response += $message . "\n";
            }
        } else {
            $response = "Great, The book was updated successfully!";
        }
        echo json_encode(array(
            'message'=>$response
        ));
    }

    public function deleteAction($id)
    {
        $book = Book::findById($id);
        if ($book != false) {
            if ($book->delete() == false) {
                $response = "Sorry, we can't delete the book right now: \n";
                foreach ($book->getMessages() as $message) {
                    $response += $message . "\n";
                }
            } else {
                $response = "The book was deleted successfully!";
            }
        }
        echo json_encode(array(
            'message'=>$response
        ));
    }
}