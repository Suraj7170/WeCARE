const { default: axios } = require('axios');

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: 'http://localhost:1337/api',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

const getCategory = () => axiosClient.get('/categories?populate=*');

const getDoctorList = () => axiosClient.get('/doctors?populate=*');

const getDoctorByCategory = (category) =>
  axiosClient.get('/doctors', {
    params: {
      'filters[category][Name][$in]': category,
      populate: '*',
    },
  });

  const bookAppointment=(data)=>axiosClient.post('/appointments',data);

  const getDoctorById = (id) =>
  axiosClient.get('/doctors', {
    params: {
      'filters[id][$eq]': id,
      populate: '*',
    },
  });

  const sendEmail=(data)=>axios.post('/api/sendEmail',data);

  const getUserBookingList = (userEmail) =>
  axiosClient.get('/appointments', {
    params: {
      'filters[Email][$eq]': userEmail,
      populate: '*',
    },
  });

  const deleteBooking=(id)=>axiosClient.delete(`/appointments/${id}`);

export default {
  getCategory,
  getDoctorList,
  getDoctorByCategory,
  getDoctorById,
  bookAppointment,
  sendEmail,
  getUserBookingList,
  deleteBooking
};
