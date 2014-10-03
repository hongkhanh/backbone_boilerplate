<?php

error_reporting(E_ALL);

class Application extends \Phalcon\Mvc\Application
{
    protected function _registerServices()
    {
        $loader = new \Phalcon\Loader();

        $loader->registerNamespaces(array(
            'app\Controllers' => '../app/controllers/',
            'app\Models' => '../app/models/'
        ));

        $loader->register();

        $di = new \Phalcon\DI\FactoryDefault();

        $di->set('router', function() {
            $router = new \Phalcon\Mvc\Router();
            $router->add('#^(|/)$#', array(
                'controller' => 'index',
                'action' => 'index',
            ));

            $router->add('#^/([a-zA-Z0-9\_]+)[/]{0,1}$#', array(
                'controller' => 1,
            ));

            $router->add('#^[/]{0,1}([a-zA-Z0-9\_]+)/([a-zA-Z0-9\_]+)(/.*)*$#', array(
                'controller' => 1,
                'action' => 2,
                'params' => 3,
            ));
            return $router;
        });

        $di->set('url', function() {
            $url = new \Phalcon\Mvc\Url();
            $url->setBaseUri('/');
            return $url;
        });

        $di->set('session', function() {
            $session = new \Phalcon\Session\Adapter\Files();
            $session->start();
            return $session;
        });

        $di->set('dispatcher', function() {
            $dispatcher = new \Phalcon\Mvc\Dispatcher();
            $dispatcher->setDefaultNamespace("app\Controllers");
            return $dispatcher;
        });

        $di->set('view', function() {
            $view = new \Phalcon\Mvc\View();
            return $view;
        });

        $di->set('mongo', function() {
            $mongo = new \MongoClient('localhost:27017');
            return $mongo->selectDb('book');
        });

        $di->set('collectionManager', function() {
            return new \Phalcon\Mvc\Collection\Manager();
        });

        $di->set('request', function() {
            return new \Phalcon\Http\Request();
        });

        $di->set('response', function() {
            $response = new \Phalcon\Http\Response();
            $content_type = 'application/json';
            $response->setContentType($content_type, 'UTF-8');
            $response->setHeader('Access-Control-Allow-Origin', '*');
            $response->setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
            $response->setHeader('Access-Control-Allow-Headers', 'Authorization');
            $response->setHeader('Content-type:', $content_type);
            $response->sendHeaders();

            return $response;
        });
        $this->setDI($di);
    }

    public function main()
    {
        try {
            $this->_registerServices();
            echo $this->handle()->getContent();
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }
}

// Run application:
$app = new Application();
$app->main();