import React from 'react'
import { connect } from 'react-redux'
import './Loader.less'

function GlobalLoader(props) {
    return (
        <div
            className={
                props.Loader.activeLoaderType1 > 0
                    ? 'loader-wrapper vsbl'
                    : 'loader-wrapper nt-vsbl'
            }
        >
            <div id="loader_bar">
                <b></b>
                <i></i>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    Loader: state.Loader,
})

export default connect(mapStateToProps, {})(GlobalLoader)
