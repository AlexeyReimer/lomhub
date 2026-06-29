import { mockYards, type Yard } from "@/lib/mock-yards";

export async function getYards(): Promise<Yard[]> {
  return mockYards;
}
