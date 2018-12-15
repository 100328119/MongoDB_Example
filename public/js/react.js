var Ninjas = React.createClass({
        getInitialState: function(){
            return({
                ninjas: []
            });
        },
        render: function(){
            var ninjas = this.state.ninjas;
            ninjas = ninjas.map(function(ninja, index){
              // console.log(ninja);
              // console.log(index);
              // console.log(ninja.name);
              //console.log(ninja.dist);
                return(

                    <li key={index}>
                        <span className={ninja.available}></span>
                        <span className="name">{ninja.name}</span>
                        <span className="rank">{ninja.rank}</span>
                        <span className="dist">{ninja.dist.calculated} km</span>
                    </li>
                );
            });
            return(
                <div id="ninja-container">
                    <form id="search" onSubmit={this.handleSubmit}>
                        <label>Enter your Latitude:</label>
                        <input type="text" ref="lat" placeholder="latitude" required />
                        <label>Enter your Longitude:</label>
                        <input type="text" ref="lng" placeholder="longitude" required />
                        <input type="submit" value="Find Ninjas" />
                    </form>
                    <ul>{ninjas}</ul>
                </div>
            );
        },
        handleSubmit: function(e){
            e.preventDefault();
            var lng = this.refs.lng.value;
            var lat = this.refs.lat.value;
            fetch('/api/ninjas?lng=' + lng + '&lat=' + lat).then(function(data){
                return data.json();
            }).then( json => {
                this.setState({
                    ninjas: json
                });
                console.log(json);
            });
        }
    });
    ReactDOM.render(<Ninjas />, document.getElementById('ninjas'));
