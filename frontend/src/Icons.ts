import { library } from "@fortawesome/fontawesome-svg-core"
import { faSearchLocation } from "@fortawesome/free-solid-svg-icons"

/**
 * Registers all icons used in the application to the FontAwesome library
 */
const registerIcons = () => {
  library.add(faSearchLocation)
}

export default registerIcons
