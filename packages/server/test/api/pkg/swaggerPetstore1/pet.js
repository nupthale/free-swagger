/* eslint-disable */
// generated by free-swagger

import axios from "axios";
/**
 * @description Find pet by ID
 * @param {Object} params -never
 * @param {Object} pathParams
 * @param {number} pathParams.petId -ID of pet to return
 **/

// Find pet by ID
export const getPetById = (params, { petId }) =>
  axios.request({
    url: `/pet/${petId}`,
    method: "get",
    params: {},
    data: {}
  });
/**
 * @description Updates a pet in the store with form data
 * @param {FormData} params
 * @param {Object} pathParams
 * @param {number} pathParams.petId -ID of pet that needs to be updated
 **/

// Updates a pet in the store with form data
export const updatePetWithForm = (params, { petId }) =>
  axios.request({
    url: `/pet/${petId}`,
    method: "post",
    params: {},
    data: params
  });
/**
 * @description Deletes a pet
 * @param {Object} params -never
 * @param {Object} pathParams
 * @param {number} pathParams.petId -Pet id to delete
 **/

// Deletes a pet
export const deletePet = (params, { petId }) =>
  axios.request({
    url: `/pet/${petId}`,
    method: "delete",
    params: {},
    data: {}
  });
/**
 * @description uploads an image
 * @param {FormData} params
 * @param {Object} pathParams
 * @param {number} pathParams.petId -ID of pet to update
 **/

// uploads an image
export const uploadFile = (params, { petId }) =>
  axios.request({
    url: `/pet/${petId}/uploadImage`,
    method: "post",
    params: {},
    data: params
  });
/**
 * @description Update an existing pet
 * @param {Pet} params -Pet object that needs to be added to the store
 **/

// Update an existing pet
export const updatePet = (params) =>
  axios.request({
    url: `/pet`,
    method: "put",
    params: {},
    data: params
  });
/**
 * @description Add a new pet to the store
 * @param {Pet} params -Pet object that needs to be added to the store
 **/

// Add a new pet to the store
export const addPet = (params) =>
  axios.request({
    url: `/pet`,
    method: "post",
    params: {},
    data: params
  });
/** 
 * @description Finds Pets by status  
 * @param {{
    "status": "available" | "pending" | "sold"
}} params 
 **/

// Finds Pets by status
export const findPetsByStatus = (params) =>
  axios.request({
    url: `/pet/findByStatus`,
    method: "get",
    params: params,
    data: {}
  });
/** 
 * @deprecated
 * @description Finds Pets by tags  
 * @param {{
    "tags": string
}} params 
 **/
/**deprecated*/
// Finds Pets by tags
export const findPetsByTags = (params) =>
  axios.request({
    url: `/pet/findByTags`,
    method: "get",
    params: params,
    data: {}
  });
