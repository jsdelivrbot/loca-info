import React from 'react';

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
      <div>
          <div>
              지역이름: <input onChange={this.handleChange}/>
          </div>
          <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    );
  }
}
