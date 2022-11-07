import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { getDistance } from "geolib";

const Pracpost = ({ post }) => {
  const [Myaddress, SetMyaddress] = useState();
  const [placeAdress, SetplaceAdress] = useState();
  const { kakao } = window;
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(position) {
    //현재 위치를 state값으로
    SetMyaddress({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }

  function error(err) {
    console.warn("ERROR(" + err.code + "): " + err.message);
  }

  //내 현재위치 위도경도
  console.log(Myaddress);

  var geocoder = new kakao.maps.services.Geocoder();

  var callback = function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      console.log(result[0].x, result[0].y);
      console.log(Myaddress);
      console.log(
        getDistance(
          { latitude: result[0].y, longitude: result[0].x },
          {
            latitude: Myaddress.latitude,
            longitude: Myaddress.longitude,
          }
        )
      );
      const distance = getDistance(
        { latitude: result[0].y, longitude: result[0].x },
        {
          latitude: Myaddress.latitude,
          longitude: Myaddress.longitude,
        }
      );
      SetplaceAdress(distance);
    }
  };

  //찾고자하는 주소의 위도와 경도
  console.log(placeAdress);
  const onSearchNearPlace = () => {
    geocoder.addressSearch(post.location, callback);
    console.log(post.location);
    console.log(placeAdress);
  };

  const asd = () => {};

  useEffect(() => {
    geocoder.addressSearch(post.location, callback);
    navigator.geolocation.getCurrentPosition(success, error, options);
    // console.log(placeAdress[0]?.x, placeAdress[0]?.y);
  }, []);

  useEffect(() => {
    if (post?.address) {
      const container = document.getElementById("myMap");
      const options = {
        center: new kakao.maps.LatLng(35.12, 129.1),
        level: 3,
      };
      // 지도를 생성합니다.

      const map = new kakao.maps.Map(container, options);
      // 주소-좌표 변환 객체를 생성합니다.

      // function locationLoadSuccess(pos) {
      //   // 현재 위치 받아오기
      //   var currentPos = new kakao.maps.LatLng(
      //     pos.coords.latitude,
      //     pos.coords.longitude
      //   );
      //   console.log(currentPos);
      //   // 지도 이동(기존 위치와 가깝다면 부드럽게 이동)
      //   map.panTo(currentPos);

      //   // 마커 생성
      //   var marker = new kakao.maps.Marker({
      //     position: currentPos,
      //   });

      //   // 기존에 마커가 있다면 제거
      //   marker.setMap(null);
      //   marker.setMap(map);
      // }
      // locationLoadSuccess();
      const geocoder = new kakao.maps.services.Geocoder();
      // 주소로 좌표를 검색합니다..
      geocoder.addressSearch(post?.address, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow = new kakao.maps.InfoWindow({
            content:
              '<div style="width:150px;color:red;text-align:center;padding:6px 0;">이런식으로 텍스트추가 가능</div>',
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      });
    }
  }, []);
  return (
    <div>
      {}
      <button onClick={() => onSearchNearPlace()}>{post.location}</button>
    </div>
  );
};

export default Pracpost;
