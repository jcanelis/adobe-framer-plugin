import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { addPropertyControls, ControlType } from "framer"

// Custom
import Search from "./search"
import { Props } from "./props"

export default function AdobeStock(props: Props) {
  const {
    age,
    height,
    illustrations,
    orientation,
    people,
    premium,
    randoText,
    style,
    value,
    width,
  } = props

  const [image, setImage] = useState("")

  const getData = async (props: Props) => {
    try {
      const data: string = await Search(props)
      setImage(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData(props)
  }, [
    props.value,
    props.people,
    props.premium,
    props.age,
    props.orientation,
    props.illustrations,
  ])

  return (
    <motion.div
      style={{
        width: width,
        height: height,
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...style,
      }}
    ></motion.div>
  )
}

AdobeStock.defaultProps = {
  age: "all",
  height: 300,
  illustrations: false,
  orientation: "Standard",
  people: false,
  premium: false,
  width: 300,
  value: "coffee",
}

addPropertyControls(AdobeStock, {
  value: { type: ControlType.String, title: "Search" },
  people: { type: ControlType.Boolean, title: "People" },
  premium: { type: ControlType.Boolean, title: "Premium" },
  illustrations: { type: ControlType.Boolean, title: "Illustrations" },
  orientation: {
    type: ControlType.Enum,
    title: "Orientation",
    options: ["All", "Horizontal", "Vertical", "Square"],
  },
  age: {
    type: ControlType.Enum,
    title: "Date",
    options: ["All", "1 month", "6 months", "1 year", "2 years"],
  },
})
