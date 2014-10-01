<?php

namespace app\Models;

class User extends \Phalcon\Mvc\Collection
{
    public function getSource()
    {
        return "book";
    }
}