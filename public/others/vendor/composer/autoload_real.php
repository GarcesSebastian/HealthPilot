<?php

// autoload_real.php @generated by Composer

class ComposerAutoloaderInitbfbb3cf1694abfab9d9de082dfc00024
{
    private static $loader;

    public static function loadClassLoader($class)
    {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (null !== self::$loader) {
            return self::$loader;
        }

        require __DIR__ . '/platform_check.php';

        spl_autoload_register(array('ComposerAutoloaderInitbfbb3cf1694abfab9d9de082dfc00024', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(__DIR__));
        spl_autoload_unregister(array('ComposerAutoloaderInitbfbb3cf1694abfab9d9de082dfc00024', 'loadClassLoader'));

        require __DIR__ . '/autoload_static.php';
        call_user_func(\Composer\Autoload\ComposerStaticInitbfbb3cf1694abfab9d9de082dfc00024::getInitializer($loader));

        $loader->register(true);

        return $loader;
    }
}