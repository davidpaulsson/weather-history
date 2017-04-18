import React from 'react';
import View from 'react-native';

class Gradient extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Gradient';
    }

    render() {
        return <View>{this.props.child}</View>;
    }
}

export default Gradient;
