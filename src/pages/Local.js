import React from 'react';
import "./Local.scss";
import { Z_DEFAULT_COMPRESSION } from 'zlib';

export default class Local extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
        word: "",
        result: []
    }

    fetch("/allData")
        .then(res => res.json())
        .then(json => {
            this.setState({result: json.RealtimeCityAir.row})
        })

  }

  componentDidMount(){
    console.log("## componentDidMount");
    navigator.geolocation.getCurrentPosition(position => {
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new daum.maps.LatLng(position.coords.latitude, position.coords.longitude), //지도의 중심좌표.
            level: 4 //지도의 레벨(확대, 축소 정도)
        };
        this.map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴      
    }, err => {
        alert(err.message)
    })
  }


  componentDidUpdate(){
    const geocoder = new daum.maps.services.Geocoder();
    geocoder.addressSearch(this.state.word, (result, status) => {
        if (status === daum.maps.services.Status.OK) {
            this.map.setCenter(new daum.maps.LatLng(result[0].y, result[0].x));
        }
    });      
      
  }

  handleChange(e){
    this.setState({
        word: e.target.value
    });
  }

  render() {
    console.log("Local render");

    const result = this.state.word ?
                this.state.result.filter(o => RegExp(this.state.word).test(o.MSRSTE_NM)) :
                "지역명을 입력해 보세요(ex, 서대문구)"
  
    return (
      <div className="local">
          <div>
              지역이름: <input onChange={this.handleChange}/>
          </div>
          <div id="map" className="map">Loading..</div>
          <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    );
  }
}
