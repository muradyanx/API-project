import React, {useEffect, memo} from "react";

const Box = (props) => {

  useEffect(() => {
    console.log(props)
  }, [props])
  return <div>
    <h1>{props.title}</h1>
    <p>{props.description}</p>
  </div>
}
export default memo(Box)