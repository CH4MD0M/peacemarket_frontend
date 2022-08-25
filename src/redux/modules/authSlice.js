import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authApi from "@api/authApi";
import useToastMessage from "@hooks/useToastMessage";
import { TOAST_MESSAGE } from "@util/toastMessage";

const initialState = {
  isLogin: false,
  fetchSignupState: "",
  fetchLoginState: "",
  isRegistCompleted: false,
};

// 회원가입
export const signup = createAsyncThunk("auth/signup", async (formData, { rejectWithValue }) => {
  try {
    const response = await authApi.signup(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

// 로그인
export const login = createAsyncThunk("auth/login", async (formData, { rejectWithValue }) => {
  try {
    const response = await authApi.login(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.fetchSignupState = "LOADING";
    });
    builder.addCase(signup.fulfilled, (state) => {
      state.fetchSignupState = "SUCCESS";
      useToastMessage(TOAST_MESSAGE.AUTH.REGISTER_SUCCESS, "success");
      state.isRegistCompleted = true;
    });
    builder.addCase(signup.rejected, (state) => {
      state.fetchSignupState = "ERROR";
      useToastMessage(TOAST_MESSAGE.AUTH.REGISTER_FAIL, "error");
    });

    builder.addCase(login.pending, (state) => {
      state.fetchLoginState = "LOADING";
    });
    builder.addCase(login.fulfilled, (state) => {
      state.fetchLoginState = "SUCCESS";
      useToastMessage(TOAST_MESSAGE.AUTH.LOGIN_SUCCESS, "success");
    });
    builder.addCase(login.rejected, (state) => {
      state.fetchLoginState = "ERROR";
      useToastMessage(TOAST_MESSAGE.AUTH.LOGIN_FAIL, "error");
    });
  },
});

export default authSlice.reducer;
