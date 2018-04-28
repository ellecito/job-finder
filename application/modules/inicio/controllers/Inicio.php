<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inicio extends CI_Controller {

	private $keywords;
	
	function __construct(){
		parent::__construct();
		$this->keywords = ["Desarrollador", "Programador", "Informatico"];
    }
    
	public function index(){
		$this->load->view("index.html");
	}

	public function computrabajo(){
		//Custom Filters
		$querys = [];
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
		
		$urls = [];
		$urls[] = "https://www.yapo.cl/biobio/ofertas_de_empleo/?q=";

		$pages = [];

		$context = stream_context_create(
			array(
			'http'=>array(
			  	'method'=>"GET",
				  'header'=>"Accept-Language: es-CL\r\n" .
				  		"Accept-Charset: UTF-8, *;q=\r\n" . 
						"content-type: text/html; charset=ISO-8859-1\r\n" . 
						"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0\r\n"
				)
		  	)
		);

		foreach($this->keywords as $q){
			foreach($urls as $url){
				$pages[] = utf8_encode(file_get_contents($url . $q, false, $context));
			}
		}
		
		if(!array_filter($pages)){
			echo json_encode(["result" => false]);
		}else{
			echo json_encode(["result" => true, "pages" => $pages]);
		}
	}

	public function trabajando(){
		$urls = [];
		//Ingeniería Civil en Informática / Computación
		$urls[] = "https://www.trabajando.cl/ofertas-trabajo-empleo/region-VIII-Bio-Bio--Ingenieria-Civil-en-Informatica---Computacion/63BM50XnZ3zsaY0w97VO56pppkdWFDFHU0k5C2gMGnjSTwkct7QerEg-gVoD6VBixY_K5xe-wgVoZLbDkLjoyw";
		//Informática
		$urls[] = "https://www.trabajando.cl/ofertas-trabajo-empleo/region-VIII-Bio-Bio--Informatica/SXbeT5yoautkBzKg58xlPOp3NyGUBDs_UK_QDFNr4TA_6HHb_oI4yyDE5Co7CEFvcYx8KLTnRCwMPexlmfuE6A";
		//Análisis de Sistemas / Analista Programador
		$urls[] = "https://www.trabajando.cl/ofertas-trabajo-empleo/region-VIII-Bio-Bio--Analisis-de-Sistemas---Analista-Programador/VHrIVf2CltNJq2miRqrXH4qK8_Uktm38aq4qucZzgTwHW90rDny4Wvnn_vEJNjMAIJ6DjO5jVduXCSvXXnlj9g";
		//Computación e Informática
		$urls[] = "https://www.trabajando.cl/ofertas-trabajo-empleo/region-VIII-Bio-Bio--Computacion-e-Informatica/ia0TkP0YwlRec0XdaKouy3GwNdjeaS6XSY-CAytVoamZPjYpg6A-wMKxWG7-jfxo3Vs1f1uJoVoqT0c_j2ohkA";
		//Informática Biomédica
		$urls[] = "https://www.trabajando.cl/ofertas-trabajo-empleo/region-VIII-Bio-Bio--Informatica-Biomedica/n_4tTL8gsIuN16v5efUpGNC-chIqWJ0gybT6xdTmtri1tS2xn0E0OkNBIowcXCkzAwbk_Bf0lRs7VJvmDdGCiw";
		//Ingeniería Computación Informática y Comunicaciones
		$urls[] = "https://www.trabajando.cl/ofertas-trabajo-empleo/region-VIII-Bio-Bio--Ingenieria-Computacion-Informatica-y-Comunicaciones/Bn0zrYum8B0CTl9b888Xaa74EI_R__Sztv3ckZpJFMoTFMv9gC19ib-vphPOaJf0PWO-ZzY6RDZregmqFWMTFQ";
		//Ingeniería de Ejecución en Computación e Informática
		$urls[] = "https://www.trabajando.cl/ofertas-trabajo-empleo/region-VIII-Bio-Bio--Ingenieria-de-Ejecucion-en-Computacion-e-Informatica/PqU7S-A6iULMHA935u6VANveBP1jfew7rOVTO4HGNTllQEI96VRUI0nHIP7IoFioWcg3E3SRI4VO7MlFDk1PHQ";
		//Ingeniería en Bioinformática
		$urls[] = "https://www.trabajando.cl/ofertas-trabajo-empleo/region-VIII-Bio-Bio--Ingenieria-en-Bioinformatica/jFvWPprp3AkCbPZcSeH_ztM5tpsZII2cxyjr2QkRfaa9A2bGWcBdmjB7uMVw5GZ53TkR_F-kY4GGm5hqGHSUiQ";
		//Ingeniería en Computación
		$urls[] = "https://www.trabajando.cl/ofertas-trabajo-empleo/region-VIII-Bio-Bio--Ingenieria-en-Computacion/C2EvPAFsDIXmG_1pyRSs2RwpVh8R9mnD8aNU-lfnn70Rawefh0ZdPzVEV1jBBzHkufYYH94yYdbXAiALg7kYTw";
		//Ingeniería en Informática / Sistemas
		$urls[] = "https://www.trabajando.cl/ofertas-trabajo-empleo/region-VIII-Bio-Bio--Ingenieria-en-Informatica---Sistemas/dljdg3ah8TSrBPIntzqZ0pRCXlJF2wVXNZO5irT8ggLJmbGaCS_XwIRwMksfqPWbam3hqwafeQVhwLZejYbjRA";
		//Programación
		$urls[] = "https://www.trabajando.cl/ofertas-trabajo-empleo/region-VIII-Bio-Bio--Programacion/4C5OBYY04wL9JMUjkh-b36_tZLq4QILXZNb1sH1yCWNgeh-fvwaQFXw5b2XVyq3gP-NIuxC8n8vCikiDyM4EvQ";

		$pages = [];
		foreach($urls as $url){
			$pages[] = file_get_contents($url);
		}
		if(!array_filter($pages)){
			echo json_encode(["result" => false]);
		}else{
			echo json_encode(["result" => true, "pages" => $pages]);
		}
	}
}