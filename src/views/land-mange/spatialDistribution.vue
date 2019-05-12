<template>
    <d2-container>
        <div id="viewDiv"></div>
        <div id="newmap"></div>
    </d2-container>
</template>

<script>
import esriLoader from 'esri-loader'
import { createMap } from './esriMap.js'
export default {
  data () {
    return {
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
        }]
      }
    }
  },
  mounted () {
    createMap(esriLoader, this.popupTemplate)
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
