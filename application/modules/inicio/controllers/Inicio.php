<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inicio extends CI_Controller {

	private $query;
	private $keywords;
	
	function __construct(){
		parent::__construct();
		$this->query = [];
		$this->keywords = ["Desarrollador", "Programador", "Informatico"];
    }
    
	public function index(){
		$this->load->view("index.html");
	}

	public function computrabajo(){
		//Custom Filters
		$querys = [];
		$querys[] = [
			//Los Lagos
			"prov" => 11,
			"by" => "publicationtime"
		];
		$querys[] = [
			//Bio-Bio
			"prov" => 9,
			"by" => "publicationtime"
		];

		$url = "https://www.computrabajo.cl/ofertas-de-trabajo/?";

		$pages = [];
		foreach($this->keywords as $q){
			foreach($querys as $query){
				$query["q"] = $q;
				$pages[] = file_get_contents($url . http_build_query($query));
			}
		}

		if(!array_filter($pages)){
			echo json_encode(["result" => false]);
		}else{
			echo json_encode(["result" => true, "pages" => $pages]);
		}
	}

	public function chiletrabajos(){
		//Custom Filters
		$querys = [];
		$querys[] = [
			"13" => 1035, //Concepcion
			"f" => 2
		];
		$querys[] = [
			"13" => 1043, //Puerto Montt
			"f" => 2
		];

		$url = "https://www.chiletrabajos.cl/encuentra-un-empleo/?";

		$pages = [];
		foreach($this->keywords as $q){
			foreach($querys as $query){
				$query["2"] = $q;
				$pages[] = file_get_contents($url . http_build_query($query));
			}
		}

		if(!array_filter($pages)){
			echo json_encode(["result" => false]);
		}else{
			echo json_encode(["result" => true, "pages" => $pages]);
		}
	}

	public function yapo(){

		$url = "https://www.yapo.cl/biobio/ofertas_de_empleo/?";

		$pages = [];
		$urls = [];

		// $context = stream_context_create(
		// 	array(
		// 	'http'=>array(
		// 	  	'method'=>"GET",
		// 		  'header'=>"Accept-Language: es-CL\r\n" .
		// 		  		"Accept-Charset: UTF-8, *;q=\r\n" . 
		// 				"content-type: text/html; charset=ISO-8859-1\r\n" . 
		// 				"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0\r\n"
		// 		)
		//   	)
		// );

		foreach($this->keywords as $q){
			$this->query["q"] = $q;
			//$pages[] = file_get_contents($url . http_build_query($this->query));
			//$pages[] = file_get_contents($url . http_build_query($this->query), false, $context);
			$urls[] = $url . http_build_query($this->query);
		}
		
		if(!array_filter($pages)){
			echo json_encode(["result" => false, "urls" => $urls]);
		}else{
			echo json_encode(["result" => true, "pages" => $pages]);
		}
	}
}