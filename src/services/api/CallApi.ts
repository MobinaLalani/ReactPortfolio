import { HttpMethod } from "../../models/enums/HttpMethod";
import { HttpStatus } from "../../models/enums/HttpStatus";
import { ApiResponse } from "../../models/viewModels/api/ApiResponse";

const Api = async <T>(
  BaseUrl: string,
  Body: T | {},
  Header: HeadersInit,
  Method: HttpMethod
): Promise<ApiResponse<T>> => {
  const headers = new Headers(Header);
  const isFormData =
    typeof FormData !== "undefined" && Body instanceof FormData;

  if (isFormData) {
    headers.delete("Content-Type");
  }

  const requestOptions: RequestInit = {
    method: Method,
    headers,
    ...(Method !== HttpMethod.GET && {
      body: isFormData ? (Body as FormData) : JSON.stringify(Body),
    }),
  };

  try {
    const contentType = headers.get("Content-Type") || null;
    const hasAuth = headers.has("Authorization");
    console.log("Api request", {
      url: BaseUrl,
      method: Method,
      contentType,
      authorization: hasAuth ? "present" : "absent",
      bodyType: isFormData
        ? "FormData"
        : Method === HttpMethod.GET
        ? "none"
        : "JSON",
    });
    if (isFormData) {
      const fd = Body as FormData;
      const entries: any[] = [];
      fd.forEach((value, key) => {
        if (value instanceof Blob) {
          entries.push({
            key,
            type: "Blob",
            size: value.size,
            mime: value.type,
          });
        } else {
          entries.push({ key, value: String(value) });
        }
      });
      console.log("FormData entries", entries);
    } else if (Method !== HttpMethod.GET) {
      console.log("JSON body", Body);
    }

    const response = await fetch(BaseUrl, requestOptions);
    if (!response.ok) {
      if (response.status === HttpStatus.FORBIDDEN) {
        window.location.replace("/login");
      }
    }
    const data = (await response.json()) as T;
    return {
      data,
      status: response.status,
    };
  } catch (err) {
    return {
      data: null,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: "Network error or request failed",
    };
  }
};

export default Api;
