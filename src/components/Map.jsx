import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import React, { Component } from 'react'

class Map extends Component {
    render(props) {
        return (
            <div>
                <GoogleMap
                    defaultZoom={10}
                    defaultCenter={{ lat: 29.760, lng: -95.369 }}
                >
                    <Marker position={{ lat: 29.760, lng: -95.369 }} />
                </GoogleMap>
            </div>
        )
    }
}


// class Map extends React.PureComponent {
//   state = {
//     isMarkerShown: false,
//   }

//   componentDidMount() {
//     this.delayedShowMarker()
//   }

//   delayedShowMarker = () => {
//     setTimeout(() => {
//       this.setState({ isMarkerShown: true })
//     }, 3000)
//   }

//   handleMarkerClick = () => {
//     this.setState({ isMarkerShown: false })
//     this.delayedShowMarker()
//   }

//   render() {
//     return (
//       <MyMapComponent
//         isMarkerShown={this.state.isMarkerShown}
//         onMarkerClick={this.handleMarkerClick}
//       />
//     )
//   }
// }

export default withScriptjs(withGoogleMap(Map));