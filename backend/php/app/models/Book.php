<?php

namespace app\Models;

class Book extends \Phalcon\Mvc\Collection
{
    public function getSource()
    {
        return "book";
    }
}