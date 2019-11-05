<template>
    <d2-container>
        <div  style="position: absolute; left: 50px; top: 20px; width: 200px; height: auto; z-index: 99;padding: 10px;">
          <el-input v-model="searchName"></el-input>
        </div>
        <div  style="position: absolute; left: 280px; top: 20px; width: 200px; height: auto; z-index: 99;padding: 10px;">
         <el-button type="primary" @click="querySearch">搜索</el-button>
        </div>
        <!-- <div  style="position: absolute; right: 280px; top: 20px; width: 200px; height: auto; z-index: 99;padding: 10px;">
         <el-button type="primary" @click="showChart">农用地面积统计</el-button>
        </div> -->
        <div id="viewDiv">
        </div>
        <div id="newmap"></div>
        <div  style="position: absolute; left: 10px; bottom: 20px; border: 1px solid #9c9c9c; background: #fff; width: 200px; height: auto; z-index: 99;padding: 10px;">
          <ul style="list-style:none">
            <li v-for="(item,index) in layerList" :key="item.id">
              <el-checkbox :label="item.name" @change="showLayer(index)" v-model="item.status">{{ item.name }}</el-checkbox>
            </li>
          </ul>
        </div>
        <div v-if='isHide'>
          <div class="inner" >
              <ve-pie :data="chartData" :settings="chartSettings" :legend-visible="false"></ve-pie>
          </div>
          <div class="inner1">
              <ve-pie :data="chartData2" :settings="chartSettings" :legend-visible="false"></ve-pie>
          </div>
          <div class="inner2" >
            <ve-pie :data="chartData3" :settings="chartSettings1" :legend-visible="false"></ve-pie>
          </div>
          <div class="inner3" >
            <ve-pie :data="chartData4" :settings="chartSettings1" :legend-visible="false"></ve-pie>
          </div>
          <div class="inner4" >
            <ve-pie :data="chartData5" :settings="chartSettings1" :legend-visible="false"></ve-pie>
          </div>
        </div>
    </d2-container>
</template>

