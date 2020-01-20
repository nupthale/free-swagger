/* eslint-disable */
import axios from "axios";

// Find pet by ID
export const getPetById = (params, pathParams) =>
  axios.request({
    url: `/pet/${arguments[1].petId}`,
    method: "get",
    params: params,
    data: {}
  });

// Updates a pet in the store with form data
export const updatePetWithForm = (params, pathParams) =>
  axios.request({
    url: `/pet/${arguments[1].petId}`,
    method: "post",
    params: {},
    data: params
  });

// Deletes a pet
export const deletePet = (params, pathParams) =>
  axios.request({
    url: `/pet/${arguments[1].petId}`,
    method: "delete",
    params: {},
    data: params
  });

// uploads an image
export const uploadFile = (params, pathParams) =>
  axios.request({
    url: `/pet/${arguments[1].petId}/uploadImage`,
    method: "post",
    params: {},
    data: params
  });

// Update an existing pet
export const updatePet = params =>
  axios.request({
    url: `/pet`,
    method: "put",
    params: {},
    data: params
  });

// Add a new pet to the store
export const addPet = params =>
  axios.request({
    url: `/pet`,
    method: "post",
    params: {},
    data: params
  });

// Finds Pets by status
export const findPetsByStatus = params =>
  axios.request({
    url: `/pet/findByStatus`,
    method: "get",
    params: params,
    data: {}
  });
/**deprecated*/
// Finds Pets by tags
export const findPetsByTags = params =>
  axios.request({
    url: `/pet/findByTags`,
    method: "get",
    params: params,
    data: {}
  });
