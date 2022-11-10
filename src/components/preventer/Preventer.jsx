import { Component } from "react";


class Preventer extends Component {
    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        if(this.state.error) {
            return <h2>ERROR COMPONENT</h2>
        }

        return this.props.children
    }
}

export default Preventer