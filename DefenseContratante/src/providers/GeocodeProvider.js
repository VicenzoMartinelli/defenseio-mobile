import Geocode from "react-geocode";
import React, { useMemo, createContext } from "react";
import { GeoCodeApiKey } from '../Enviroment';

export const GeocodeContext = createContext(Geocode);

const GeocodeProvider = props => {
  useMemo(() => {
    Geocode.setApiKey(GeoCodeApiKey);
    Geocode.setLanguage("pt-BR");
    Geocode.setRegion("br");
    Geocode.enableDebug();
  }, []);

  return (
    <GeocodeContext.Provider value={Geocode}>
      {props.children}
    </GeocodeContext.Provider>
  );
};

export default GeocodeProvider;