<script>
import esriLoader from 'esri-loader'
import list from '@/views/demo/charts/list/_mixin/list.js'
export default {
  mixins: [
    list
  ],
  data () {
    return {
      ClassA: 'piechartHide',
      isHide: false,
      isShow: false,
      chartSettings: {
        radius: 50,
        label: {
          show: false
        }
      },
      chartSettings1: {
        radius: 30,
        label: {
          show: false
        }
      },
      chartSettings2: {
        radius: 20,
        label: {
          show: false
        }
      },
      searchName: '',
      chartData: {
        columns: ['operatorType', 'proportion'],
        rows: [
          { 'operatorType': '个体经营者', 'proportion': 1393 },
          { 'operatorType': '集体经营者', 'proportion': 3530 },
          { 'operatorType': '租凭经营者', 'proportion': 2923 }
        ]
      },
      chartData2: {
        columns: ['operatorType', 'proportion'],
        rows: [
          { 'operatorType': '个体经营者', 'proportion': 2345 },
          { 'operatorType': '集体经营者', 'proportion': 4567 },
          { 'operatorType': '租凭经营者', 'proportion': 2378 }
        ]
      },
      chartData3: {
        columns: ['operatorType', 'proportion'],
        rows: [
          { 'operatorType': '个体经营者', 'proportion': 346 },
          { 'operatorType': '集体经营者', 'proportion': 3456 },
          { 'operatorType': '租凭经营者', 'proportion': 567 }
        ]
      },
      chartData4: {
        columns: ['operatorType', 'proportion'],
        rows: [
          { 'operatorType': '个体经营者', 'proportion': 3789 },
          { 'operatorType': '集体经营者', 'proportion': 2345 },
          { 'operatorType': '租凭经营者', 'proportion': 289 }
        ]
      },
      chartData5: {
        columns: ['operatorType', 'proportion'],
        rows: [
          { 'operatorType': '个体经营者', 'proportion': 1456 },
          { 'operatorType': '集体经营者', 'proportion': 2345 },
          { 'operatorType': '租凭经营者', 'proportion': 1567 }
        ]
      },
      layerList: [{
        id: '0',
        name: '未退出承包地',
        status: true
      }, {
        id: '1',
        name: '已退出承包地',
        status: true
      },
      {
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
            fieldName: 'OBJECTID',
            label: '地块编号',
            format: {
              places: 0,
              digitSeparator: true
            }
          }, {
            fieldName: 'cstral_no',
            label: '地籍号',
            format: {
              places: 0,
              digitSeparator: true
            }
          }, {
            fieldName: 'loc_no',
            label: '位置编号',
            format: {
              places: 0,
              digitSeparator: true
            }
          }, {
            fieldName: 'plot_name',
            label: '地块名称',
            format: {
              places: 0,
              digitSeparator: true
            }
          }, {
            fieldName: 'land_type',
            label: '土地性质',
            format: {
              places: 0,
              digitSeparator: true
            }
          }, {
            fieldName: 'land_use',
            label: '土地利用类型',
            format: {
              places: 0,
              digitSeparator: true
            }
          }, {
            fieldName: 'land_level',
            label: '土地等级',
            format: {
              places: 0,
              digitSeparator: true
            }
          }
          // }, {
          //   fieldName: 'land_level',
          //   label: '水产养殖面积',
          //   format: {
          //     places: 0,
          //     digitSeparator: true
          //   }
          // }, {
          //   fieldName: 'land_level',
          //   label: '村集体经营建设用地面积',
          //   format: {
          //     places: 0,
          //     digitSeparator: true
          //   }
          // }, {
          //   fieldName: 'land_level',
          //   label: '全村宅基地面积',
          //   format: {
          //     places: 0,
          //     digitSeparator: true
          //   }
          // }
          ]
        }]
      },
      townTemplate: {
        title: '土地经营者类型',
        content: [{
          type: 'fields',
          fieldInfos: [{
            fieldName: 'xzmc',
            label: '镇名',
            format: {
              places: 0,
              digitSeparator: true
            }
          }, {
            fieldName: 'cstral_no',
            label: '所在村',
            format: {
              places: 0,
              digitSeparator: true
            }
          }, {
            fieldName: 'FID',
            label: '年末全村耕地面积',
            value: '100',
            format: {
              places: 0,
              digitSeparator: true
            }
          }, {
            fieldName: 'OBJECTID',
            label: '高标准农田面积',
            format: {
              places: 0,
              digitSeparator: true
            }
          }, {
            fieldName: 'SHAPE_Leng',
            label: '设施农业占地面积',
            format: {
              places: 0,
              digitSeparator: true
            }
          }, {
            fieldName: 'SHAPE_Area',
            label: '粮食播种面积',
            format: {
              places: 0,
              digitSeparator: true
            }
          }, {
            fieldName: 'land_level',
            label: '蔬菜播种面积',
            format: {
              places: 0,
              digitSeparator: true
            }
          }, {
            fieldName: 'land_level',
            label: '水产养殖面积',
            format: {
              places: 0,
              digitSeparator: true
            }
          }, {
            fieldName: 'land_level',
            label: '村集体经营建设用地面积',
            format: {
              places: 0,
              digitSeparator: true
            }
          }, {
            fieldName: 'land_level',
            label: '全村宅基地面积',
            format: {
              places: 0,
              digitSeparator: true
            }
          }]
        }]
      },
      exitContractLayer: Object,
      townLayer: Object,
      villageLayer: Object,
      notExitContractLayer: Object,
      curContractLayer: Object,
      mapview: Object,
      Extent: Object,
      Graphic: Object
    }
  },
  computed: {
    showChartSet: {
      get: function () {
        return this.isHide
      },
      set: function (val) {
        this.isHide = val
      }
    }
  },
  mounted () {
    this.importEsri()
    // createMap(esriLoader, this.popupTemplate)
  },
  methods: {
    showChart () {
      // this.ClassA = 'piechartShow'
      this.isHide = true
      // this.isShow = true
      // this.showChartSet = false
      console.log(this.isHide)
    },
    querySearch () {
      const query = this.notExitContractLayer.createQuery()
      query.where = 'name=\'' + this.searchName + '\''
      query.outFields = ['*']
      query.returnGeometry = true
      this.notExitContractLayer.queryFeatures(query).then(res => {
        const extent = res.features[0].geometry.extent
        this.mapview.graphics.removeAll()
        var features = res.features.map(function (graphic) {
          graphic.symbol = {
            type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
            style: 'diamond',
            size: 6.5,
            color: 'darkorange'
          }
          return graphic
        })
        console.log(features)
        this.mapview.graphics.add(features[0])
        // res.features.map(graphic => {
        //   return graphic
        // })
        this.mapview.extent = new this.Extent({
          xmin: extent.xmin,
          ymin: extent.ymin,
          xmax: extent.xmax,
          ymax: extent.ymax,
          spatialReference: {
            wkid: 4326
          }
        })
      }).catch(err => {
        console.log(err)
      })
    },
    showLayer (index) {
      let status = this.layerList[index].status
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
        'esri/tasks/support/Query',
        'esri/Graphic',
        'esri/WebMap',
        'esri/core/watchUtils',
        // '@assets/echarts',
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
          FeatureLayer,
          Query,
          Graphic,
          WebMap, watchUtils
          // Echarts3Layer
        ]) => {
          const map = new Map({
            basemap: 'topo'
          })
          this.Extent = Extent
          this.Graphic = Graphic
          // eslint-disable-next-line no-unused-vars
          this.notExitContractLayer = new FeatureLayer({
            url: 'http://47.100.207.237:6080/arcgis/rest/services/mine/szland2/MapServer/0',
            id: 'notExitContractLayer',
            outFields: ['*'],
            popupTemplate: this.popupTemplate
          })
          this.exitContractLayer = new FeatureLayer({
            url: 'http://47.100.207.237:6080/arcgis/rest/services/mine/szland2/MapServer/1',
            id: 'exitContractLayer',
            outFields: ['*'],
            popupTemplate: this.popupTemplate
          })

          this.curContractLayer = new FeatureLayer({
            url: 'http://47.100.207.237:6080/arcgis/rest/services/mine/szland2/MapServer/2',
            id: 'exitContractLayer',
            outFields: ['*'],
            popupTemplate: this.popupTemplate
          })

          this.villageLayer = new FeatureLayer({
            url: 'http://47.100.207.237:6080/arcgis/rest/services/mine/szland2/MapServer/3',
            id: 'exitContractLayer',
            outFields: ['*'],
            popupTemplate: this.popupTemplate
          })

          this.townLayer = new FeatureLayer({
            url: 'http://47.100.207.237:6080/arcgis/rest/services/mine/szland2/MapServer/4',
            id: 'initlayer',
            outFields: ['*'],
            popupTemplate: this.townTemplate
          })

          // eslint-disable-next-line no-unused-vars
          const mapImageLayer = new MapImageLayer({
            url: 'http://47.100.207.237:6080/arcgis/rest/services/mine/szland2/MapServer'
          })
          // eslint-disable-next-line no-unused-vars
          this.mapview = new MapView({
            container: 'viewDiv',
            map: map,
            zoom: 6,
            center: [120.2147147, 31.35579237]
          })
          this.mapview.extent = new this.Extent({
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
          watchUtils.whenTrue(this.mapview, 'stationary', () => {
            console.log(this.mapview.extent)
          })
          this.mapview.on('click', evt => {
            this.mapview.hitTest(evt).then(res => {
              console.log(res)
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
.inner {
  position: absolute;
  top: 180px;
  /* right:  20px;
  bottom: 20px; */
  left: 200px;
  width: 130px;
  height: 50px;
}
.inner1 {
  position: absolute;
  top: 80px;
  left: 550px;
  width: 130px;
  height: 50px;
}
.inner2 {
  position: absolute;
  top: 200px;
  left: 550px;
  width: 130px;
  height: 50px;
}
.inner3 {
  position: absolute;
  top: 130px;
  left: 750px;
  width: 130px;
  height: 50px;
}
.inner4 {
  position: absolute;
  top: 310px;
  left: 870px;
  width: 130px;
  height: 50px;
}
.piechartShow {
  display: inline;
}

.piechartHide {
  display: none;
}
</style>
