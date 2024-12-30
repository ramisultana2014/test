"use client";

import { useState } from "react";

export default function Counter({ users }) {
  //console.log(users);
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
