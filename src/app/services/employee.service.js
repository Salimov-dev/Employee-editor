import httpService from "./http.service";

const employeeEndpoint = "employee/";

const employeeService = {
  get: async () => {
    const { data } = await httpService.get(employeeEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(employeeEndpoint + payload._id, payload);
    return data;
  },
  remove: async (employeeId) => {
    const { data } = await httpService.delete(employeeEndpoint + employeeId);
    return data;
  },
  update: async (id, payload) => {
    const { data } = await httpService.patch(employeeEndpoint + id, payload);
    return data;
  },
};
export default employeeService;
