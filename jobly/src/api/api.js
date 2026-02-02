import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = JoblyApi.token
        ? { Authorization: `Bearer ${JoblyApi.token}` }
        : {};
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get list of companies, optionally filtered by name. */

  static async getCompanies(nameLike) {
    const data = {};
    if (nameLike) data.nameLike = nameLike;
    let res = await this.request("companies", data);
    return res.companies;
  }

  /** Get list of jobs, optionally filtered by search params. */

  static async getJobs(params = {}) {
    let res = await this.request("jobs", params);
    return res.jobs;
  }

  /** Login with username/password. */

  static async login(data) {
    let res = await this.request("auth/token", data, "post");
    return res.token;
  }

  /** Signup with user details. */

  static async signup(data) {
    let res = await this.request("auth/register", data, "post");
    return res.token;
  }

  /** Get current user info by username. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  // obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = null;

export default JoblyApi;
