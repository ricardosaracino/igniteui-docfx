---
title: Map | Data Visualization Tools | Ignite UI for Angular | Heat Imagery Maps | Infragistics
_description: The Map allows you to display heat imagery maps. View the demo and usage for more information.
_keywords: map, Ignite UI for Angular, infragistics
mentionedTypes: ['XamGeographicMap']
---

## Displaying Imagery with Heat Tiles

The Ignite UI for Angular map control has the ability to show heat-map imagery through the use of the `ShapeFileRecords` that are generated by a `ShapeDataSource` by loading geo-spatial data by loading shape files to a tile series.

It is highly recommended that you review the [Binding Shape Files with Geo-Spatial Data](map_binding_geographic_shape_files.md) topic as a pre-requisite to this topic.

### Demo

<div class="sample-container loading" style="height: 500px">
    <iframe id="geo-map-display-heat-imagery-iframe" src='{environment:demosBaseUrl}/maps/geo-map-display-heat-imagery' width="100%" height="100%" seamless frameBorder="0" onload="onXPlatSampleIframeContentLoaded(this);"></iframe>
</div>
<div>
    <button data-localize="stackblitz" disabled class="stackblitz-btn"   data-iframe-id="geo-map-display-heat-imagery-iframe" data-demos-base-url="{environment:demosBaseUrl}">View on StackBlitz
    </button>
</div>

<div class="divider--half"></div>

When a `ShapeDataSource` loads its shape files, it converts that data into `ShapeFileRecord` objects. These objects can be retrieved from the `GetPointData()` method of the `ShapeDataSource` and can then be used to create a heat-map through usage of a [`TileGeneratorMapImagery`](map_displaying_heat_imagery.md) object with a [`HeatTileGenerator`](map_displaying_heat_imagery.md) assigned to its `TileGenerator` property. This [`TileGeneratorMapImagery`](map_displaying_heat_imagery.md) can then be used in a geographic tile series as its `TileImagery` source.

The [`HeatTileGenerator`](map_displaying_heat_imagery.md) object works such that it has three value paths, [`XValues`](map_displaying_heat_imagery.md), `YValues` and `Values`. As an example of how these could be used, in the case of a shape file that has information about population, you could consider the [`XValues`](map_displaying_heat_imagery.md) to be longitude, `YValues` to be latitude, and `Values` to be the population data. Each of these properties takes a `number[]`.

The display of the geographic tile series when using the heat-map functionality can be customized by setting the `MinimumColor` and `MaximumColor` properties to "rgba" strings that describe colors that you wish to correspond to the minimum and maximum values of the collection that you assign to the `Values` property of the `HeatTileGenerator.` You can further customize this by setting the `ScaleColors` property of the generator to contain a collection of strings that describe colors, as this will tell the [`HeatTileGenerator`](map_displaying_heat_imagery.md) what colors to use for the displayed values in the map. It is also possible to customize how colors in your `ScaleColors` collection blur together by using the [`blurRadius`](map_displaying_heat_imagery.md), [`maxBlurRadius`](map_displaying_heat_imagery.md), and `UseBlurRadiusAdjustedForZoom` properties.

The [`HeatTileGenerator`](map_displaying_heat_imagery.md) can also use a logarithmic scale. If you want to use this, you can set the [`useLogarithmicScale`](map_displaying_heat_imagery.md) property to `true`.

The [`HeatTileGenerator`](map_displaying_heat_imagery.md) also has support for web workers to do the heavy lifting of the loading of the tile imagery from your shape file on a separate thread. This can greatly improve the performance of your geographic map when using the heat-map functionality. In order to use a web worker with the generator, you can set the `UseWebWorkers` property to `true` and then set the [`webWorkerInstance`](map_displaying_heat_imagery.md) property to an instance of your web worker.

### Dependencies

<!-- Angular -->

```ts
import { HeatTileGenerator } from "igniteui-angular-core/ES5/igx-heat-tile-generator";
import { ShapeDataSource } from "igniteui-angular-core/ES5/igx-shape-data-source";
import { IgxGeographicMapComponent } from "igniteui-angular-maps/ES5/igx-geographic-map-component";
import { TileGeneratorMapImagery } from "igniteui-angular-maps/ES5/igx-tile-generator-map-imagery";
```

### Code Snippet

The following code snippet shows how to display a population based heat-map in the Ignite UI for Angular map component along with a custom web worker:

```ts
import { HeatTileGeneratorWebWorker } from "igniteui-angular-core/ES5/HeatTileGeneratorWebWorker";

const worker: Worker = self as any;

worker.onmessage = HeatTileGeneratorWebWorker.onmessage;
HeatTileGeneratorWebWorker.postmessage = heatWorkerPostMessage;

function heatWorkerPostMessage() {
  (self as any).postMessage.apply(self, Array.prototype.slice.call(arguments));
}

HeatTileGeneratorWebWorker.start();

export default {} as typeof Worker & (new () => Worker);
```

<!-- Angular -->

```html
<igx-geographic-map #map width="100%" height="calc(100% - 60px)">
    <igx-geographic-tile-series name="heatTiles" [tileImagery]="tileImagery"></igx-geographic-tile-series>
</igx-geographic-map>
```

```ts
@ViewChild("map", { static: true })
public map: IgxGeographicMapComponent;

public data: any[];
public tileImagery: TileGeneratorMapImagery;

constructor() {
    this.data = this.initData();

    this.tileImagery = new TileGeneratorMapImagery();

    const con: ShapeDataSource = new ShapeDataSource();

    con.importCompleted.subscribe((s, e) => {
        const data = con.getPointData();
        const lat: number[] = [];
        const lon: number[] = [];
        const val: number[] = [];

        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            for (let j = 0; j < item.points.length; j++) {
                const pointsList = item.points[j];
                for (let k = 0; k < pointsList.length; k++) {
                    lat.push(pointsList[k].y);
                    lon.push(pointsList[k].x);
                }
            }
            const value = item.fieldValues["POP_2010"];
            if (value >= 0) {
                val.push(value);
            } else {
                val.push(0);
            }
        }

        const gen = new HeatTileGenerator();
        gen.xValues = lon;
        gen.yValues = lat;
        gen.values = val;
        gen.blurRadius = 6;
        gen.maxBlurRadius = 20;
        gen.useBlurRadiusAdjustedForZoom = true;
        gen.minimumColor = "rgba(100,255, 0, 0.3922)";
        gen.maximumColor = "rgba(255, 255, 0, 0.9412)";
        gen.useGlobalMinMax = true;
        gen.useGlobalMinMaxAdjustedForZoom = true;
        gen.useLogarithmicScale = true;
        gen.useWebWorkers = true;
        gen.webWorkerInstance = new Worker("../heatworker.worker", { type: "module" });

        gen.scaleColors = [
            "rgba(0, 0, 255, 64)",
            "rgba(0, 255, 255, 96)",
            "rgba(0, 255, 0, 160)",
            "rgba(255, 255, 0, 180)",
            "rgba(255, 0, 0, 200)"
        ];

        this.tileImagery.tileGenerator = gen;
    });

    con.shapefileSource = "assets/Shapes/AmericanCities.shp";
    con.databaseSource = "assets/Shapes/AmericanCities.dbf";
    con.dataBind();
}

public initData(): any {
    const rows: any[] = [];
    for (let i = 0; i < 5; i++) {
        rows.push({
            index: i,
            name: "row" + i,
            state: "Initial... Initial... Initial... Initial... ",
            value: i * 10
        });
    }
    rows.push({
        index: 5,
        name: "row5",
        state: "Initial",
        value: undefined
    });
    return rows;
}
```