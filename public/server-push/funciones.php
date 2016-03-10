<?php

class DB_Functions {
    private $db;

    function __construct() {
        include_once 'connect.php';
        // Conectando con la DB
        $this->db = new DB_Connect();
        $this->db->connect();
    }

    function __destruct() {
    }

    /*---- Almacenando nuevo usuario ----*/
    public function storeUser($gcm_regid) {
        // Insertamos el usuario en la DB
        $result = mysql_query("INSERT INTO gcm_devices(gcm_regid) VALUES('$gcm_regid')");
        // Verificamos que se insertó correctamente
        if ($result) {
            // obtenemos los detalles del usuario
            $result = mysql_query("SELECT * FROM gcm_devices") or die(mysql_error());
            // retornamos detalles del usuario
            if (mysql_num_rows($result) > 0) {
                return mysql_fetch_array($result);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    /*---- Almacenando nuevo usuario ----*/
    public function storeUserIOS($token) {
        // Insertamos el usuario en la DB
        $result = mysql_query("INSERT INTO ios_devices(token) VALUES('$token')");
        // Verificamos que se insertó correctamente
        if ($result) {
            // obtenemos los detalles del usuario
            $result = mysql_query("SELECT * FROM ios_devices") or die(mysql_error());
            // retornamos detalles del usuario
            if (mysql_num_rows($result) > 0) {
                return mysql_fetch_array($result);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    /*--- Obtenemos todos los usuarios registrados ----*/
    public function getAllUsers() {
        $result = mysql_query("SELECT * FROM gcm_devices") or die(mysql_error());
		$response = array();
		while ($row = mysql_fetch_array($result)) {
			$Reg_ID = $row["gcm_regid"];
			array_push($response, $Reg_ID);
		}

		return $response;
	}
    /*--- Obtenemos todos los usuarios registrados ----*/
    public function getAllUsersIOS() {
        $result = mysql_query("SELECT * FROM ios_devices") or die(mysql_error());
		$response = array();
		while ($row = mysql_fetch_array($result)) {
//			return $row["token"];
			$token = $row["token"];
			array_push($response, $token);
		}
		
		return $response;
	}
	
	public function getNumberOfUsers(){
        $result = mysql_query("SELECT * FROM gcm_devices") or die(mysql_error());
		return mysql_num_rows($result);
	}
}
?>
