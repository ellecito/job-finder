<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inicio extends CI_Controller {
	
	function __construct(){
		parent::__construct();
    }
    
	public function index(){
		$qs = ["Desarrollador", "Programador"];
		$prov = 9; //Bio-Bio
		libxml_use_internal_errors(true);
		foreach($qs as $q){
			$pagina = file_get_contents("https://www.computrabajo.cl/ofertas-de-trabajo/?prov=" . $prov . "&q=" . $q);
			$html = new DOMDocument();
			$html->loadHTML($pagina);
			var_dump($html->getElementbyClassName("bRS bClick"));
			echo "</br>";
			echo "</br>";
		}
		libxml_use_internal_errors(false);
	}
}