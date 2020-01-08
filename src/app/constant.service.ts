import { Injectable } from '@angular/core';

@Injectable()
export class ConstantService {

    API_ENDPOINT: String;
    API_ENDPOINT_MAIL: String;

    Login_Auth: String;
    picUrl: String;
    Socket_Url: String;
    cloudinarUpload = {
        cloudName: 'demo-gabenc',
        uploadPreset: 'd57t3qmo'
    };

    constructor() {
        // this.Login_Auth = 'http://200.124.227.70:9092/rest-easy/rest/';
        // this.Login_Auth = 'http://localhost:8080/rest-easy/rest/';
        
        this.Login_Auth = 'http://compras.easybox.com.ec:9093/rest-easy/rest/';

        // this.API_ENDPOINT = 'http://200.124.227.70:9092/rest-easy/rest/';
        // this.API_ENDPOINT = 'http://localhost:8080/rest-easy/rest/';
        this.API_ENDPOINT = 'http://compras.easybox.com.ec:9093/rest-easy/rest/';

        this.API_ENDPOINT_MAIL = 'http://200.124.227.70:9092/mail/rest/';
        // this.API_ENDPOINT_MAIL = 'http://localhost:8080/mail/rest/';
        // this.API_ENDPOINT_MAIL = 'http://localhost:8080/mail/rest/';


    }

}
