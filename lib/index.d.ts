import { SupabaseClient, SupabaseClientOptions } from "@supabase/supabase-js";
import { Document } from "openapi-client-axios";
declare class SupabaseExtraClient<T> extends SupabaseClient {
    backApi: T;
    constructor(url: string, key: string, apiOptions: {
        schema: any;
        url: string;
    }, options?: SupabaseClientOptions<"public">);
}
export declare const createExtraClient: <T>(url: string, key: string, apiOptions: {
    schema: Document;
    url: string;
}, options?: SupabaseClientOptions<"public">) => SupabaseExtraClient<T>;
export {};
