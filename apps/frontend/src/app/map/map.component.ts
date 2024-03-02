import { AfterViewInit, Component, EventEmitter, Input, Output, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { MapLocation } from '../interfaces/location';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'users-central-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit{

  private _markerLocation?: MapLocation;

  @Input()
  set markerLocation(value: MapLocation | undefined) {
    this._markerLocation = value;
    this.onMyPropertyChange();
  }

  get markerLocation(): MapLocation | undefined {
    return this._markerLocation;
  }

  @Output() onMarkerSet = new EventEmitter<MapLocation>();

  private map?: L.Map;
  private marker?: L.Marker;


  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.initMap();

    const map = this.map;
    if (map) {
      map.on('click', e => {
        const {lat, lng: long} = e.latlng

        this.markerLocation = {lat, long };
        this.onMarkerSet?.emit({lat, long });
      });
    }
  }




  updatePropertyManually(newValue: MapLocation): void {
    this.ngZone.run(() => {
      this.markerLocation = newValue;
    });
  }

  onMyPropertyChange(): void {
    this.setMarker();
  }

  private setMarker() {
    if (this.markerLocation && this.map) {
      if (this.marker){
        this.map?.removeLayer(this.marker);
      }
      const {lat, long} = this.markerLocation;
      this.marker = L.marker([lat, long]);
      this.marker.addTo(this.map);
    }
  }

  private initMap() {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }
}
