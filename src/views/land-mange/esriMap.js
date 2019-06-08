function showFeatureLayer (villageLayer, mapview) {
  mapview.whenLayerView(villageLayer)
    .then(function (layerView) {
      villageLayer.visible = true
    })
    .otherwise(function (error) {
      // An error occurred during the layerview creation
      console.log(error)
    })
}

let layer = Object
let villageLayer = Object

export const createMap = function (esriLoader, popupTemplate) {
  const options = {
    // 可以使用自定义资源加载,arcgis 官网加载太慢了,经常加载失败.后面会讲到自己本地如何配置资源
    url: 'https://js.arcgis.com/4.7/init.js'
  }
  // const options = { version: '3.28' }
  esriLoader.loadModules([
    'esri/Map',
    'esri/config',
    'esri/views/MapView',
    'esri/layers/MapImageLayer',
    'esri/geometry/Extent',
    'esri/layers/WMSLayer',
    'esri/layers/BaseDynamicLayer',
    'esri/layers/MapImageLayer',
    'esri/layers/FeatureLayer',
    'dojo/domReady'
  ], options)
    .then(([
      Map,
      esriConfig,
      MapView,
      MapImageLayer,
      Extent,
      WMSLayer,
      BaseDynamicLayer,
      MapImageKLayer,
      FeatureLayer
    ]) => {
      const map = new Map({
        basemap: 'topo'
      })
      const mapview = new MapView({
        container: 'viewDiv',
        map: map,
        zoom: 16,
        center: [120.2147147, 31.35579237]
      })
      mapview.extent = new Extent({
        xmin: 120.21471475325703,
        ymin: 31.355792370802604,
        xmax: 120.51345608253902,
        ymax: 31.45608665219835,
        spatialReference: {
          wkid: 4326
        }
      })
      map.add(layer)
      // map.add(mapImageLayer)
      map.add(villageLayer)
      showFeatureLayer(villageLayer, mapview)
    }, reason => {
      console.log(reason)
    })
}
