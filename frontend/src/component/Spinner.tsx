import React from "react"

import "style/Spinner.less"

interface Props {
  loading: boolean
  children?: any
}

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
