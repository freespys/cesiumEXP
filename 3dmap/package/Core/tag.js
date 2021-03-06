/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-09-19 09:10:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-11-20 18:21:05
 */

import HTML from './html.js';
var TAG = {};
let WMS_URL =  "https://www.ncei.noaa.gov/thredds/wms/gfs-004-files/201809/20180916/gfs_4_20180916_0000_000.grb2";
//插件
TAG.EARTHTAG = ["geocoder","homeButton","sceneModePicker","baseLayerPicker","navigationHelpButton","animation","timeline","fullscreenButton","vrButton","infoBox","selectionIndicator"];
//底图
TAG.BASELAYER = {
    OFFLINEIMAGERY : function(){
        return Cesium.createTileMapServiceImageryProvider({url : Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')});
    } ,
    GOOGLEIMAGERY :function(){
        return new Cesium.UrlTemplateImageryProvider({url: "http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali"})
    },
    BAIDUIMAGERY :function(){
        return new Cesium.UrlTemplateImageryProvider({url: "https://ss1.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/tile/?qt=vtile&x={x}&y={y}&z={z}&styles=pl&udt=20180810&scaler=1&showtext=1"})
    },
    ARCGISIMAGERY:function(){
        return new Cesium.ArcGisMapServerImageryProvider({
            url : '//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
        });
    },
    WMSRainfall:function(){
        return new Cesium.WebMapServiceImageryProvider({
            url:WMS_URL,
            layers: 'Precipitable_water_entire_atmosphere_single_layer',
            parameters: {
                ColorScaleRange: '0.1,66.8'
            }
        });
    },
    WMSAirPressure:function(){
        return new Cesium.WebMapServiceImageryProvider({
            url: WMS_URL,
            layers: "Pressure_surface",
            parameters: {
                ColorScaleRange:'51640,103500'
            }
        });
    },
    WMSTemperature:function(){
        return new Cesium.WebMapServiceImageryProvider({
            url: WMS_URL,
            layers: "Temperature_surface",
            parameters: {
                ColorScaleRange:  '204.1,317.5'
            }
        });
    },
    WMSWindSpeed:function(){
        return new Cesium.WebMapServiceImageryProvider({
            url: WMS_URL,
            layers: "Wind_speed_gust_surface",
            parameters: {
                ColorScaleRange: '0.1095,35.31'
            }
        });
    },
}
//星空背景
TAG.SKYBOX = {
    default:function(){
        return new Cesium.SkyBox({//用于渲染星空的SkyBox对象
            sources : {
              positiveX : '../Build/Cesium/Assets/Textures/SkyBox/tycho2t3_80_px.jpg',
              negativeX : '../Build/Cesium/Assets/Textures/SkyBox/tycho2t3_80_mx.jpg',
              positiveY : '../Build/Cesium/Assets/Textures/SkyBox/tycho2t3_80_py.jpg',
              negativeY : '../Build/Cesium/Assets/Textures/SkyBox/tycho2t3_80_my.jpg',
              positiveZ : '../Build/Cesium/Assets/Textures/SkyBox/tycho2t3_80_pz.jpg',
              negativeZ : '../Build/Cesium/Assets/Textures/SkyBox/tycho2t3_80_mz.jpg'
            }
        });
    },
    customStyle : function(){
        return new Cesium.SkyBox({//用于渲染星空的SkyBox对象
            sources : {
              positiveX : '../Build/Cesium/Assets/Textures/SkyBox/00h+00.jpg',
              negativeX : '../Build/Cesium/Assets/Textures/SkyBox/12h+00.jpg',
              positiveY : '../Build/Cesium/Assets/Textures/SkyBox/06h+00.jpg',
              negativeY : '../Build/Cesium/Assets/Textures/SkyBox/18h+00.jpg',
              positiveZ : '../Build/Cesium/Assets/Textures/SkyBox/06h+90.jpg',
              negativeZ : '../Build/Cesium/Assets/Textures/SkyBox/06h-90.jpg'
            }
        });
    },
    customStyle2 : function(){
        return new Cesium.SkyBox({//用于渲染星空的SkyBox对象
            sources : {
                positiveX: '../Build/Cesium/Assets/Textures/SkyBox/Version2_dark_px.jpg',
                negativeX: '../Build/Cesium/Assets/Textures/SkyBox/Version2_dark_mx.jpg',
                positiveY: '../Build/Cesium/Assets/Textures/SkyBox/Version2_dark_py.jpg',
                negativeY: '../Build/Cesium/Assets/Textures/SkyBox/Version2_dark_my.jpg',
                positiveZ: '../Build/Cesium/Assets/Textures/SkyBox/Version2_dark_pz.jpg',
                negativeZ: '../Build/Cesium/Assets/Textures/SkyBox/Version2_dark_mz.jpg'
             }
        });
    }
}
//地形
TAG.TERRAIN = {
        ArcGISTerrain : function(core){
            core.layerManager.Terrain.build({'type':'','terrain':createArcGisElevation3DTerrainProvider(Cesium)});
        },
        WorldTerrain:function(core){
            core.layerManager.Terrain.build({'type':'','terrain': new Cesium.createWorldTerrain({           
                requestWaterMask:true,           
                requestVertexNormals:true       
            })});
        }
}
//关闭地下
TAG.underground = function(core){
    var handler = new Cesium.ScreenSpaceEventHandler(core.scene.canvas);
	var flags = {
		// Mouse
		leftDown : false,
		middleDown : false,
		rightDown : false,

		annotate : false
    };
    console.log(123);
	handler.setInputAction(function(movement) {
		flags.leftDown = true;
	}, Cesium.ScreenSpaceEventType.LEFT_DOWN);

	handler.setInputAction(function(movement) {
		flags.middleDown = true;
	}, Cesium.ScreenSpaceEventType.MIDDLE_DOWN);

	handler.setInputAction(function(movement) {
		flags.rightDown = true;
	}, Cesium.ScreenSpaceEventType.RIGHT_DOWN);

	handler.setInputAction(function(movement) {
		flags.leftDown = false;
	}, Cesium.ScreenSpaceEventType.LEFT_UP);

	handler.setInputAction(function(movement) {
		flags.middleDown = false;
	}, Cesium.ScreenSpaceEventType.MIDDLE_UP);

	handler.setInputAction(function(movement) {
		flags.rightDown = false;
	}, Cesium.ScreenSpaceEventType.RIGHT_UP);

	document.addEventListener('keyup', function(e) {
		if (e.keyCode === 'W'.charCodeAt(0)) {
			flags.annotate = !flags.annotate;
		}
	}, false);
	// Highlight feature on mouse over
	handler.setInputAction(function(movement) {
		if (flags.leftDown || flags.middleDown || flags.rightDown) {
			// Don't highlight when panning and zooming
			return;
		}
	}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
}

export {TAG}
