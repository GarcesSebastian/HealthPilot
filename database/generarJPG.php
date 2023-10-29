<?php
use Spatie\PdfToImage\Pdf;

include("conexion.php");
require '../public/others/vendor/autoload.php';

if(isset($_POST['btnGenerarJPG'])){

$pdf = new \Spatie\PdfToImage\Pdf('C:\Users\Malik\Downloads\a.pdf');

$numberOfPages = $pdf->getNumberOfPages();

for($i=1; $i <= $numberOfPages; $i++){
    $filename = time();
    $pdf->setPage($i)->saveImage('./$filename.jpg');
}

echo $i-1 . "paginas convertidas";

}

?>