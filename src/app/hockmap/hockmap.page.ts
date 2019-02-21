import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { GoogleMaps, GoogleMap, GoogleMapOptions, LatLng, CameraPosition,
  GoogleMapsEvent, HtmlInfoWindow } from '@ionic-native/google-maps/ngx';
import { flatMap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { HocklubService } from '../services/hocklub.service';

@Component({
  selector: 'app-hockmap',
  templateUrl: 'hockmap.page.html',
  styleUrls: ['hockmap.page.scss']
})
export class HockmapPage implements OnInit {

  private map: GoogleMap;
  private readonly mapOptions: GoogleMapOptions = {
    camera: {
      target: {
        lat: 52.13,
        lng: 5.29,
      },
      zoom: 6.9,
    },
    gestures: {
      rotate: false,
    },
    preferences: {
      zoom: {
        minZoom: 6.9,
      },
    },
  };
  private readonly markerInfoWindowTemplate = '<div style="padding: 0 16px 0 6px;">' +
    '<h3 style="color: var(--ion-color-secondary);">[name]</h3>' +
    '<p>[street]<br />' +
    '[postal_code] [city]' +
    '</p></div>';
  private readonly markerInfoWindowCssOptions = {
    width: '220px',
    height: '100%',
    margin: '-4px 0',
  };

  constructor(
    private platform: Platform,
    private hocklubService: HocklubService,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit() {
    await this.platform.ready();
    this.loadMap();
    this.addMarkers();

    this.route.paramMap.pipe(
      flatMap(params => of(parseInt(params.get('id'), 10))),
      filter(id => id > 0),
      flatMap(id => this.hocklubService.getById(id)),
    ).subscribe(hocklub => {
      const latLng = new LatLng(hocklub.latitude, hocklub.longitude);
      const cameraPosition: CameraPosition<LatLng> = {
        target: latLng,
        zoom: 15,
      };
      this.map.moveCamera(cameraPosition);
    });
  }

  private loadMap() {
    this.map = GoogleMaps.create('map-canvas', this.mapOptions);
  }

  private addMarkers() {
    this.hocklubService.getAll().subscribe(hocklubs => {
      for (const club of hocklubs) {
        const latLng = new LatLng(club.latitude, club.longitude);
        const marker = this.map.addMarkerSync({
          position: latLng,
          icon: {
            url: club.logo,
            size: {
              width: 32,
              height: 32,
            },
          },
        });
        const content = this.markerInfoWindowTemplate
          .replace('[name]', club.name)
          .replace('[street]', club.street)
          .replace('[postal_code]', club.postal_code)
          .replace('[city]', club.city);

        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          const infoWindow = new HtmlInfoWindow;
          infoWindow.setContent(content, this.markerInfoWindowCssOptions);
          infoWindow.open(marker);
        });
      }
    });
  }
}
