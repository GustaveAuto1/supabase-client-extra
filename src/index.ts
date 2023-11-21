import { SupabaseClient, SupabaseClientOptions } from "@supabase/supabase-js";
import OpenAPIClientAxios, { Document } from "openapi-client-axios";


class SupabaseExtraClient<T> extends SupabaseClient {
  public backApi: T;

  constructor(
    url: string,
    key: string,
    apiOptions: {
      schema: any;
      url: string;
    },
    options?: SupabaseClientOptions<"public">
  ) {
    super(url, key, options);
    const openApiClient = new OpenAPIClientAxios({
      definition: apiOptions.schema,
      withServer: { url: apiOptions.url },
      axiosConfigDefaults: {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + key
        }
      }
    });
    this.backApi = openApiClient.initSync<T>();
    this.auth.onAuthStateChange((event, session) => {
      const token = session?.access_token || key;
      if (!openApiClient.axiosConfigDefaults.headers) {
        openApiClient.axiosConfigDefaults.headers = {};
      }
      openApiClient.axiosConfigDefaults.headers.Authorization =
        "Bearer " + token;
      this.backApi = openApiClient.initSync<T>();
    });
  }
}

export const createExtraClient = <T>(
  url: string,
  key: string,
  options: any,
  apiOptions: {
    schema: any;
    url: string;
  }
) => {
  return new SupabaseExtraClient<T>(url, key, apiOptions, options);
};