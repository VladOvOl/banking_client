import { useEffect, useState } from "react";

const useDeviceSize = () => {

 
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerWidth)
  
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
  
    useEffect(() => {
      // component is mounted and window is available
      handleWindowResize();
      window.addEventListener('resize', handleWindowResize);
      // unsubscribe from the event on component unmount
      return () => window.removeEventListener('resize', handleWindowResize);
    }, []);
  
    return [width, height]
  
  }
  
  export default useDeviceSize 