<?php

require_once 'bootstrap.php';

//$file = 'maps.json';
//$json = json_decode( file_get_contents( $file ), true );

echo $twig->render( 'maps.twig', $context );