import API from "./axios";

export const getTransactions = () =>
    API.get("/api/v1/get-transactions");

export const addTransaction = (data) =>
    API.post("/api/v1/add-transaction", data);

export const deleteTransaction = (id) =>
    API.delete(`/api/v1/delete-transaction/${id}`);

export const getStats = () =>
    API.get("/api/v1/get-stats");