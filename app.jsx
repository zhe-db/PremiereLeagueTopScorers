//  var xhr = new XMLHttpRequest();
//  var api_key = "IYR6N9pHF64bBu4NkEU2a7ytVpLg6U282_SEefpG";
//  var url = "https://dugout.statsfc.com/api/v1/competitions";
//  xhr.onreadystatechange = function (){
//    if(xhr.readyState === 4) {
//        get_player(responseText);
//    }
//  };
//  xhr.open('get', url); 
//  xhr.setRequestHeader('X-StatsFC-Key', api_key);
//  xhr.send()
  function get_player(res){
     console.log(res);
  }
  
  var PLAYERS = [
  {
    name: "Romelu Lukaku",
    score: 24,
    id: 1,
  },
  {
    name: "Harry Kane",
    score: 21,
    id: 2,
  },
  {
    name: "Alexis Sánchez",
    score: 19,
    id: 3,
  },
    {
    name: "Diego Costa",
    score: 19,
    id: 4,
  },
    {
    name: "Sergio Agüero",
    score: 18,
    id: 5,
  },
    {
    name: "Zlatan Ibrahimovic",
    score: 17,
    id: 6,
  },
    {
    name: "Dele Alli",
    score: 17,
    id: 7,
  },
    {
    name: "Eden Hazard",
    score: 15,
    id: 8,
  },
     {
    name: "Joshua King",
    score: 15,
    id: 9,
  },
     {
    name: "Jermain Defoe",
    score: 15,
    id: 10,
  },
     {
    name: "Christian Benteke",
    score: 14,
    id: 11,
  },
];
    var nextId = 12;
  var AddPlayerForm = React.createClass({
      propTypes: {
        onAdd: React.PropTypes.func.isRequired,
    },
      getInitialState: function(){
        return {
          name:"",
      };
    },
      onSubmit: function(e){
        e.preventDefault();
        this.props.onAdd(this.state.name);
        this.setState({name:""});
    },
    onNameChange:function(e){
        console.log(e.target.value);
        this.setState({name: e.target.value})
    },
      render: function(){
          return (
            <div className="add-player-form">
              <form onSubmit={this.onSubmit}>
                <input type="text" value={this.state.name} onChange={this.onNameChange}/>
                <input type="submit" value = "add a Player"/>
              </form>
            </div>
          )
     }
    })
  function Stats(props){
      var totalPlayers = props.players.length;
      var totalPoints = props.players.reduce(function(total, player){
        return total + player.score;
      }, 0)
      return (
        <table className = "stats">
           <tbody>
              <tr>
                <td>Players:</td>
                <td>{totalPlayers}</td>
              </tr>
              <tr>
                <td>Total goals:</td>
                <td>{totalPoints}</td>
              </tr>
           </tbody>
        </table>
      )
    }
   Stats.propTypes = {
      players: React.PropTypes.array.isRequired,
    };
  function Header (props){
      return (
        <div className="header">
          <Stats players={props.players}/>
          <h1>{props.title}</h1>
        </div>
      );
    }
    Header.propTypes = {
      title: React.PropTypes.string.isRequired,
      players: React.PropTypes.array.isRequired,
    };
 
    function Counter(props){
      return (
          <div className="counter">
          <button className="counter-action decrement" onClick={function(){props.onChange(-1)}}> - </button>
          <div className="counter-score"> {props.score} </div>
          <button className="counter-action increment" onClick={function(){props.onChange(1)}}> + </button>
          </div>
    
    );
    }
    Counter.PropTypes = {
      score:React.PropTypes.number.isRequired,
      onChange: React.PropTypes.func.isRequired,
    }
    function Player(props){
      return (
          <div className="player">
              <div className="player-name">
                <a className="remove-player" onClick={props.onRemove}>x</a>
                {props.name}
              </div>
              <div className="player-score">
               <Counter score={props.score} onChange={props.onScoreChange}/>
              </div>
          </div>
      );
    };
    Player.propTypes = {
      name : React.PropTypes.string.isRequired,
      score : React.PropTypes.number.isRequired,
      onScoreChange: React.PropTypes.func.isRequired,
      onRemove: React.PropTypes.func.isRequired,
    };
    var Application = React.createClass({
        propTypes:{
          title: React.PropTypes.string,
          initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
          name: React.PropTypes.string.isRequired,
          score: React.PropTypes.number.isRequired,
          id: React.PropTypes.number.isRequired,
          })).isRequired,  
        },
        getDefaultProps: function(){
          return {
            title: "Premiere League Top Scorers",
          }
        },
        getInitialState: function(){
          return {
            players: this.props.initialPlayers,
          };
        },
        onScoreChange : function (index, delta){
            this.state.players[index].score += delta;
            this.setState(this.state);
            console.log(delta);
        },
        onPlayerAdd:function(name){
         this.state.players.push({
            name:name,
            score:0,
            id:nextId,
         });
          this.setState(this.state);
          nextId++;
        },
        onRemovePlayer: function(index){
          // console.log(index);
          this.state.players.splice(index,1);
          this.setState(this.state);
        },
        render: function() {
          return (
            <div className="scoreboard">
              <Header title={this.props.title} players={this.state.players} />
              <div className="players">
                {this.state.players.map(function(player, index){
                  return (
                    <Player  onScoreChange = {function(delta) {this.onScoreChange(index, delta)}.bind(this)}
                                  name= {player.name}
                                  onRemove={function(){this.onRemovePlayer(index)}.bind(this)}
                                  score = {player.score} 
                                  key = {player.id}/>
                                         )
                }.bind(this))} 
              </div>
              <AddPlayerForm onAdd={this.onPlayerAdd}/>
          </div>
          )
      }
    })
ReactDOM.render(<Application initialPlayers = {PLAYERS} />, document.getElementById('container'));