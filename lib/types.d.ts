import { SupabaseClient, SupabaseClientOptions } from "@supabase/supabase-js";
import { AxiosInstance } from "axios";
declare class SupabaseExtraClient extends SupabaseClient {
    backApi: AxiosInstance;
    constructor(url: string, key: string, backApiUrl: string, options?: SupabaseClientOptions<"public">);
}
export type ICreateExtraClient = (url: string, key: string, options: any, backApiUrl: string) => SupabaseExtraClient;
export {};
