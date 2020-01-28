import { Viewport } from "pixi-viewport";
import { PixiComponent } from "@inlet/react-pixi";

export default PixiComponent("Viewport", {
  create: props => {
    const viewport = new Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
    })

    viewport.wheel({
        center: {
            x:window.innerWidth/2,
            y:window.innerHeight/2
        }
    })

    viewport.on("wheel", e => {
        if (e.viewport.scaled <= 0.5){
            viewport.setZoom(0.5, true)
        }

        if (e.viewport.scaled >= 2){
            viewport.setZoom(2, true)
        }
    })

    return viewport
  }
})
