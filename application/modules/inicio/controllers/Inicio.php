<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inicio extends CI_Controller {

	private $query;
	private $keywords;
	
	function __construct(){
		parent::__construct();
		$this->query = [];
		$this->keywords = ["Desarrollador", "Programador"];
    }
    
	public function index(){
		$this->load->view("index");
	}

	public function computrabajo(){
		//Custom Filters
		$this->query = [
			"prov" => 9,
			"by" => "publicationtime"
		];

		$url = "https://www.computrabajo.cl/ofertas-de-trabajo/?";

		$pages = [];
		foreach($this->keywords as $q){
			$this->query["q"] = $q;
			$pages[] = file_get_contents($url . http_build_query($this->query));
		}

		if(!array_filter($pages)){
			echo json_encode(["result" => false]);
		}else{
			echo json_encode(["result" => true, "pages" => $pages]);
		}
	}

	public function chiletrabajos(){
		//Custom Filters
		$this->query = [
			"13" => 1035,
			"f" => 2
		];

		$url = "https://www.chiletrabajos.cl/encuentra-un-empleo/?";

		$pages = [];
		foreach($this->keywords as $q){
			$this->query["2"] = $q;
			$pages[] = file_get_contents($url . http_build_query($this->query));
		}

		if(!array_filter($pages)){
			echo json_encode(["result" => false]);
		}else{
			echo json_encode(["result" => true, "pages" => $pages]);
		}
	}
}