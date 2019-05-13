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
        // basemap: 'topo'
      })
      // eslint-disable-next-line no-unused-vars
      layer = new FeatureLayer({
        url: 'http://47.100.207.237:6080/arcgis/rest/services/mine/szland/MapServer/1',
        id: 'initlayer',
        outFields: ['*'],
        popupTemplate: popupTemplate
      })

      villageLayer = new FeatureLayer({
        url: 'http://47.100.207.237:6080/arcgis/rest/services/mine/szland/MapServer/4',
        id: 'initlayer',
        visible: false,
        outFields: ['*'],
        popupTemplate: popupTemplate
      })

      // eslint-disable-next-line no-unused-vars
      const mapImageLayer = new MapImageLayer({
        url: 'http://47.100.207.237:6080/arcgis/rest/services/mine/szland/MapServer'
      })
      // eslint-disable-next-line no-unused-vars
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
      mapview.on('click', function (evt) {
        console.log(evt)
        mapview.hitTest(evt).then(function (res) {
          var result = res.results[0]
          if (result && result.graphic) {
            var graphic = result.graphic
            // 自定义高亮
            // 这里的几何图形是面状，配置graphic的symbol为fillSymbol
            graphic.symbol = {
              type: 'simple-fill',
              color: 'red',
              outline: {
                color: [128, 128, 128, 0.5],
                width: '0.5px'
              }
            }
            mapview.graphics.removeAll()// 清除上一次点击目标
            mapview.graphics.add(graphic)// 添加新的点击目标
          }
        })
      })
    }, reason => {
      console.log(reason)
    })
}
