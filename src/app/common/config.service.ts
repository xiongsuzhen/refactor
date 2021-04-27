import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configUrl = "assets/config/";

  private configFileSuffix = ".json";

  constructor(private hc: HttpClient) { }

  getConfig(configFile: String): Promise<Object>{
    return this.hc.get(this.configUrl + configFile + this.configFileSuffix).toPromise()
  }
}
