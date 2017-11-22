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
		$this->load->view("index.html");
	}

	public function computrabajo(){
		//Custom Filters
		$this->query = [
			//Bio-Bio
			"prov" => 9,
			"by" => "publicationtime"
		];

		/*$this->query = [
			//Los Lagos
			"prov" => 11,
			"by" => "publicationtime"
		];*/

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

	public function yapo(){

		$url = "https://www.yapo.cl/biobio/ofertas_de_empleo/?";

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

	public function yapo_curl(){
		
		$curl = curl_init();
		
		curl_setopt_array($curl, array(
		  CURLOPT_URL => "https://www.yapo.cl/biobio/ofertas_de_empleo/?q=Desarrollador",
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 30,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "GET",
		  CURLOPT_HTTPHEADER => array(
			"cache-control: no-cache",
			"postman-token: dc537b5d-2884-bb29-220a-8fbbe4c20e53"
		  ),
		));
		
		$response = curl_exec($curl);
		$err = curl_error($curl);
		
		curl_close($curl);
		
		if ($err) {
		  echo "cURL Error #:" . $err;
		} else {
		  echo $response;
		}
	}
}