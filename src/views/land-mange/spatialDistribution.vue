<template>
    <d2-container>
        <div id="viewDiv"></div>
        <div id="newmap"></div>
        <div  style="position: absolute; left: 10px; bottom: 20px; border: 1px solid #9c9c9c; background: #fff; width: 200px; height: auto; z-index: 99;padding: 10px;">
          <ul style="list-style:none">
            <li v-for="(item,index) in layerList" :key="item.id">
              <el-checkbox :label="item.name" @change="showLayer(index)" v-model="item.status">{{ item.name }}</el-checkbox>
            </li>
          </ul>
        </div>
    </d2-container>
</template>

<script>
import esriLoader from 'esri-loader'
import { createMap } from './esriMap.js'
export default {
  data () {
    return {
      layerList: [{
        id: '0',
        name: '未退出承包地',
        status: true
      }, {
        id: '1',
        name: '已退出承包地',
        status: true
      }, {
        id: '2',
        name: '现状承包地',
        status: true
      }, {
        id: '3',
        name: '村界',
        status: true
      }, {
        id: '4',
        name: '镇界',
        status: true
      }
      ],
      popupTemplate: {
        title: '土地利用查询',
        content: [{
          type: 'fields',
          fieldInfos: [{
            fieldName: 'xz',
            label: '行政单位名称',
            format: {
              places: 0,
              digitSeparator: true
            }
          }, {
            fieldName: 'xzc',
            label: '行政单位代码',
            format: {
              places: 0,
              digitSeparator: true
            }
          }, {
            fieldName: 'xzc',
            label: '上级行政单位代码',
            format: {
              places: 0,
              digitSeparator: true
            }
          }, {
            fieldName: 'xzc',
            label: '行政单位等级',
            format: {
              places: 0,
              digitSeparator: true
            }
          }]
        }],
        esri: {},
        options: {
          url: 'https://js.arcgis.com/4.7/init.js'
        },
        exitContractLayer: Object,
        townLayer: Object,
        villageLayer: Object,
        notExitContractLayer: Object,
        curContractLayer: Object,
        mapview: Object
      }
    }
  },
  mounted () {
    this.importEsri()
    // createMap(esriLoader, this.popupTemplate)
  },
  methods: {
    showLayer (index) {
      let status = this.layerList[index].status
      console.log(index)
      if (index === 0) {
        this.showFeatureLayer(this.notExitContractLayer, this.mapview, status)
      } else if (index === 1) {
        this.showFeatureLayer(this.exitContractLayer, this.mapview, status)
      } else if (index === 2) {
        this.showFeatureLayer(this.curContractLayer, this.mapview, status)
      } else if (index === 3) {
        this.showFeatureLayer(this.villageLayer, this.mapview, status)
      } else if (index === 4) {
        this.showFeatureLayer(this.townLayer, this.mapview, status)
      }
    },
    importEsri () {
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
          this.notExitContractLayer = new FeatureLayer({
            url: 'http://47.100.207.237:6080/arcgis/rest/services/mine/szland/MapServer/0',
            id: 'notExitContractLayer',
            outFields: ['*'],
            popupTemplate: this.popupTemplate
          })
          this.exitContractLayer = new FeatureLayer({
            url: 'http://47.100.207.237:6080/arcgis/rest/services/mine/szland/MapServer/1',
            id: 'exitContractLayer',
            outFields: ['*'],
            popupTemplate: this.popupTemplate
          })

          this.curContractLayer = new FeatureLayer({
            url: 'http://47.100.207.237:6080/arcgis/rest/services/mine/szland/MapServer/2',
            id: 'exitContractLayer',
            outFields: ['*'],
            popupTemplate: this.popupTemplate
          })

          this.villageLayer = new FeatureLayer({
            url: 'http://47.100.207.237:6080/arcgis/rest/services/mine/szland/MapServer/3',
            id: 'exitContractLayer',
            outFields: ['*'],
            popupTemplate: this.popupTemplate
          })

          this.townLayer = new FeatureLayer({
            url: 'http://47.100.207.237:6080/arcgis/rest/services/mine/szland/MapServer/4',
            id: 'initlayer',
            outFields: ['*'],
            popupTemplate: this.popupTemplate
          })

          // eslint-disable-next-line no-unused-vars
          const mapImageLayer = new MapImageLayer({
            url: 'http://47.100.207.237:6080/arcgis/rest/services/mine/szland/MapServer'
          })
          // eslint-disable-next-line no-unused-vars
          this.mapview = new MapView({
            container: 'viewDiv',
            map: map,
            zoom: 16,
            center: [120.2147147, 31.35579237]
          })
          this.mapview.extent = new Extent({
            xmin: 120.21471475325703,
            ymin: 31.355792370802604,
            xmax: 120.51345608253902,
            ymax: 31.45608665219835,
            spatialReference: {
              wkid: 4326
            }
          })
          map.add(this.exitContractLayer)
          map.add(this.notExitContractLayer)
          map.add(this.curContractLayer)
          map.add(this.villageLayer)
          // map.add(mapImageLayer)
          map.add(this.townLayer)
          this.mapview.on('click', evt => {
            this.mapview.hitTest(evt).then(res => {
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
                this.mapview.graphics.removeAll()// 清除上一次点击目标
                this.mapview.graphics.add(graphic)// 添加新的点击目标
              }
            })
          })
        }, reason => {
          console.log(reason)
        })
    },
    showFeatureLayer (villageLayer, mapview, isShow) {
      mapview.whenLayerView(villageLayer)
        .then(function (layerView) {
          villageLayer.visible = isShow
        })
        .otherwise(function (error) {
          // An error occurred during the layerview creation
          console.log(error)
        })
    }
  }
}
</script>

<style>
  @import url('https://js.arcgis.com/4.7/dijit/themes/tundra/tundra.css');
  @import url('https://js.arcgis.com/4.7/esri/css/main.css');
   #viewDiv {
    position: absolute;
    top: 0;
    /* bottom: 0; */
    left: 0;
    right: 0;
    min-height: 100vh;
 }
</style>
