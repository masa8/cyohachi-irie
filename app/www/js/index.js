/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        var sw = L.latLng(34.734842,138.768311),
         ne = L.latLng(34.758538,138.790283),
        bounds = L.latLngBounds(sw,ne);
        var map = L.map('map', {center: [34.748779,138.776575], zoom: 17, touchZoom: false, maxBounds: bounds});
        
        L.tileLayer('./img/map/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                    maxZoom: 18,
                    minZoom: 15
                    }).addTo(map);
        
        
        
        //
        var data  = [{
                     "type": "Feature",
                     "properties":{
                        "title":"伊豆の長八美術館",
                        "desc":"",
                        "image":"img/art.jpg"},
                     "geometry": {
                        "type": "Point",
                        "coordinates":[138.776575,34.748779]
                        }
                     },
                     {
                     "type": "Feature",
                     "properties":{
                     "title":"長八記念館",
                     "desc":"",
                     "image":"img/kinen.jpg"},
                     "geometry": {
                     "type": "Point",
                     "coordinates":[138.776804,34.749592]
                     }},
                     {
                     "type": "Feature",
                     "properties":{
                     "title":"伊豆文邸足湯",
                     "desc":"",
                     "image":"img/ashiyu.jpg"},
                     "geometry": {
                     "type": "Point",
                     "coordinates":[138.776394,34.749823]
                     }},
                     {
                     "type": "Feature",
                     "properties":{
                     "title":"伊豆文邸",
                     "desc":"",
                     "image":"img/buntei.jpg"},
                     "geometry": {
                     "type": "Point",
                     "coordinates":[138.776172,34.749879]
                     }},
                     {
                     "type": "Feature",
                     "properties":{
                     "title":"ときわ大橋",
                     "desc":"",
                     "image":"img/hashi.jpg"},
                     "geometry": {
                     "type": "Point",
                     "coordinates":[138.777808,34.751386]
                     }},
                     {
                     "type": "Feature",
                     "properties":{
                     "title":"なまこ壁通り",
                     "desc":"",
                     "image":"img/street.jpg"},
                     "geometry": {
                     "type": "Point",
                     "coordinates":[138.777712,34.750357]
                     }},
                     {
                     "type": "Feature",
                     "properties":{
                     "title":"明治商家中瀬邸",
                     "desc":"",
                     "image":"img/nakase.jpg"},
                     "geometry": {
                     "type": "Point",
                     "coordinates":[138.777792,34.751699]
                     }},
                     {
                     "type": "Feature",
                     "properties":{
                     "title":"岩科学校",
                     "desc":"",
                     "image":"img/gakkou.jpg"},
                     "geometry": {
                     "type": "Point",
                     "coordinates":[138.786205,34.736514]
                     }




                     }
                     ];
        
        L.Icon.Default.imagePath = 'css/images';
        var geo_layer = L.geoJson(data,{ onEachFeature:function(f,l){
                                l.bindPopup(
                                           f.properties.title);
                                l.on("click",function(){
                                               document.getElementById("title").innerText = f.properties.title;
                                               document.getElementById("description").innerText = f.properties.desc;
                                               document.getElementById("image").setAttribute("src",f.properties.image);
                                     
                                     });
                  
                  $("#midokoro").append('<li lng="'+ f.geometry.coordinates[0] + '" lat="' + f.geometry.coordinates[1] + '" ><a href="#"  >' + f.properties.title + '</a></li>').listview().listview('refresh');

                                    
                                  }});
        geo_layer.addTo(map);
        
        
        // Click on the List in Side panel
        $(document).on("click", '#midokoro  li', function(event) {
                       $("#midokoro_panel").panel("close");
                       var selected = L.latLng($(this).attr("lat"),$(this).attr("lng"));
                       map.panTo(selected);
                       geo_layer.eachLayer(function(marker){
                       if ( marker.getLatLng().equals( selected )){
                                           marker.fire('click');
                        }
                                           
                                           });
         }
        );
    
    }

};

app.initialize();