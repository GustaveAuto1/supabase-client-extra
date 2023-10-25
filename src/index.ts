import { SupabaseClient, SupabaseClientOptions } from "@supabase/supabase-js"
import axios, { AxiosInstance } from "axios"

class SupabaseExtraClient extends SupabaseClient {
  private backApi: AxiosInstance
  constructor(url: string, key: string, backApiUrl: string, options?: SupabaseClientOptions<"public">) {
    super(url, key, options)
    this.backApi = axios.create({
      baseURL: backApiUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + key,
      },
    })
    this.auth.onAuthStateChange((event, session) => {
      const token = session?.access_token || key 
      this.backApi.defaults.headers.Authorization =
        "Bearer " + token
    })
  }
}

export const createExtraClient = (
  url: string,
  key: string,
  options: any,
  backApiUrl: string,
) => {
  return new SupabaseExtraClient(url, key, backApiUrl, options)
}
