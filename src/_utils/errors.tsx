import { ZodError } from "zod";
import { StringMap } from "@/src/_types/signInTypes";

export const convertZodErrors = (error: ZodError): StringMap => {
    return error.issues.reduce((acc: { [key: string]: string }, issue ) => {
        acc[issue.path[0]] = issue.message;
        return acc;
    }, {});
};