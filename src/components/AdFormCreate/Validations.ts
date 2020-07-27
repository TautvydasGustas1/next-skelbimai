import { object, string, number } from "yup";

export const ComputersSchema = object({
  article: string().required(),
  type: string().required(),
  city: string().required(),
  price: number().required(),
  description: string().required(),
  cpu: string().required(),
  gpu: string().required(),
  motherboard: string().required(),
  ram: string().required(),
  memory: string().required(),
});
