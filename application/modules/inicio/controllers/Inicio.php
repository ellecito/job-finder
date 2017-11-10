<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inicio extends CI_Controller {
	
	function __construct(){
		parent::__construct();
    }
    
	public function index(){
		$this->load->view("index");
	}

	public function computrabajo(){
		$qs = ["Desarrollador", "Programador"];
		$prov = 9; //Bio-Bio
		$order = "publicationtime";

		$paginas = [];
		foreach($qs as $q){
			$paginas[] = file_get_contents("https://www.computrabajo.cl/ofertas-de-trabajo/?prov=" . $prov . "&q=" . $q . "&by=" . $order);
		}
		echo json_encode(["result" => true, "paginas" => $paginas]);
	}
}