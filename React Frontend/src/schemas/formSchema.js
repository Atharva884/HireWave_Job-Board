import { z } from "zod";
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{5,20}$/;
const mobileNoRegex = /^[0-9]{10}$/;

export const schema = z.object({
  accountFirstName: z
    .string()
    .min(3, "First Name must be atleast 3 character long")
    .max(20, "First Name must be less than 20 characters")
    .nonempty("First Name is required"),
  accountLastName: z
    .string()
    .min(3, "Last Name must be atleast 3 character long")
    .max(20, "Last Name must be less than 150 characters")
    .nonempty("Last Name is required"),
  accountEmail: z.string().refine((email) => emailRegex.test(email), {
    message: "Invalid email address",
  }),
  accountContactNo: z
    .string()
    .refine((contact) => mobileNoRegex.test(contact), {
      message: "Invalid contact Number",
    }),
});

export const LoginSchema = z.object({
  accountEmail: z.string().refine((email) => emailRegex.test(email), {
    message: "Invalid email address",
  }),
  accountPassword: z.string().nonempty("Password is required"),
});
