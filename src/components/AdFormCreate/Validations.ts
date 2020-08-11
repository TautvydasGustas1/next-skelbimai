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

export const PhoneSchema = object({
  article: string().required(),
  camera: string().required(),
  city: string().required(),
  description: string().required(),
  manufacturer: string().required(),
  memory: string().required(),
  model: string().required(),
  os: string().required(),
  price: number().required(),
  ram: string().required(),
  sub_category: string().required(),
  type: string().required(),
});

export const ExternalSchema = object({
  article: string().required(),
  brand: string().required(),
  city: string().required(),
  description: string().required(),
  price: number().required(),
  wireless: string().required(),
  sub_category: string().required(),
  type: string().required(),
});
