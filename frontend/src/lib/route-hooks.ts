import {
  useLocation as useWouterLocation,
  useRoute as useWouterRoute,
  DefaultParams,
} from "wouter";

export const useLocation = () => {
  const [location, setLocation] = useWouterLocation();
  return [location, setLocation, window.location.search];
};
// const [location, setLocation, search] = useLocation();

export const useRoute = (pattern: string): [boolean, DefaultParams | null] => {
  let [match, params] = useWouterRoute(pattern);
  if (match) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const queryParams = Object.fromEntries(urlSearchParams.entries());
    // params and queryParams can have the same name
    // this preferences params in that scenario
    params = {
      ...queryParams,
      ...params,
    };
  }
  return [match, params];
};
