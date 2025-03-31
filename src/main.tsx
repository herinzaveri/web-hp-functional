import "./main.css";

import HoverPlayer from "./lib/HoverPlayer";
import { useEffect } from "react";
import { speechify } from "./lib/play";

export function Main() {
  useEffect(() => {
    // speechify(document.getElementById('paragraph-lorem-ipsum'))
  }, [])
  return <HoverPlayer />;
}
