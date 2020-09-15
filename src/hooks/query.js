import { useLocation } from "react-router-dom";

export default function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}
