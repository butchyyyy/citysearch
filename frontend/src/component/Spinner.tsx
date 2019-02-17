import React from "react"

import "style/Spinner.less"

interface Props {
  /** If true, spinner animation and blocking mask will show over the wrapped elements */
  loading: boolean
  /** Wrapped elements to show spinner and blocking mask on when loading === true */
  children?: any
}

/**
 * UX class that shows spinner animation when e.g. an async action is fetching data
 */
const Spinner = (props: Props) => (
    <>
      {props.loading &&
      <div className="spinner">
        <div className="rect1" />
        <div className="rect2" />
        <div className="rect3" />
        <div className="rect4" />
        <div className="rect5" />
      </div>}
      <div className={props.loading ? "mask" : null}>{props.children}</div>
    </>
)

export default Spinner
