import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
import { IClient, IUser } from '../../../../global';
const { Device, Geolocation } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class DeviceInfoService {
  logged = false;
  logged$: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient) {}

  public async setClientDeviceInfo() {
    let location: IClient['location'];
    try {
      await Geolocation.requestPermissions();
      const { coords } = await Geolocation.getCurrentPosition();
      location = {
        type: 'point',
        coordinates: [coords.longitude, coords.latitude],
      };
      const {
        model,
        platform,
        osVersion,
        appVersion,
        appBuild,
      } = await Device.getInfo();
      await this.httpClient
        .put('/client/device/info', {
          model,
          platform,
          osVersion,
          appVersion,
          appBuild,
          location,
        })
        .toPromise();
    } catch (e) {
      console.log(e);
    }
  }
}
