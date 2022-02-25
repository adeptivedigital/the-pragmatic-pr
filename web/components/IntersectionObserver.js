import React, {useContext, useEffect, useState} from "react";
import {useIntersection} from "react-use";
import {GlobalContext} from "./GlobalStore";

export const IntersectionContext = React.createContext({inView: true});

export const IntersectionObserver = ({children, reset = false, id}) => {
  const [inView, setInView] = useState(false);
  const intersectionRef = React.useRef(null);
  const {setState} = useContext(GlobalContext);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0
  });

  useEffect(() => {
    const inViewNow = intersection && intersection.intersectionRatio > 0;
    if (inViewNow) {
      setState({
        inView,
        id
      })
      return setInView(inViewNow);
    } else if (reset) {
      return setInView(false);
    }
  }, [intersection, reset]);


  return (
    <IntersectionContext.Provider value={{inView}}>
      <div ref={intersectionRef}>
        {children}
      </div>
    </IntersectionContext.Provider>
  );
};
