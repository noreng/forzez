import type { Metadata } from "next";
import { Equilibrium } from "./equilibrium";

export const metadata: Metadata = {
  title: "Equilibrium of forces",
  description: "From a single force to the force triangle: an interactive introduction to equilibrium.",
};

export default function Page() {
  return <Equilibrium />;
}
