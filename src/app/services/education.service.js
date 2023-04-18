import httpService from "./http.service";

const educationEndpoint = "education/";

const educationService = {
  get: async () => {
    const { data } = await httpService.get(educationEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(
      educationEndpoint + payload._id,
      payload
    );
    return data;
  },
  remove: async (employeeId) => {
    const { data } = await httpService.delete(educationEndpoint + employeeId);
    return data;
  },
  update: async (id, payload) => {
    const { data } = await httpService.patch(educationEndpoint + id, payload);
    return data;
  },
};
export default educationService;
